// Push notification configuration
// The VAPID public key is used to identify your app when subscribing to push notifications
// This key should match the VAPID_PUBLIC_KEY secret in your Supabase Edge Functions

// To generate VAPID keys, you can use:
// npx web-push generate-vapid-keys

// Replace this with your actual VAPID public key
export const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

// Check if push notifications are properly configured
export const isPushConfigured = (): boolean => {
  return VAPID_PUBLIC_KEY.length > 0;
};
