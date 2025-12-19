-- Add campus column to stores table
ALTER TABLE public.stores ADD COLUMN campus text;

-- Add a check constraint for allowed campuses
ALTER TABLE public.stores ADD CONSTRAINT stores_campus_check 
CHECK (campus IS NULL OR campus IN ('UMaT', 'UCC', 'KNUST', 'UENR', 'UG', 'UDS', 'UHAS', 'VVU', 'CU'));