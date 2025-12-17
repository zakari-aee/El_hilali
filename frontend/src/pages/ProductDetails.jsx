import React, { useState, useMemo } from "react";
import { useRoute } from "wouter";
import { 
  Minus, 
  Plus, 
  Star, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  ChevronLeft,
  Share2,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
// Images
import creamImage from "../../generated_images/luxury_face_cream_jar.png";
import serumImage from "../../generated_images/premium_serum_bottle.png";
import perfumeImage from "../../generated_images/elegant_perfume_bottle.png";
import clipperImage from "../../generated_images/professional_hair_clipper.png";
import dryerImage from "../../generated_images/professional_hair_dryer.png";


// Internalized Utility for class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Internalized Button Component
const Button = ({ children, className, onClick, variant = "primary", size = "md" }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50";
  const variants = {
    primary: "bg-black text-white hover:bg-black/80",
    secondary: "bg-[#25D366] hover:bg-[#128C7E] text-white",
    outline: "border border-black/10 bg-transparent text-black hover:border-black",
  };
  const sizes = {
    md: "px-6 py-3 text-[10px]",
    lg: "px-10 py-4 text-[11px]",
  };
  
  return (
    <button onClick={onClick} className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
};

export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const [quantity, setQuantity] = useState(1);
  const [isBulk, setIsBulk] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Re-mapping products with high-quality descriptions
  const PRODUCTS = useMemo(() => ({
    "1": { id: "1", name: "Luminous Silk Cream", price: 85.00, category: "Skincare", image: creamImage, description: "A luxurious anti-aging cream that deeply hydrates and revitalizes skin texture. Infused with rare silk proteins and botanical extracts for a radiant, youthful complexion." },
    "2": { id: "2", name: "Radiance Serum Elixir", price: 110.00, category: "Skincare", image: serumImage, description: "A potent concentrated serum that targets fine lines and uneven tone. Reveals your natural radiance with every drop using advanced molecular technology." },
    "3": { id: "3", name: "Rose Gold Essence", price: 145.00, category: "Fragrance", image: perfumeImage, description: "An enchanting blend of Bulgarian rose, warm amber, and white musk. A sophisticated scent designed for the modern muse who commands attention." },
    "9": { id: "9", name: "Precision Pro Clipper", price: 120.00, category: "Tools", image: clipperImage, description: "Professional grade hair clipper with titanium-coated blades and a high-torque motor. Ergonomically designed for absolute control and precision." },
    "10": { id: "10", name: "Ionic Professional Dryer", price: 180.00, category: "Tools", image: dryerImage, description: "Advanced ionic technology for frizz-free, shiny hair. Features a salon-grade AC motor that is remarkably quiet yet powerful." },
  }), []);

  const product = (params && PRODUCTS[params.id]) ? PRODUCTS[params.id] : PRODUCTS["1"];
  const currentPrice = isBulk ? product.price * 0.85 : product.price;

  const handleWhatsAppOrder = () => {
  const finalQuantity = isBulk ? quantity * 12 : quantity;
  const type = isBulk ? "Case(s)" : "Unit(s)";
  const message = `Bonjour El Hilali, je souhaite commander: ${finalQuantity} x ${product.name} (${type}). Prix total estimé: $${(currentPrice * quantity).toFixed(2)}`;
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "212657335157";

  window.open(
    `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
    "_blank"
  );
};


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 md:px-10">
          
          {/* Breadcrumb / Back */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black mb-12 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Collection
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
            
            {/* Left: Image Gallery */}
            <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-6">
              <div className="flex-1 aspect-[4/5] bg-[#F9F9F9] overflow-hidden relative group">
                <motion.img 
                  key={product.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"; }}
                />
                <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex md:flex-col gap-4 overflow-x-auto no-scrollbar md:w-24">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "flex-shrink-0 w-20 md:w-full aspect-square bg-[#F9F9F9] cursor-pointer transition-all duration-300 border",
                      activeImage === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={product.image} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="lg:col-span-5">
              <div className="sticky top-40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[1px] w-6 bg-black/20" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A27D]">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tighter leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex text-[#C5A27D]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">
                    4.9 / 5.0 (24 Reviews)
                  </span>
                </div>

                <div className="text-3xl font-serif mb-10 text-black/90">
                  ${currentPrice.toFixed(2)}
                  {isBulk && (
                    <span className="ml-4 text-[10px] font-bold uppercase tracking-widest text-[#C5A27D] align-middle">
                      Bulk Pricing Applied (15% Off)
                    </span>
                  )}
                </div>

                <p className="text-black/50 text-base leading-relaxed font-medium mb-10 border-l-2 border-black/5 pl-6 italic">
                  "{product.description}"
                </p>

                <div className="space-y-8">
                  {/* Order Mode */}
                  <div className="flex p-1 bg-[#F9F9F9] rounded-sm">
                    <button 
                      onClick={() => setIsBulk(false)}
                      className={cn(
                        "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all",
                        !isBulk ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black"
                      )}
                    >
                      Single Item
                    </button>
                    <button 
                      onClick={() => setIsBulk(true)}
                      className={cn(
                        "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all",
                        isBulk ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black"
                      )}
                    >
                      Bulk Order (Pack of 12)
                    </button>
                  </div>

                  {/* Quantity & CTA */}
                  <div className="flex gap-4">
                    <div className="flex items-center border border-black/10 px-4 h-14">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:text-[#C5A27D] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:text-[#C5A27D] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <Button 
                      variant="secondary" 
                      className="flex-1 h-14 gap-3"
                      onClick={handleWhatsAppOrder}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Order via WhatsApp
                    </Button>
                    
                    <button className="w-14 h-14 flex items-center justify-center border border-black/10 hover:border-black transition-colors group">
                      <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-black/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#F9F9F9] rounded-full">
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-black/60 leading-tight">
                        Free Express<br />Shipping
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#F9F9F9] rounded-full">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-black/60 leading-tight">
                        Authentic<br />Guaranteed
                      </span>
                    </div>
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