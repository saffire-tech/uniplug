import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

// Register PWA service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

// Register push notification service worker separately
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw-push.js")
    .then((registration) => {
      console.log("Push SW registered:", registration.scope);
    })
    .catch((error) => {
      console.error("Push SW registration failed:", error);
    });
}

createRoot(document.getElementById("root")!).render(<App />);
