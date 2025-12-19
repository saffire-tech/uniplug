-- Ensure upsert works by adding a unique constraint on (user_id, endpoint)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'push_subscriptions_user_id_endpoint_key'
      AND conrelid = 'public.push_subscriptions'::regclass
  ) THEN
    ALTER TABLE public.push_subscriptions
      ADD CONSTRAINT push_subscriptions_user_id_endpoint_key UNIQUE (user_id, endpoint);
  END IF;
END $$;

-- Helpful index for lookups by user
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id
  ON public.push_subscriptions (user_id);
