/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

// Take control ASAP
clientsClaim();
self.skipWaiting();

// Precache build assets
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Runtime caching for backend requests
registerRoute(
  ({ url }) => /^https:\/\/.*\.supabase\.co\/.*/i.test(url.href),
  new NetworkFirst({
    cacheName: "supabase-cache",
    networkTimeoutSeconds: 8,
  })
);

// ---------------- Push Notifications ----------------
self.addEventListener("push", (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();

    const options = {
      body: data.body || "You have a new notification",
      icon: data.icon || "/icons/icon-192x192.png",
      badge: data.badge || "/icons/icon-72x72.png",
      tag: data.tag || "default",
      data: data.data || {},
      vibrate: [100, 50, 100],
      requireInteraction: true,
    } as NotificationOptions;

    event.waitUntil(self.registration.showNotification(data.title || "Uniplug", options));
  } catch (error) {
    console.error("Error handling push event:", error);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = (event.notification.data || {}) as { type?: string; url?: string };
  let targetUrl = "/";

  if (data.type === "message") {
    targetUrl = "/messages";
  } else if (data.type === "order") {
    targetUrl = "/seller";
  } else if (data.url) {
    targetUrl = data.url;
  }

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.focus();
          if ("navigate" in client) {
            return (client as WindowClient).navigate(targetUrl);
          }
          return client;
        }
      }
      return self.clients.openWindow?.(targetUrl);
    })
  );
});

self.addEventListener("pushsubscriptionchange", (event) => {
  console.log("Push subscription changed:", event);
  // Subscription renewal happens next time the user opens the app.
});
