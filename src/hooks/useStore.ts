import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Store {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  cover_url: string | null;
  location: string | null;
  phone: string | null;
  is_verified: boolean;
  is_active: boolean;
  total_views: number;
  total_sales: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  images: string[];
  is_service: boolean;
  is_active: boolean;
  stock: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  store_id: string;
  status: string;
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  buyer?: { full_name: string | null };
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at?: string;
  product?: { name: string; image_url: string | null };
}

export const useStore = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStore = async () => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching store:", error);
      return null;
    }
    return data;
  };

  const fetchProducts = async (storeId: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("store_id", storeId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }
    return data || [];
  };

  const fetchOrders = async (storeId: string) => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          *,
          product:products (name, image_url)
        )
      `)
      .eq("store_id", storeId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
    return data || [];
  };

  const loadData = async () => {
    setLoading(true);
    const storeData = await fetchStore();
    setStore(storeData);
    
    if (storeData) {
      const [productsData, ordersData] = await Promise.all([
        fetchProducts(storeData.id),
        fetchOrders(storeData.id)
      ]);
      setProducts(productsData);
      setOrders(ordersData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const createStore = async (data: { name: string; description: string; location: string; phone: string }) => {
    if (!user) throw new Error("Not authenticated");

    const { data: newStore, error } = await supabase
      .from("stores")
      .insert({
        user_id: user.id,
        name: data.name,
        description: data.description,
        location: data.location,
        phone: data.phone,
      })
      .select()
      .single();

    if (error) throw error;
    
    setStore(newStore);
    toast({ title: "Store created!", description: "Your store is now live." });
    return newStore;
  };

  const updateStore = async (updates: Partial<Store>) => {
    if (!store) throw new Error("No store found");

    const { error } = await supabase
      .from("stores")
      .update(updates)
      .eq("id", store.id);

    if (error) throw error;
    
    setStore({ ...store, ...updates });
    toast({ title: "Store updated!" });
  };

  const createProduct = async (data: Omit<Product, "id" | "store_id" | "views" | "created_at" | "updated_at">) => {
    if (!store) throw new Error("No store found");

    const { data: newProduct, error } = await supabase
      .from("products")
      .insert({
        store_id: store.id,
        ...data,
      })
      .select()
      .single();

    if (error) throw error;
    
    setProducts([newProduct, ...products]);
    toast({ title: "Product added!" });
    return newProduct;
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    const { error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", productId);

    if (error) throw error;
    
    setProducts(products.map(p => p.id === productId ? { ...p, ...updates } : p));
    toast({ title: "Product updated!" });
  };

  const deleteProduct = async (productId: string) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) throw error;
    
    setProducts(products.filter(p => p.id !== productId));
    toast({ title: "Product deleted!" });
  };

  const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) throw error;
    
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    toast({ title: "Order status updated!" });
  };

  return {
    store,
    products,
    orders,
    loading,
    createStore,
    updateStore,
    createProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    refetch: loadData,
  };
};
