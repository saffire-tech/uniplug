import { useEffect } from 'react';
import { useNotificationCounts } from './useNotificationCounts';

export const usePWABadge = () => {
  const { totalNotifications } = useNotificationCounts();

  useEffect(() => {
    // Check if the Badging API is supported
    if ('setAppBadge' in navigator) {
      if (totalNotifications > 0) {
        navigator.setAppBadge(totalNotifications).catch((error) => {
          console.log('Error setting app badge:', error);
        });
      } else {
        navigator.clearAppBadge().catch((error) => {
          console.log('Error clearing app badge:', error);
        });
      }
    }
  }, [totalNotifications]);

  return { totalNotifications };
};
