import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface RecommendedProduct {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  image_url: string | null;
  store: {
    name: string;
    campus: string | null;
  } | null;
}

const RecommendedProducts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ['recommendations', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-recommendations');
      if (error) {
        console.error('Error fetching recommendations:', error);
        return [];
      }
      return data.recommendations as RecommendedProduct[];
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const handleAddToCart = async (e: React.MouseEvent, product: RecommendedProduct) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please sign in to add items to cart");
      navigate("/auth");
      return;
    }
    await addToCart(product.id);
    toast.success(`${product.name} added to cart`);
  };

  if (!user) return null;
  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Recommended for You</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.slice(0, 8).map((product) => (
            <Card 
              key={product.id} 
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {product.store?.name} {product.store?.campus && `• ${product.store.campus}`}
                  </p>
                  <p className="text-primary font-semibold mt-1">
                    GH₵ {product.price.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
