import { 
  Utensils, 
  Shirt, 
  Laptop, 
  BookOpen, 
  Scissors, 
  Camera,
  Briefcase,
  Sparkles
} from "lucide-react";

const categories = [
  { name: "Food & Snacks", icon: Utensils, color: "bg-orange-100 text-orange-600" },
  { name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600" },
  { name: "Electronics", icon: Laptop, color: "bg-blue-100 text-blue-600" },
  { name: "Books & Notes", icon: BookOpen, color: "bg-green-100 text-green-600" },
  { name: "Beauty & Care", icon: Scissors, color: "bg-purple-100 text-purple-600" },
  { name: "Photography", icon: Camera, color: "bg-amber-100 text-amber-600" },
  { name: "Tutoring", icon: Briefcase, color: "bg-cyan-100 text-cyan-600" },
  { name: "Other Services", icon: Sparkles, color: "bg-rose-100 text-rose-600" },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold mb-3">CATEGORIES</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find exactly what you need from your fellow students, organized by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href="#"
              className="group relative bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Browse →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
