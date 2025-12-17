import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/ui/ProductCard";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { useState, useMemo } from "react";
import { useLanguage } from "../lib/i18n";
import { useLocation } from "wouter";
import creamImage from "../../generated_images/luxury_face_cream_jar.png";
import serumImage from "../../generated_images/premium_serum_bottle.png";
import perfumeImage from "../../generated_images/elegant_perfume_bottle.png";
import clipperImage from "../../generated_images/professional_hair_clipper.png";
import dryerImage from "../../generated_images/professional_hair_dryer.png";

export default function Products() {
  const { t, dir } = useLanguage();
  const [location] = useLocation();
  const [priceRange, setPriceRange] = useState([300]);
  const [categories, setCategories] = useState([]);

  // Expanded mock data with new items
  const ALL_PRODUCTS = [
    { id: "1", name: "Luminous Silk Cream", price: 85.00, category: "Skincare", image: creamImage },
    { id: "2", name: "Radiance Serum Elixir", price: 110.00, category: "Skincare", image: serumImage },
    { id: "3", name: "Rose Gold Essence", price: 145.00, category: "Fragrance", image: perfumeImage },
    { id: "4", name: "Velvet Night Repair", price: 95.00, category: "Skincare", image: creamImage },
    { id: "5", name: "Hydrating Mist", price: 45.00, category: "Skincare", image: serumImage },
    { id: "6", name: "Lip Volume Complex", price: 35.00, category: "Makeup", image: creamImage },
    { id: "7", name: "Midnight Musk", price: 120.00, category: "Fragrance", image: perfumeImage },
    { id: "8", name: "Glow Drops", price: 55.00, category: "Makeup", image: serumImage },
    { id: "9", name: t("product.clipper"), price: 120.00, category: "Tools", image: clipperImage },
    { id: "10", name: t("product.dryer"), price: 180.00, category: "Tools", image: dryerImage },
    { id: "11", name: "Pro Comb Set", price: 25.00, category: "Accessories", image: clipperImage }, // Mock image
  ];

  // Parse search query
  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search")?.toLowerCase() || "";
  }, [location]);

  const toggleCategory = (category) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesPrice = product.price <= priceRange[0];
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) || 
                         product.category.toLowerCase().includes(searchQuery);
    return matchesPrice && matchesCategory && matchesSearch;
  });

  const categoryList = [
    { id: "Skincare", label: t("cat.skincare") },
    { id: "Makeup", label: t("cat.makeup") },
    { id: "Fragrance", label: t("cat.fragrance") },
    { id: "Body Care", label: t("cat.bodyCare") },
    { id: "Accessories", label: t("cat.accessories") },
    { id: "Tools", label: t("cat.tools") },
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("shop.collection")}</h1>
            <p className="text-muted-foreground">
              {t("shop.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 space-y-8 sticky top-24 h-fit">
              <div>
                <h3 className="font-serif font-semibold text-lg mb-4">{t("shop.filters")}</h3>
                <div className="space-y-3">
                  {categoryList.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id} 
                        checked={categories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={category.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif font-semibold text-lg mb-4">{t("shop.price")}</h3>
                <div className="space-y-4">
                  <Slider 
                    defaultValue={[300]} 
                    max={500} 
                    step={10} 
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$0</span>
                    <span>Max: ${priceRange[0]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([500]);
                    setCategories([]);
                  }}
                >
                  {t("shop.reset")}
                </Button>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}