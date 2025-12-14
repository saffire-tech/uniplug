import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useOrderNotifications = (storeId: string | null, onNewOrder?: () => void) => {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!storeId) return;

    // Create audio element for notification sound
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    audioRef.current.volume = 0.5;

    const channel = supabase
      .channel(`orders-${storeId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
          filter: `store_id=eq.${storeId}`,
        },
        (payload) => {
          const order = payload.new;
          
          // Play notification sound
          audioRef.current?.play().catch(() => {
            // Audio play might fail due to browser autoplay policies
          });

          // Show toast notification
          toast({
            title: "🎉 New Order Received!",
            description: `Order #${order.id.slice(0, 8)} - ₵${order.total_amount.toFixed(2)}`,
            duration: 10000,
          });

          // Callback to refresh orders
          onNewOrder?.();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storeId, toast, onNewOrder]);
};
