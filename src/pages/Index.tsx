import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import RecommendedProducts from "@/components/sections/RecommendedProducts";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedStores from "@/components/sections/FeaturedStores";
import DownloadBanner from "@/components/sections/DownloadBanner";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <RecommendedProducts />
      <CategoriesSection 
        selectedCategory={selectedCategory} 
        onCategorySelect={setSelectedCategory} 
      />
      <FeaturedProducts selectedCategory={selectedCategory} />
      <HowItWorks />
      <FeaturedStores />
      <DownloadBanner />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
