import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import uniplugLogo from "@/assets/uniplug-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={uniplugLogo} alt="Uniplug" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-background/70 mb-6">
              Connecting campus entrepreneurs with students. Buy, sell, and grow your hustle.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Browse Products</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Featured Stores</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Categories</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Become a Seller</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Report an Issue</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Store Guidelines</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Prohibited Items</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Uniplug. All rights reserved. Connect to Commerce.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
