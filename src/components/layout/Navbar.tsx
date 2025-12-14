import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, Store, Search } from "lucide-react";
import uniplugLogo from "@/assets/uniplug-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src={uniplugLogo} alt="Uniplug" className="h-10 md:h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Categories
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              How it Works
            </a>
            <a href="#stores" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Stores
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Store className="h-4 w-4" />
              Open Store
            </Button>
            <Button variant="hero" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Start Shopping
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#categories" className="text-foreground font-medium py-2">
                Categories
              </a>
              <a href="#how-it-works" className="text-foreground font-medium py-2">
                How it Works
              </a>
              <a href="#stores" className="text-foreground font-medium py-2">
                Stores
              </a>
              <hr className="border-border" />
              <Button variant="outline" className="w-full gap-2">
                <Store className="h-4 w-4" />
                Open Store
              </Button>
              <Button variant="hero" className="w-full gap-2">
                <ShoppingBag className="h-4 w-4" />
                Start Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
