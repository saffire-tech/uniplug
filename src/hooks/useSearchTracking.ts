import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useSearchTracking = () => {
  const { user } = useAuth();

  const trackSearch = useCallback(async (
    searchQuery: string,
    category?: string,
    campus?: string
  ) => {
    if (!user || !searchQuery.trim()) return;

    try {
      await supabase.from('user_searches').insert({
        user_id: user.id,
        search_query: searchQuery.trim(),
        category: category !== 'All' ? category : null,
        campus: campus !== 'All' ? campus : null,
      });
    } catch (error) {
      console.error('Error tracking search:', error);
    }
  }, [user]);

  return { trackSearch };
};
