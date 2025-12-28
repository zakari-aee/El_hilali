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
  Heart,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import data from "../data/data";

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

  // Find product from local data
  const product = useMemo(() => {
    if (!params?.id) return null;
    const found = data.find(p => (p._id || p.id) == params.id);
    return found || null;
  }, [params?.id]);

  // Handle WhatsApp order
  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const finalQuantity = isBulk ? quantity * 12 : quantity;
    const type = isBulk ? "Case(s)" : "Unit(s)";
    const productPrice = product.singlePrice || product.price || product.pricePerUnit || product.unitPrice || 0;
    const bulkPrice = product.bulkPrice || productPrice * 0.85;
    const currentPrice = isBulk ? bulkPrice : productPrice;
    const totalPrice = (currentPrice * quantity).toFixed(2);
    
    const message = `Bonjour El Hilali, je souhaite commander: ${finalQuantity} x ${product.name} (${type}). 
Prix unitaire: DH ${currentPrice.toFixed(2)}
Prix total estimé: DH ${totalPrice}
Catégorie: ${product.category}`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "212657335157";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  // Error state - product not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-32 pb-24 md:pt-48">
          <div className="container mx-auto px-6 md:px-10">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black mb-12 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collection
            </button>
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-lg font-serif italic text-black/40 mb-4">
                Product not found.
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
              >
                Return to Products
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productPrice = product.singlePrice || product.price || product.pricePerUnit || product.unitPrice || 0;
  const bulkPrice = product.bulkPrice || productPrice * 0.85;
  const currentPrice = isBulk ? bulkPrice : productPrice;
  const discountPercentage = isBulk 
    ? Math.round(((productPrice - bulkPrice) / productPrice) * 100)
    : 0;

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800";
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
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex-1 aspect-[4/5] bg-[#F9F9F9] overflow-hidden relative group">
                <motion.img 
                  key={product.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={product.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="lg:col-span-5">
              <div className="sticky top-40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[1px] w-6 bg-black/20" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A27D]">
                    {product.category || "Luxury"}
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

                <div className="mb-10">
                  <div className="text-3xl font-serif text-black/90 mb-2">
                    DH{currentPrice.toFixed(2)}
                    {isBulk && bulkPrice && (
                      <span className="ml-4 text-[10px] font-bold uppercase tracking-widest text-[#C5A27D] align-middle">
                        {discountPercentage}% Off
                      </span>
                    )}
                  </div>
                  
                  {isBulk && productPrice && bulkPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-black/40 line-through">
                        DH{productPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A27D]">
                        Save DH {(productPrice - bulkPrice).toFixed(2)} per unit
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-black/50 text-base leading-relaxed font-medium mb-10 border-l-2 border-black/5 pl-6 italic">
                  "{product.description || "A premium luxury product crafted with excellence."}"
                </p>

                <div className="space-y-8">
                  {/* Order Mode */}
                  {bulkPrice && (
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
                  )}

                  {/* Quantity & CTA */}
                  <div className="flex gap-4">
                    <div className="flex items-center border border-black/10 px-4 h-14">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:text-[#C5A27D] transition-colors disabled:opacity-30"
                        disabled={quantity <= 1}
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

                  {/* Price Summary */}
                  <div className="p-4 bg-[#F9F9F9] rounded-sm">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-black/60">Quantity:</span>
                      <span className="font-bold">{quantity} {isBulk ? "Case(s)" : "Unit(s)"}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-black/60">Unit Price:</span>
                      <span className="font-bold">DH : {currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-black/10 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Estimated Total:</span>
                        <span className="text-lg">DH : {(currentPrice * quantity).toFixed(2)}</span>
                      </div>
                    </div>
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