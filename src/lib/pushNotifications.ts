import { supabase } from '@/integrations/supabase/client';

interface PushNotification {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: {
    type?: 'message' | 'order' | 'general';
    url?: string;
    [key: string]: unknown;
  };
}

/**
 * Send a push notification to a specific user
 */
export const sendPushNotification = async (
  userId: string,
  notification: PushNotification
): Promise<{ success: boolean; sent: number; failed: number }> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-push-notification', {
      body: {
        user_id: userId,
        notification,
      },
    });

    if (error) {
      console.error('Error sending push notification:', error);
      return { success: false, sent: 0, failed: 1 };
    }

    return data || { success: true, sent: 1, failed: 0 };
  } catch (error) {
    console.error('Error calling push notification function:', error);
    return { success: false, sent: 0, failed: 1 };
  }
};

/**
 * Send a new message notification
 */
export const sendMessageNotification = async (
  receiverId: string,
  senderName: string,
  messagePreview: string
): Promise<void> => {
  await sendPushNotification(receiverId, {
    title: `New message from ${senderName}`,
    body: messagePreview.length > 100 
      ? messagePreview.substring(0, 97) + '...' 
      : messagePreview,
    tag: 'message',
    data: {
      type: 'message',
      url: '/messages',
    },
  });
};

/**
 * Send a new order notification to store owner
 */
export const sendOrderNotification = async (
  storeOwnerId: string,
  orderId: string,
  orderAmount: number
): Promise<void> => {
  await sendPushNotification(storeOwnerId, {
    title: '🎉 New Order Received!',
    body: `Order #${orderId.slice(0, 8)} - ₵${orderAmount.toFixed(2)}`,
    tag: 'order',
    data: {
      type: 'order',
      url: '/seller',
      orderId,
    },
  });
};

/**
 * Send an order status update notification to buyer
 */
export const sendOrderStatusNotification = async (
  buyerId: string,
  orderId: string,
  status: string
): Promise<void> => {
  const statusMessages: Record<string, string> = {
    confirmed: 'Your order has been confirmed!',
    preparing: 'Your order is being prepared.',
    ready: 'Your order is ready for pickup!',
    completed: 'Your order has been completed.',
    cancelled: 'Your order has been cancelled.',
  };

  const message = statusMessages[status] || `Your order status has been updated to: ${status}`;

  await sendPushNotification(buyerId, {
    title: 'Order Update',
    body: message,
    tag: `order-${orderId}`,
    data: {
      type: 'order',
      url: '/profile',
      orderId,
    },
  });
};
