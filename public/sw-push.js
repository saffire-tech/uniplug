// Service Worker for Push Notifications
// This is plain JavaScript (not TypeScript) for browser compatibility

// Handle push events
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);

  if (!event.data) {
    console.log('No data in push event');
    return;
  }

  try {
    const data = event.data.json();
    console.log('Push notification data:', data);

    const options = {
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
self.addEventListener('notificationclick', function(event) {
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
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Check if there's already a window open
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ('focus' in client) {
          client.focus();
          if ('navigate' in client) {
            return client.navigate(targetUrl);
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
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Push subscription changed:', event);
  // Subscription renewal happens next time the user opens the app.
});
