-- Add images array column to products table for multiple product images
ALTER TABLE public.products 
ADD COLUMN images text[] DEFAULT '{}';

-- Migrate existing image_url data to the new images array
UPDATE public.products 
SET images = ARRAY[image_url] 
WHERE image_url IS NOT NULL AND image_url != '';