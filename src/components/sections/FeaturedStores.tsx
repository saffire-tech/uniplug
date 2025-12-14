import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Verified, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface StoreData {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  cover_url: string | null;
  location: string | null;
  is_verified: boolean | null;
  product_count?: number;
}

const FeaturedStores = () => {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const { data, error } = await supabase
      .from('stores')
      .select('id, name, description, logo_url, cover_url, location, is_verified')
      .eq('is_active', true)
      .order('total_sales', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching stores:', error);
    } else {
      // Fetch product counts for each store
      const storesWithCounts = await Promise.all(
        (data || []).map(async (store) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('store_id', store.id)
            .eq('is_active', true);
          
          return { ...store, product_count: count || 0 };
        })
      );
      setStores(storesWithCounts);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="stores" className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (stores.length === 0) {
    return (
      <section id="stores" className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-primary font-semibold mb-3">TOP SELLERS</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Featured Stores
              </h2>
            </div>
          </div>
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No stores yet</h3>
            <p className="text-muted-foreground">
              Be the first to create your store on UniPlug!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="stores" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-semibold mb-3">TOP SELLERS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Featured Stores
            </h2>
          </div>
          <Button variant="outline" className="w-fit">
            View All Stores
          </Button>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden bg-muted">
                {store.cover_url ? (
                  <img
                    src={store.cover_url}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Store className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-5 pt-0">
                {/* Avatar */}
                <div className="relative -mt-10 mb-4">
                  <div className="w-20 h-20 rounded-xl border-4 border-card shadow-lg bg-muted flex items-center justify-center overflow-hidden">
                    {store.logo_url ? (
                      <img
                        src={store.logo_url}
                        alt={store.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Store className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  {store.is_verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                      <Verified className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {store.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {store.description || 'No description'}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm mb-4">
                  {store.location && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{store.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {store.product_count} {store.product_count === 1 ? 'product' : 'products'}
                  </span>
                  <Link to={`/store/${store.id}`}>
                    <Button size="sm">Visit Store</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStores;
