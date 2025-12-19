import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/hooks/useStore";
import { useOrderNotifications } from "@/hooks/useOrderNotifications";
import Navbar from "@/components/layout/Navbar";
import StoreSetupWizard from "@/components/seller/StoreSetupWizard";
import Analytics from "@/components/seller/Analytics";
import ProductsList from "@/components/seller/ProductsList";
import OrdersTable from "@/components/seller/OrdersTable";
import StoreImageUpload from "@/components/seller/StoreImageUpload";
import { Loader2, Store as StoreIcon, Package, ShoppingBag, Settings } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    refetch,
  } = useStore();

  // Real-time order notifications
  const handleNewOrder = useCallback(() => {
    refetch();
  }, [refetch]);
  
  useOrderNotifications(store?.id || null, store?.user_id || null, handleNewOrder);

  const [storeSettings, setStoreSettings] = useState({
    name: "",
    description: "",
    location: "",
    phone: "",
    logo_url: "",
    cover_url: "",
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
        logo_url: store.logo_url || "",
        cover_url: store.cover_url || "",
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
              <StoreIcon className="h-10 w-10 text-primary" />
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
          <div className="flex gap-2">
            <ShareButton 
              url={`/store/${store.id}`}
              title={store.name}
              description={store.description || "Check out my store!"}
            />
            <Button variant="outline" onClick={() => navigate(`/store/${store.id}`)}>
              View Store
            </Button>
          </div>
        </div>

        {/* Analytics */}
        <div className="mb-8">
          <Analytics store={store} products={products} orders={orders} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-muted p-1 rounded-lg w-full md:w-auto overflow-x-auto flex">
            <TabsTrigger value="products" className="gap-2 flex-1 md:flex-initial min-w-fit">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2 flex-1 md:flex-initial min-w-fit">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 flex-1 md:flex-initial min-w-fit">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
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
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Store Settings</h2>
              <div className="space-y-6">
                {/* Store Images Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-3 block">Store Logo</Label>
                    <StoreImageUpload
                      type="logo"
                      currentImageUrl={storeSettings.logo_url}
                      onImageUploaded={(url) => setStoreSettings({ ...storeSettings, logo_url: url })}
                      onImageRemoved={() => setStoreSettings({ ...storeSettings, logo_url: "" })}
                    />
                  </div>
                  <div>
                    <Label className="mb-3 block">Cover Image</Label>
                    <StoreImageUpload
                      type="cover"
                      currentImageUrl={storeSettings.cover_url}
                      onImageUploaded={(url) => setStoreSettings({ ...storeSettings, cover_url: url })}
                      onImageRemoved={() => setStoreSettings({ ...storeSettings, cover_url: "" })}
                    />
                  </div>
                </div>

                {/* Store Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      value={storeSettings.name}
                      onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
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
