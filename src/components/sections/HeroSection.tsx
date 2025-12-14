import { Button } from "@/components/ui/button";
import { ShoppingBag, Store, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import GlobalSearch from "@/components/search/GlobalSearch";

const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{
        animationDelay: '-3s'
      }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8 animate-fade-up">
            <Zap className="h-4 w-4" />
            <span>Your Campus Marketplace</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-up" style={{
          animationDelay: '0.1s'
        }}>
            Connect to{" "}
            <span className="text-gradient text-primary-foreground">Commerce</span>
            <br />
            On Your Campus
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{
          animationDelay: '0.2s'
        }}>Buy and sell goods & services with fellow students. Set up your store, showcase your skills, and grow your hustle right where you are.</p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <GlobalSearch variant="hero" placeholder="Search for products, services, or stores..." />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{
          animationDelay: '0.3s'
        }}>
            <Link to="/products">
              <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                <ShoppingBag className="h-5 w-5" />
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/seller">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto gap-2">
                <Store className="h-5 w-5" />
                Create Your Store
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-border/50 animate-fade-up" style={{
          animationDelay: '0.4s'
        }}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Active Stores</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">2,000+</p>
              <p className="text-sm text-muted-foreground mt-1">Products Listed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">10k+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Students</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;