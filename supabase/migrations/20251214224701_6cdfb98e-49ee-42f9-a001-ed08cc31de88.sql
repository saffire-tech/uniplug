-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" 
ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Cart policies
CREATE POLICY "Users can view their own cart" 
ON public.cart_items FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their cart" 
ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their cart" 
ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can remove from their cart" 
ON public.cart_items FOR DELETE USING (auth.uid() = user_id);