import { Link } from "wouter";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/ui/ProductCard";
import { Button } from "../components/ui/button";
import { ArrowRight, Star, Leaf, ShieldCheck, ArrowLeft } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { motion } from "framer-motion";
import storeImage from "../../generated_images/store.jpg";
import creamImage from "../../generated_images/luxury_face_cream_jar.png";
import serumImage from "../../generated_images/premium_serum_bottle.png";
import perfumeImage from "../../generated_images/elegant_perfume_bottle.png";
import clipperImage from "../../generated_images/professional_hair_clipper.png";

// Mock data
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Luminous Silk Cream",
    price: 85.00,
    category: "Skincare",
    image: creamImage
  },
  {
    id: "2",
    name: "Radiance Serum Elixir",
    price: 110.00,
    category: "Skincare",
    image: serumImage
  },
  {
    id: "3",
    name: "Rose Gold Essence",
    price: 145.00,
    category: "Fragrance",
    image: perfumeImage
  },
  {
    id: "9",
    name: "Pro Precision Clipper",
    price: 120.00,
    category: "Tools",
    image: clipperImage
  }
];

export default function Home() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-[#F9F6F3] overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 lg:pt-0">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-sm border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase">{t("hero.newCollection")}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-foreground">
                {t("hero.title.prefix")} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic pr-2">
                  {t("hero.title.suffix")}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {t("hero.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="rounded-full px-8 py-6 h-auto text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                    {t("btn.shopNow")}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto text-base bg-white/50 backdrop-blur-sm hover:bg-white">
                    {t("btn.ourStory")}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src={storeImage} 
                  alt="El Hilali Store" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              {/* Floating Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </section>

        {/* Features Strip */}
        <section className="py-12 bg-white border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg">{t("feat.natural")}</h3>
                  <p className="text-sm text-muted-foreground">{t("feat.natural.desc")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg">{t("feat.dermatologist")}</h3>
                  <p className="text-sm text-muted-foreground">{t("feat.dermatologist.desc")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg">{t("feat.quality")}</h3>
                  <p className="text-sm text-muted-foreground">{t("feat.quality.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t("home.trending")}</h2>
                <p className="text-muted-foreground max-w-md">
                  {t("home.trending.desc")}
                </p>
              </div>
              <Link href="/products" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors">
                {t("btn.viewAll")}
                {dir === 'rtl' ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Image Text Block */}
        <section className="py-24 bg-secondary overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="aspect-square rounded-full bg-white p-8 relative z-10 shadow-xl">
                  <img 
                    src={creamImage} 
                    alt="Premium Cream" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/30 rounded-full z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary/10 rounded-full z-0" />
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                  {t("home.science")} <span className="text-primary-foreground italic">{t("home.sophistication")}</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t("home.philosophy.desc")}
                </p>
                <Button className="rounded-full px-8 py-6 h-auto text-base">
                  {t("btn.philosophy")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}