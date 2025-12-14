import { Star, MapPin, Verified } from "lucide-react";
import { Button } from "@/components/ui/button";

const stores = [
  {
    id: 1,
    name: "FreshCuts Barber",
    description: "Professional haircuts and grooming services for gents",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&faces",
    rating: 4.9,
    reviews: 156,
    location: "Block A, Room 24",
    verified: true,
    products: 8
  },
  {
    id: 2,
    name: "TechFix Hub",
    description: "Phone repairs, accessories, and tech support",
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&faces",
    rating: 4.7,
    reviews: 89,
    location: "Engineering Block",
    verified: true,
    products: 24
  },
  {
    id: 3,
    name: "Mama's Kitchen",
    description: "Homemade African dishes delivered to your door",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&faces",
    rating: 5.0,
    reviews: 234,
    location: "Female Hostel Area",
    verified: true,
    products: 15
  }
];

const FeaturedStores = () => {
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
          {stores.map((store, index) => (
            <div
              key={store.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-5 pt-0">
                {/* Avatar */}
                <div className="relative -mt-10 mb-4">
                  <img
                    src={store.avatar}
                    alt={store.name}
                    className="w-20 h-20 rounded-xl object-cover border-4 border-card shadow-lg"
                  />
                  {store.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                      <Verified className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {store.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {store.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{store.rating}</span>
                    <span className="text-muted-foreground">({store.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{store.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {store.products} products
                  </span>
                  <Button size="sm">Visit Store</Button>
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
