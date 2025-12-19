import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { ProductGridSkeleton } from "@/components/ui/skeletons";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string;
  store: {
    name: string;
  } | null;
}

interface FeaturedProductsProps {
  selectedCategory?: string | null;
}

const fetchFeaturedProducts = async (category: string | null): Promise<Product[]> => {
  let query = supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      image_url,
      category,
      store:stores(name)
    `)
    .eq('is_active', true);

  // If category is selected, filter by category; otherwise show featured
  if (category) {
    query = query.eq('category', category);
  } else {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;
  
  return data?.map(p => ({
    ...p,
    store: Array.isArray(p.store) ? p.store[0] : p.store
  })) || [];
};

const FeaturedProducts = ({ selectedCategory }: FeaturedProductsProps) => {
  const { addToCart } = useCart();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-products', selectedCategory],
    queryFn: () => fetchFeaturedProducts(selectedCategory ?? null),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  const sectionTitle = selectedCategory ? selectedCategory : "Trending Now";
  const sectionLabel = selectedCategory ? "CATEGORY" : "FEATURED";

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-primary font-semibold mb-3">{sectionLabel}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {sectionTitle}
              </h2>
            </div>
          </div>
          <ProductGridSkeleton count={6} />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-primary font-semibold mb-3">{sectionLabel}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {sectionTitle}
              </h2>
            </div>
          </div>
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              {selectedCategory ? `No products in ${selectedCategory}` : "No products yet"}
            </h3>
            <p className="text-muted-foreground">
              {selectedCategory 
                ? "Try selecting a different category"
                : "Be the first to list your products on UniPlug!"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-semibold mb-3">{sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {sectionTitle}
            </h2>
          </div>
          <Link to={selectedCategory ? `/products?category=${encodeURIComponent(selectedCategory)}` : "/products"}>
            <Button variant="outline" className="w-fit">
              View All {selectedCategory ? `in ${selectedCategory}` : "Products"}
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Image */}
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  {product.image_url && !product.image_url.startsWith('data:') ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4">
                  by {product.store?.name || 'Unknown Seller'}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-foreground">
                    ₵{product.price.toFixed(2)}
                  </p>
                  <Button size="sm" className="gap-2" onClick={() => handleAddToCart(product.id)}>
                    <ShoppingCart className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
