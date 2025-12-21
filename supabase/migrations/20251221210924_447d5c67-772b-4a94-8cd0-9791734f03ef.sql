-- Create function to increment product views
CREATE OR REPLACE FUNCTION public.increment_product_views(product_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE products
  SET views = COALESCE(views, 0) + 1
  WHERE id = product_id;
END;
$$;

-- Create function to increment store views
CREATE OR REPLACE FUNCTION public.increment_store_views(store_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE stores
  SET total_views = COALESCE(total_views, 0) + 1
  WHERE id = store_id;
END;
$$;

-- Grant execute permissions to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.increment_product_views(uuid) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.increment_store_views(uuid) TO authenticated, anon;