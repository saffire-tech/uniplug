import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface NotificationCounts {
  unreadMessages: number;
  pendingOrders: number;
  totalNotifications: number;
}

export const useNotificationCounts = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<NotificationCounts>({
    unreadMessages: 0,
    pendingOrders: 0,
    totalNotifications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCounts({ unreadMessages: 0, pendingOrders: 0, totalNotifications: 0 });
      setLoading(false);
      return;
    }

    const fetchCounts = async () => {
      try {
        // Fetch unread messages count
        const { count: unreadMessages, error: messagesError } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("receiver_id", user.id)
          .eq("is_read", false);

        if (messagesError) {
          console.error("Error fetching unread messages:", messagesError);
        }

        // Fetch pending orders count (for store owners)
        // First get the user's store
        const { data: store, error: storeError } = await supabase
          .from("stores")
          .select("id")
          .eq("user_id", user.id)
          .single();

        let pendingOrders = 0;
        if (!storeError && store) {
          const { count: ordersCount, error: ordersError } = await supabase
            .from("orders")
            .select("*", { count: "exact", head: true })
            .eq("store_id", store.id)
            .eq("status", "pending");

          if (!ordersError) {
            pendingOrders = ordersCount || 0;
          }
        }

        const unreadCount = unreadMessages || 0;
        setCounts({
          unreadMessages: unreadCount,
          pendingOrders,
          totalNotifications: unreadCount + pendingOrders,
        });
      } catch (error) {
        console.error("Error fetching notification counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();

    // Subscribe to real-time updates for messages
    const messagesChannel = supabase
      .channel("notification-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${user.id}`,
        },
        () => {
          fetchCounts();
        }
      )
      .subscribe();

    // Subscribe to real-time updates for orders
    const ordersChannel = supabase
      .channel("notification-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          fetchCounts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(ordersChannel);
    };
  }, [user]);

  return { ...counts, loading };
};
