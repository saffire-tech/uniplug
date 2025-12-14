import { Button } from "@/components/ui/button";
import { Store, ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-background rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-background rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-background rounded-full" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Join 500+ Campus Entrepreneurs</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Start Your Campus Business?
            </h2>
            
            <p className="text-lg text-primary-foreground/80 mb-8">
              Create your store in minutes and start selling to thousands of students on your campus. No fees to get started.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 gap-2"
              >
                <Store className="h-5 w-5" />
                Create Free Store
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="link" 
                size="xl"
                className="text-primary-foreground hover:text-primary-foreground/80"
              >
                Learn More →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
