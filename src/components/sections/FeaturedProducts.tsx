import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Handmade Beaded Bracelet",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop",
    seller: "ArtsByAma",
    rating: 4.8,
    reviews: 24,
    category: "Fashion"
  },
  {
    id: 2,
    name: "Fresh Homemade Chin-Chin",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
    seller: "FoodieKwame",
    rating: 4.9,
    reviews: 56,
    category: "Food & Snacks"
  },
  {
    id: 3,
    name: "Python Programming Notes",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop",
    seller: "TechNerd",
    rating: 4.7,
    reviews: 89,
    category: "Books & Notes"
  },
  {
    id: 4,
    name: "Professional Haircut Service",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop",
    seller: "FreshCuts",
    rating: 4.9,
    reviews: 112,
    category: "Services"
  },
  {
    id: 5,
    name: "Custom Phone Cases",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    seller: "PhoneFix",
    rating: 4.6,
    reviews: 34,
    category: "Electronics"
  },
  {
    id: 6,
    name: "Portrait Photography Session",
    price: 30.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    seller: "LensArtist",
    rating: 5.0,
    reviews: 67,
    category: "Services"
  },
];

const FeaturedProducts = () => {
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
          <Button variant="outline" className="w-fit">
            View All Products
          </Button>
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
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                  <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">by {product.seller}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button size="sm" className="gap-2">
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
