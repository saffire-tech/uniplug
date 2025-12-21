import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProductViewTracking = (productId: string | undefined) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!productId || hasTracked.current) return;

    const trackView = async () => {
      hasTracked.current = true;
      
      const { error } = await supabase.rpc('increment_product_views', {
        product_id: productId
      });

      if (error) {
        console.error('Error tracking product view:', error);
      }
    };

    trackView();
  }, [productId]);
};

export const useStoreViewTracking = (storeId: string | undefined) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!storeId || hasTracked.current) return;

    const trackView = async () => {
      hasTracked.current = true;
      
      const { error } = await supabase.rpc('increment_store_views', {
        store_id: storeId
      });

      if (error) {
        console.error('Error tracking store view:', error);
      }
    };

    trackView();
  }, [storeId]);
};
