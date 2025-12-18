import { Button } from "@/components/ui/button";
import { Smartphone, Download } from "lucide-react";
import { Link } from "react-router-dom";

const DownloadBanner = () => {
  return (
    <section className="py-12 bg-primary/5 border-y border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground">Get the Uniplug App</h3>
              <p className="text-muted-foreground">Shop and sell on the go. Download for iOS or Android.</p>
            </div>
          </div>
          <Link to="/download">
            <Button variant="hero" size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;
