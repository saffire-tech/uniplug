import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";

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

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        image_url,
        category,
        store:stores(name)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data?.map(p => ({
        ...p,
        store: Array.isArray(p.store) ? p.store[0] : p.store
      })) || []);
    }
    setLoading(false);
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
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
              <p className="text-primary font-semibold mb-3">FEATURED</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Trending Now
              </h2>
            </div>
          </div>
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No products yet</h3>
            <p className="text-muted-foreground">
              Be the first to list your products on UniPlug!
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
            <p className="text-primary font-semibold mb-3">FEATURED</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Trending Now
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" className="w-fit">
              View All Products
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
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
