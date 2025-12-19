-- Allow buyers to cancel their own pending orders
CREATE POLICY "Buyers can cancel their pending orders"
ON public.orders
FOR UPDATE
USING (
  auth.uid() = buyer_id 
  AND status = 'pending'
)
WITH CHECK (
  auth.uid() = buyer_id 
  AND status = 'cancelled'
);