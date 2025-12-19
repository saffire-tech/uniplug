import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Loader2, Package, AlertTriangle, Calendar, Store } from "lucide-react";
import { format } from "date-fns";

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image_url: string | null;
  };
}

interface Order {
  id: string;
  store_id: string;
  total_amount: number;
  status: string;
  notes: string | null;
  created_at: string;
  store?: {
    name: string;
    logo_url: string | null;
  };
  order_items: OrderItem[];
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  confirmed: { label: "Confirmed", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  delivered: { label: "Delivered", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const PurchaseHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          id,
          store_id,
          total_amount,
          status,
          notes,
          created_at
        `)
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch store and order items for each order
      const ordersWithDetails = await Promise.all(
        (ordersData || []).map(async (order) => {
          // Fetch store
          const { data: storeData } = await supabase
            .from("stores")
            .select("name, logo_url")
            .eq("id", order.store_id)
            .maybeSingle();

          // Fetch order items with product details
          const { data: itemsData } = await supabase
            .from("order_items")
            .select("id, product_id, quantity, price")
            .eq("order_id", order.id);

          // Fetch product details for each item
          const itemsWithProducts = await Promise.all(
            (itemsData || []).map(async (item) => {
              const { data: productData } = await supabase
                .from("products")
                .select("name, image_url")
                .eq("id", item.product_id)
                .maybeSingle();

              return {
                ...item,
                product: productData,
              };
            })
          );

          return {
            ...order,
            store: storeData,
            order_items: itemsWithProducts,
          };
        })
      );

      setOrders(ordersWithDetails);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 pt-28 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
        <p className="text-muted-foreground mb-6">View all your past orders</p>

        {/* Payment Warning Alert */}
        <Alert className="mb-8 border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="text-yellow-600 font-semibold">Important Payment Notice</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-500">
            Do not make any payments until you have received the goods or service you ordered, unless otherwise agreed with the seller. 
            <strong className="block mt-2">Uniplug will not be held responsible for any fraudulent act.</strong>
          </AlertDescription>
        </Alert>

        {orders.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No purchases yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't made any purchases. Start exploring products!
            </p>
            <Button variant="hero" onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card rounded-xl border border-border p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {order.store?.logo_url ? (
                      <img
                        src={order.store.logo_url}
                        alt={order.store.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <Link 
                        to={`/store/${order.store_id}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {order.store?.name || "Unknown Store"}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {format(new Date(order.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                  </div>
                  <Badge className={statusConfig[order.status]?.className || ""}>
                    {statusConfig[order.status]?.label || order.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.product?.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product_id}`}
                          className="font-medium hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.product?.name || "Unknown Product"}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ₦{Number(item.price).toLocaleString()}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₵{(item.quantity * Number(item.price)).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 mb-4">
                    <strong>Notes:</strong> {order.notes}
                  </p>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">
                    ₦{Number(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
