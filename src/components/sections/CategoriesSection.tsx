import { useRef } from "react";
import { 
  Utensils, 
  Shirt, 
  Laptop, 
  BookOpen, 
  Scissors, 
  Camera,
  Briefcase,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Food & Snacks", icon: Utensils, color: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400" },
  { name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400" },
  { name: "Electronics", icon: Laptop, color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },
  { name: "Books & Notes", icon: BookOpen, color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400" },
  { name: "Beauty & Care", icon: Scissors, color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400" },
  { name: "Photography", icon: Camera, color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400" },
  { name: "Tutoring", icon: Briefcase, color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400" },
  { name: "Other Services", icon: Sparkles, color: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400" },
];

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoriesSection = ({ selectedCategory, onCategorySelect }: CategoriesSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      onCategorySelect(null);
    } else {
      onCategorySelect(categoryName);
    }
  };

  return (
    <section id="categories" className="py-12 md:py-16 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-primary font-semibold mb-2 text-sm">CATEGORIES</p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Browse by Category
          </h2>
        </div>

        {/* Categories Carousel */}
        <div className="relative">
          {/* Scroll Buttons - Hidden on mobile, visible on desktop */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-background/90 backdrop-blur-sm shadow-md -ml-4"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-background/90 backdrop-blur-sm shadow-md -mr-4"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* All Categories Option */}
            <button
              onClick={() => onCategorySelect(null)}
              className={cn(
                "flex-shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200",
                !selectedCategory
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium whitespace-nowrap">All</span>
            </button>

            {categories.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={cn(
                    "flex-shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card border-border hover:border-primary/50 hover:bg-accent"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full",
                    isSelected ? "bg-primary-foreground/20" : category.color
                  )}>
                    <category.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
