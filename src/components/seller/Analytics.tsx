import { Eye, MessageSquare, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import type { Store, Product, Order } from "@/hooks/useStore";

interface AnalyticsProps {
  store: Store;
  products: Product[];
  orders: Order[];
}

const Analytics = ({ store, products, orders }: AnalyticsProps) => {
  const totalViews = store.total_views + products.reduce((sum, p) => sum + p.views, 0);
  const totalSales = orders.filter(o => o.status === "completed").length;
  const totalRevenue = orders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + o.total_amount, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const stats = [
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Completed Sales",
      value: totalSales.toString(),
      icon: ShoppingBag,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Pending Orders",
      value: pendingOrders.toString(),
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.color} mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
