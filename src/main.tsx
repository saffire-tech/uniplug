import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

// Register PWA service worker (handles both caching and push notifications)
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
  onRegisteredSW(swUrl, registration) {
    console.log("[Main] Service worker registered:", swUrl);
    if (registration) {
      console.log("[Main] SW scope:", registration.scope);
    }
  },
  onRegisterError(error) {
    console.error("[Main] SW registration error:", error);
  },
});

createRoot(document.getElementById("root")!).render(<App />);
