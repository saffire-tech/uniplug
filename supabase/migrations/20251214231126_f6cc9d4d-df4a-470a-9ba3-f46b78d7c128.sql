-- Create storage bucket for store images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('store-images', 'store-images', true);

-- Allow authenticated users to upload their own store images
CREATE POLICY "Users can upload store images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'store-images' 
  AND auth.role() = 'authenticated'
);

-- Allow public read access to store images
CREATE POLICY "Store images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'store-images');

-- Allow users to update their own store images
CREATE POLICY "Users can update their own store images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'store-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own store images
CREATE POLICY "Users can delete their own store images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'store-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);