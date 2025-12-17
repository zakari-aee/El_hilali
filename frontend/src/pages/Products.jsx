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
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";

// Images
import creamImage from "../../generated_images/luxury_face_cream_jar.png";
import serumImage from "../../generated_images/premium_serum_bottle.png";
import perfumeImage from "../../generated_images/elegant_perfume_bottle.png";
import clipperImage from "../../generated_images/professional_hair_clipper.png";
import dryerImage from "../../generated_images/professional_hair_dryer.png";

/**
 * EL HILALI LUXURY PRODUCTS PAGE
 * Optimized for high performance and responsive design across all devices.
 */
export default function Products() {
  const { t, dir } = useLanguage();
  const [location] = useLocation();
  const [priceRange, setPriceRange] = useState([300]);
  const [categories, setCategories] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Expanded mock data with your specific images
  const ALL_PRODUCTS = [
    { id: "1", name: "Luminous Silk Cream", price: 85.00, category: "Skincare", image: creamImage },
    { id: "2", name: "Radiance Serum Elixir", price: 110.00, category: "Skincare", image: serumImage },
    { id: "3", name: "Rose Gold Essence", price: 145.00, category: "Fragrance", image: perfumeImage },
    { id: "4", name: "Velvet Night Repair", price: 95.00, category: "Skincare", image: creamImage },
    { id: "5", name: "Hydrating Mist", price: 45.00, category: "Skincare", image: serumImage },
    { id: "6", name: "Lip Volume Complex", price: 35.00, category: "Makeup", image: creamImage },
    { id: "7", name: "Midnight Musk", price: 120.00, category: "Fragrance", image: perfumeImage },
    { id: "8", name: "Glow Drops", price: 55.00, category: "Makeup", image: serumImage },
    { id: "9", name: t("product.clipper") || "Precision Clipper", price: 120.00, category: "Tools", image: clipperImage },
    { id: "10", name: t("product.dryer") || "Professional Dryer", price: 180.00, category: "Tools", image: dryerImage },
    { id: "11", name: "Pro Comb Set", price: 25.00, category: "Accessories", image: clipperImage },
  ];

  // Parse search query from URL
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

  const FiltersContent = () => (
    <div className="space-y-10">
      <div>
        <h3 className="font-serif font-bold text-xl mb-6 tracking-tight uppercase text-[12px]">{t("shop.filters")}</h3>
        <div className="space-y-4">
          {categoryList.map((category) => (
            <div key={category.id} className="flex items-center space-x-3 group">
              <Checkbox 
                id={category.id} 
                checked={categories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label 
                htmlFor={category.id} 
                className="text-[11px] font-bold uppercase tracking-widest text-black/60 group-hover:text-black transition-colors cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif font-bold text-xl mb-6 tracking-tight uppercase text-[12px]">{t("shop.price")}</h3>
        <div className="space-y-6 px-1">
          <Slider 
            defaultValue={[500]} 
            max={500} 
            step={10} 
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-black/40">
            <span>$0</span>
            <span className="text-black">Max: ${priceRange[0]}</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-black/5">
        <Button 
          variant="outline" 
          className="w-full text-[10px]"
          onClick={() => {
            setPriceRange([500]);
            setCategories([]);
          }}
        >
          {t("shop.reset")}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={dir}>
      <Header />
      
      <main className="flex-1 pt-32 pb-24 md:pt-40">
        <div className="container mx-auto px-6 md:px-10">
          
          {/* Collection Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-3 mb-6"
             >
               <div className="h-[1px] w-8 bg-black/20" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">La Maison El Hilali</span>
             </motion.div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter leading-none">
               {t("shop.collection")}
             </h1>
             <p className="text-black/50 text-lg md:text-xl font-serif italic leading-relaxed">
               {t("shop.desc") || "Discover our curated collection of luxury essentials."}
             </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-10 flex justify-between items-center border-y border-black/5 py-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-black/40">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </span>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block lg:col-span-3 space-y-12 sticky top-32 h-fit">
              <FiltersContent />
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-32 border border-dashed border-black/10">
                  <p className="text-lg font-serif italic text-black/40">
                    No products found matching your exquisite taste.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => setLocation("/products")}
                  >
                    View All Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: dir === 'rtl' ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? "-100%" : "100%" }}
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} h-full w-[85%] sm:w-[400px] bg-white z-[110] shadow-2xl p-8 overflow-y-auto`}
            >
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-black/5">
                <span className="text-[12px] font-bold uppercase tracking-widest">Filter Collection</span>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-black/5 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FiltersContent />
              <div className="mt-12">
                <Button className="w-full" onClick={() => setIsMobileFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}