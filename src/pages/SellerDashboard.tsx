import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/hooks/useStore";
import Navbar from "@/components/layout/Navbar";
import StoreSetupWizard from "@/components/seller/StoreSetupWizard";
import Analytics from "@/components/seller/Analytics";
import ProductsList from "@/components/seller/ProductsList";
import OrdersTable from "@/components/seller/OrdersTable";
import { Loader2, Store, Package, ShoppingBag, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { 
    store, 
    products, 
    orders, 
    loading, 
    createStore, 
    createProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateStore,
  } = useStore();

  const [storeSettings, setStoreSettings] = useState({
    name: "",
    description: "",
    location: "",
    phone: "",
  });
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (store) {
      setStoreSettings({
        name: store.name || "",
        description: store.description || "",
        location: store.location || "",
        phone: store.phone || "",
      });
    }
  }, [store]);

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await updateStore(storeSettings);
    } finally {
      setSavingSettings(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show setup wizard if no store exists
  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-2xl mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent mb-6">
              <Store className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Your Store</h1>
            <p className="text-muted-foreground">
              Set up your store in just a few steps and start selling
            </p>
          </div>
          <StoreSetupWizard onComplete={createStore} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{store.name}</h1>
            <p className="text-muted-foreground">Manage your store, products, and orders</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            View Store
          </Button>
        </div>

        {/* Analytics */}
        <div className="mb-8">
          <Analytics store={store} products={products} orders={orders} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-muted p-1 rounded-lg">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsList
              products={products}
              onAdd={createProduct}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
            />
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Orders</h2>
              <OrdersTable orders={orders} onUpdateStatus={updateOrderStatus} />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-card border border-border rounded-xl p-6 max-w-2xl">
              <h2 className="text-xl font-bold mb-6">Store Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="storeDescription">Description</Label>
                  <Textarea
                    id="storeDescription"
                    value={storeSettings.description}
                    onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="storeLocation">Location</Label>
                  <Input
                    id="storeLocation"
                    value={storeSettings.location}
                    onChange={(e) => setStoreSettings({ ...storeSettings, location: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="storePhone">Phone</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleSaveSettings} disabled={savingSettings}>
                  {savingSettings && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
