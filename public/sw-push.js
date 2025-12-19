// Service Worker for Push Notifications
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

// Handle push events
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);

  if (!event.data) {
    console.log('No data in push event');
    return;
  }

  try {
    const data = event.data.json();
    console.log('Push notification data:', data);

    const options: NotificationOptions = {
      body: data.body || 'You have a new notification',
      icon: data.icon || '/icons/icon-192x192.png',
      badge: data.badge || '/icons/icon-72x72.png',
      tag: data.tag || 'default',
      data: data.data || {},
      vibrate: [100, 50, 100],
      requireInteraction: true,
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Uniplug', options)
    );
  } catch (error) {
    console.error('Error handling push event:', error);
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);

  event.notification.close();

  const data = event.notification.data || {};
  let targetUrl = '/';

  // Navigate based on notification type
  if (data.type === 'message') {
    targetUrl = '/messages';
  } else if (data.type === 'order') {
    targetUrl = '/seller';
  } else if (data.url) {
    targetUrl = data.url;
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if ('navigate' in client) {
            return (client as WindowClient).navigate(targetUrl);
          }
          return client;
        }
      }
      // If no window is open, open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Handle push subscription change
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Push subscription changed:', event);
  // The subscription has changed, we need to resubscribe
  // This is handled by the frontend when the user next opens the app
});

export {};
