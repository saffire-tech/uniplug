import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ShoppingBag, ShoppingCart, Store, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import GlobalSearch from "@/components/search/GlobalSearch";
import uniplugLogo from "@/assets/uniplug-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={uniplugLogo} alt="Uniplug" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Products
            </Link>
            <Link to="/stores" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Stores
            </Link>
            <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Categories
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              How it Works
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-64">
              <GlobalSearch variant="navbar" />
            </div>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <>
                <Link to="/seller">
                  <Button variant="outline" className="gap-2">
                    <Store className="h-4 w-4" />
                    My Store
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="gap-2">
                    <Store className="h-4 w-4" />
                    Open Store
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="hero" className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Start Shopping
                  </Button>
                </Link>
              </>
            )}
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
              <Link to="/products" className="text-foreground font-medium py-2">
                Browse Products
              </Link>
              <Link to="/stores" className="text-foreground font-medium py-2">
                Browse Stores
              </Link>
              <a href="#categories" className="text-foreground font-medium py-2">
                Categories
              </a>
              <a href="#how-it-works" className="text-foreground font-medium py-2">
                How it Works
              </a>
              <hr className="border-border" />
              <Link to="/cart">
                <Button variant="ghost" className="w-full gap-2 relative">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  {totalItems > 0 && (
                    <Badge className="ml-2">{totalItems}</Badge>
                  )}
                </Button>
              </Link>
              {user ? (
                <>
                  <Link to="/seller">
                    <Button variant="outline" className="w-full gap-2">
                      <Store className="h-4 w-4" />
                      My Store
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="ghost" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full gap-2" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline" className="w-full gap-2">
                      <Store className="h-4 w-4" />
                      Open Store
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="hero" className="w-full gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Start Shopping
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
