import { Link } from "wouter";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/ui/ProductCard";
import { Button } from "../components/ui/button";
import { 
  ArrowRight, 
  Star, 
  Leaf, 
  ShieldCheck, 
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { motion } from "framer-motion";
import { useMemo } from "react";
import data from "../data/data";

// Assets
import storeImage from "../../generated_images/store.jpg";
import creamImage from "../../generated_images/luxury_face_cream_jar.png";
import FAQ from "./FAQ";
import WhyChooseUs from "./WhyChooseUs";

export default function Home() {
  const { t, dir } = useLanguage();

  // Get first 4 products from local data
  const products = useMemo(() => {
    return data.slice(0, 4).map(product => ({
      id: product._id || product.id,
      name: product.name,
      price: product.singlePrice || product.price || product.pricePerUnit || product.unitPrice || 0,
      bulkPrice: product.bulkPrice || (product.singlePrice || product.price || product.pricePerUnit || product.unitPrice || 0) * 0.85,
      category: product.category,
      image: product.image || `https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800`
    }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={dir}>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Luxury Redesign */}
        <section className="relative min-h-[90vh] flex items-center bg-[#FDFBF9] overflow-hidden pt-20 lg:pt-0">
          <div className="container mx-auto px-6 md:px-10 z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="w-10 h-[1px] bg-primary" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
                  {t("hero.newCollection")}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1] mb-8 text-black tracking-tighter">
                {t("hero.title.prefix")} <br/>
                <span className="text-primary italic font-normal">
                  {t("hero.title.suffix")}
                </span>
              </h1>
              
              <p className="text-lg text-black/50 mb-10 max-w-lg leading-relaxed font-medium">
                {t("hero.description")}
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link href="/products">
                  <button className="bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] px-10 py-5 hover:bg-primary transition-all duration-500 shadow-xl shadow-black/10">
                    {t("btn.shopNow")}
                  </button>
                </Link>
                <Link href="/about">
                  <button className="border border-black/10 text-black text-[11px] font-bold uppercase tracking-[0.2em] px-10 py-5 hover:border-black transition-all duration-500 bg-white/50 backdrop-blur-sm">
                    {t("btn.ourStory")}
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative aspect-[4/5] md:aspect-square overflow-hidden shadow-2xl rounded-sm">
                <img 
                  src={storeImage} 
                  alt="El Hilali Store" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </div>
              {/* Floating Decorative Elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-black/5 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </section>

        {/* Features Strip - Luxury Redesign */}
        <section className="py-20 bg-white border-b border-black/5">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex items-start gap-6 group">
                <div className="h-14 w-14 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-primary group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2">{t("feat.natural")}</h3>
                  <p className="text-[13px] text-black/40 leading-relaxed font-medium">{t("feat.natural.desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="h-14 w-14 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-primary group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2">{t("feat.dermatologist")}</h3>
                  <p className="text-[13px] text-black/40 leading-relaxed font-medium">{t("feat.dermatologist.desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="h-14 w-14 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-primary group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2">{t("feat.quality")}</h3>
                  <p className="text-[13px] text-black/40 leading-relaxed font-medium">{t("feat.quality.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products - Luxury Redesign */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Selection</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tighter">{t("home.trending")}</h2>
                <p className="text-black/50 font-medium max-w-md">
                  {t("home.trending.desc")}
                </p>
              </div>
              <Link href="/products" className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                {t("btn.viewAll")}
                {dir === 'rtl' ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                )}
              </Link>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.id || `product-${index}`}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-black/10">
                <p className="text-lg font-serif italic text-black/40 mb-4">
                  No products available
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Image Text Block - Luxury Redesign */}
        <section className="py-32 bg-[#FDFBF9] overflow-hidden">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative order-2 lg:order-1 flex justify-center">
                <div className="aspect-square w-full max-w-lg bg-white p-4 shadow-2xl relative z-10 border border-black/5">
                  <img 
                    src={creamImage} 
                    alt="Premium Cream" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                {/* Luxury Decorative Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-primary/20 rounded-full z-0 hidden lg:block" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-black/5 rounded-full z-0 hidden lg:block" />
              </div>
              
              <div className="order-1 lg:order-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block">Philosophy</span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1] tracking-tighter text-black">
                  {t("home.science")} <br/>
                  <span className="text-primary italic font-normal">{t("home.sophistication")}</span>
                </h2>
                <p className="text-lg text-black/50 mb-10 leading-relaxed font-medium">
                  {t("home.philosophy.desc")}
                </p>
                <button className="bg-transparent border-b-2 border-black pb-1 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-primary hover:border-primary transition-all">
                  {t("btn.philosophy") || "Discover More"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </div>
  );
}