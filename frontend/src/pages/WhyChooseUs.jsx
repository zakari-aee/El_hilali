import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles, Heart } from "lucide-react";

/**
 * WHY CHOOSE US COMPONENT (PERFORMANCE OPTIMIZED)
 * Designed for low-end devices:
 * - Minimal Framer Motion overhead
 * - Native CSS transitions for hover effects
 * - Simplified grid structure to prevent layout thrashing
 */

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div 
    className="group p-8 md:p-10 bg-white border border-black/5 hover:border-black/20 transition-colors duration-500 relative overflow-hidden h-full flex flex-col items-start"
  >
    {/* Static decorative element (replaces animated version for performance) */}
    <div className="absolute -right-4 -bottom-4 text-black/[0.03] select-none pointer-events-none group-hover:text-black/[0.06] transition-colors duration-700">
      <Icon size={100} strokeWidth={1} />
    </div>

    <div className="h-14 w-14 bg-[#FDFBF9] border border-black/5 flex items-center justify-center mb-8 text-black group-hover:bg-black group-hover:text-white transition-all duration-300 ease-out">
      <Icon className="w-5 h-5" />
    </div>

    <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4 text-black">
      {title}
    </h3>
    
    <p className="text-black/50 text-sm leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Héritage Artisanal",
      description: "Un savoir-faire ancestral marocain, préservé et sublimé par des décennies de passion familiale."
    },
    {
      icon: ShieldCheck,
      title: "Pureté Garantie",
      description: "Une sélection rigoureuse d'ingrédients bio et naturels, sans compromis sur la sécurité."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "L'union parfaite entre extraits botaniques rares et technologies cosmétiques avancées."
    },
    {
      icon: Heart,
      title: "Luxe Éthique",
      description: "Production responsable valorisant les coopératives locales du Royaume du Maroc."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FDFBF9]">
      <div className="container mx-auto px-6 md:px-10">
        
        {/* Simplified Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-4 mb-6 opacity-60">
            <span className="w-8 h-[1px] bg-black" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black">
              L'Excellence
            </span>
            <span className="w-8 h-[1px] bg-black" />
          </div>

          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-serif font-bold tracking-tighter mb-6 italic"
          >
            Pourquoi Choisir Notre Maison
          </motion.h2>
          
          <p className="max-w-xl text-black/50 text-base md:text-lg font-medium leading-relaxed">
            Une destination où la tradition rencontre le raffinement absolu pour une expérience beauté inégalée.
          </p>
        </div>

        {/* Features Grid - Clean & Fast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Static Decorative Signature */}
        <div className="mt-20 text-center opacity-20">
          <span className="text-2xl md:text-3xl font-serif italic select-none border-t border-black/10 pt-8 px-12">
            El Hilali Maison
          </span>
        </div>
      </div>
    </section>
  );
}