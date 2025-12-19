import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { VAPID_PUBLIC_KEY, isPushConfigured } from '@/config/push';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

interface PushNotificationState {
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission;
  isLoading: boolean;
  subscribe: () => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
  requestPermission: () => Promise<NotificationPermission>;
}

export const usePushNotifications = (): PushNotificationState => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(false);

  const isSupported = 'serviceWorker' in navigator && 
                      'PushManager' in window && 
                      'Notification' in window &&
                      isPushConfigured();

  const ensureSubscriptionSaved = useCallback(
    async (subscription: PushSubscription) => {
      if (!user) return;

      const subscriptionJson = subscription.toJSON();
      const p256dh = subscriptionJson.keys?.p256dh;
      const auth = subscriptionJson.keys?.auth;

      if (!p256dh || !auth) {
        throw new Error('Failed to read subscription keys');
      }

      const { error } = await supabase
        .from('push_subscriptions')
        .upsert(
          {
            user_id: user.id,
            endpoint: subscription.endpoint,
            p256dh,
            auth,
          },
          { onConflict: 'user_id,endpoint' }
        );

      if (error) throw error;
    },
    [user]
  );

  // Check current subscription status
  useEffect(() => {
    if (!isSupported) return;

    setPermission(Notification.permission);

    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          // If the browser is already subscribed, make sure the DB row exists
          await ensureSubscriptionSaved(subscription);
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error('Error checking push subscription:', error);
      }
    };

    checkSubscription();
  }, [isSupported, ensureSubscriptionSaved]);

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) return 'denied';
    
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, [isSupported]);

  const subscribe = useCallback(async (): Promise<boolean> => {
    console.log('[Push] Subscribe called, isSupported:', isSupported, 'user:', user?.id);
    console.log('[Push] VAPID key configured:', isPushConfigured(), 'key length:', VAPID_PUBLIC_KEY.length);
    
    if (!isSupported || !user) {
      console.error('[Push] Not supported or no user');
      toast({
        title: "Push notifications not available",
        description: "Please make sure you're logged in and using a supported browser.",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);

    try {
      // Request permission if not granted
      let currentPermission = permission;
      if (currentPermission === 'default') {
        currentPermission = await requestPermission();
      }

      if (currentPermission !== 'granted') {
        toast({
          title: "Permission denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        });
        return false;
      }

      // Get service worker registration
      console.log('[Push] Getting service worker registration...');
      const registration = await navigator.serviceWorker.ready;
      console.log('[Push] SW ready, scope:', registration.scope);

      // Subscribe to push notifications
      console.log('[Push] Subscribing to push manager...');
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey as unknown as BufferSource,
      });
      console.log('[Push] Subscription created:', subscription.endpoint);

      // Extract keys from subscription
      const subscriptionJson = subscription.toJSON();
      const p256dh = subscriptionJson.keys?.p256dh;
      const auth = subscriptionJson.keys?.auth;

      if (!p256dh || !auth) {
        throw new Error('Failed to get subscription keys');
      }

      console.log('[Push] Saving subscription to database for user:', user.id);
      
      // Save subscription to database
      const { error, data } = await supabase
        .from('push_subscriptions')
        .upsert(
          {
            user_id: user.id,
            endpoint: subscription.endpoint,
            p256dh,
            auth,
          },
          {
            onConflict: 'user_id,endpoint',
          }
        )
        .select();

      console.log('[Push] Upsert result - error:', error, 'data:', data);

      if (error) throw error;

      // Verify it exists (helps catch RLS/constraint issues early)
      const { data: verifyRow, error: verifyError } = await supabase
        .from('push_subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('endpoint', subscription.endpoint)
        .maybeSingle();

      console.log('[Push] Verify result - error:', verifyError, 'row:', verifyRow);

      if (verifyError) throw verifyError;
      if (!verifyRow) throw new Error('Subscription saved but not readable; check access policies.');

      setIsSubscribed(true);
      toast({
        title: "Notifications enabled",
        description: "You'll now receive push notifications for new messages and orders.",
      });
      return true;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      const message = error instanceof Error ? error.message : 'Please try again later.';
      toast({
        title: "Failed to enable notifications",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, user, permission, requestPermission, toast]);

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!isSupported || !user) return false;

    setIsLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Unsubscribe from push manager
        await subscription.unsubscribe();

        // Remove from database
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('endpoint', subscription.endpoint);
      }

      setIsSubscribed(false);
      toast({
        title: "Notifications disabled",
        description: "You won't receive push notifications anymore.",
      });
      return true;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      toast({
        title: "Failed to disable notifications",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, user, toast]);

  return {
    isSupported,
    isSubscribed,
    permission,
    isLoading,
    subscribe,
    unsubscribe,
    requestPermission,
  };
};
