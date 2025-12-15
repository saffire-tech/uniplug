-- Add is_featured column to products table
ALTER TABLE public.products ADD COLUMN is_featured boolean DEFAULT false;

-- Add is_featured column to stores table
ALTER TABLE public.stores ADD COLUMN is_featured boolean DEFAULT false;