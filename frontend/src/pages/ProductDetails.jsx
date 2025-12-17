import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { useRoute } from "wouter";
import { useState } from "react";
import { Minus, Plus, Star, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { cn } from "../lib/utils";
import { useLanguage } from "../lib/i18n";
import creamImage from "../../generated_images/luxury_face_cream_jar.png";
import serumImage from "../../generated_images/premium_serum_bottle.png";
import perfumeImage from "../../generated_images/elegant_perfume_bottle.png";
import clipperImage from "../../generated_images/professional_hair_clipper.png";
import dryerImage from "../../generated_images/professional_hair_dryer.png";

// Mock data lookup
export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const { toast } = useToast();
  const { t, dir } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [isBulk, setIsBulk] = useState(false);

  // Reconstruct products here to access translation for names if needed, 
  // though typically this would come from an API.
  const PRODUCTS = {
    "1": { id: "1", name: "Luminous Silk Cream", price: 85.00, category: "Skincare", image: creamImage, description: "A luxurious anti-aging cream that deeply hydrates and revitalizes skin texture. Infused with rare silk proteins and botanical extracts." },
    "2": { id: "2", name: "Radiance Serum Elixir", price: 110.00, category: "Skincare", image: serumImage, description: "A potent concentrated serum that targets fine lines and uneven tone. Reveals your natural radiance with every drop." },
    "3": { id: "3", name: "Rose Gold Essence", price: 145.00, category: "Fragrance", image: perfumeImage, description: "An enchanting blend of Bulgarian rose, warm amber, and white musk. A sophisticated scent for the modern muse." },
    "9": { id: "9", name: t("product.clipper"), price: 120.00, category: "Tools", image: clipperImage, description: "Professional grade hair clipper with titanium blades and ergonomic design." },
    "10": { id: "10", name: t("product.dryer"), price: 180.00, category: "Tools", image: dryerImage, description: "Advanced ionic technology for frizz-free, shiny hair. Ultra-quiet motor." },
  };

  // Default to first product if ID not found or loading
  const product = params && PRODUCTS[params.id] ? PRODUCTS[params.id] : PRODUCTS["1"];

  const handleAddToCart = () => {
    const finalQuantity = isBulk ? quantity * 12 : quantity;
    const type = isBulk ? "Case(s)" : "Unit(s)";
    
    // Construct WhatsApp message
    const message = `${t("whatsapp.message")} ${finalQuantity} x ${product.name} (${type})`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const currentPrice = isBulk ? product.price * 0.85 : product.price; // 15% discount for bulk

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Header />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-secondary/50 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-secondary/30 rounded-md cursor-pointer hover:bg-secondary/50 transition-colors overflow-hidden">
                     <img src={product.image} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-accent">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 {t("product.reviews")})</span>
              </div>
              
              <div className="text-2xl font-medium mb-8 flex items-baseline gap-2">
                ${currentPrice.toFixed(2)}
                {isBulk && <span className="text-sm text-primary font-normal">{t("product.bulkDiscount")}</span>}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="h-px bg-border mb-8" />

              {/* Buying Options */}
              <div className="space-y-6">
                <div className="flex gap-4">
                   <button 
                    onClick={() => setIsBulk(false)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-md border text-sm font-medium transition-all",
                      !isBulk ? "border-primary bg-primary/5 text-primary-foreground ring-1 ring-primary" : "border-border hover:border-foreground/30"
                    )}
                   >
                     {t("product.single")}
                   </button>
                   <button 
                    onClick={() => setIsBulk(true)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-md border text-sm font-medium transition-all",
                      isBulk ? "border-primary bg-primary/5 text-primary-foreground ring-1 ring-primary" : "border-border hover:border-foreground/30"
                    )}
                   >
                     {t("product.bulk")}
                   </button>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center border border-border rounded-md">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button size="lg" className="flex-1 gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none" onClick={handleAddToCart}>
                    <MessageCircle className="w-5 h-5" />
                    {t("product.addToCart")}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Truck className="w-5 h-5" />
                      <span>{t("product.freeShipping")}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <ShieldCheck className="w-5 h-5" />
                      <span>{t("product.secureCheckout")}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}