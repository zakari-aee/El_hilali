import React from "react";
import { motion } from "framer-motion";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useLanguage } from "../lib/i18n";
import heroImage from "../../generated_images/minimalist_luxury_cosmetics_hero_banner.png";

/**
 * LUXURY ABOUT COMPONENT
 * Restyled to match the premium "Maison" aesthetic.
 */

export default function About() {
  const { t, dir } = useLanguage();

return (
    <div className="min-h-screen flex flex-col bg-white text-black" dir={dir}>
      <Header />

      <main className="flex-1">

        {/* Hero Section - Restyled for Luxury */}
        <div className="bg-[#FDFBF9] py-32 md:py-48 border-b border-black/5">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif font-bold mb-10 leading-[0.9] tracking-tighter"
            >
              {t("about.title")}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-black/50 max-w-2xl mx-auto leading-relaxed font-medium italic font-serif"
            >
              {t("about.hero.desc")}
            </motion.p>
          </div>
        </div>

        {/* Content Section - Maintained structure with elevated design */}
        <section className="py-32 md:py-48 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

              {/* Image with Luxury Border */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative p-4 border border-black/5 bg-white shadow-2xl shadow-black/[0.03]"
              >
                <div className="overflow-hidden aspect-[4/5] bg-gray-100">
                  <img 
                    src={heroImage} 
                    alt="Our Lab" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] hover:scale-105" 
                  />
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r border-b border-black/20" />
              </motion.div>

              {/* Text Content */}
              <div className="space-y-10">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30">L'Engagement</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter leading-none">
                  {t("about.standard")}
                </h2>

                <div className="space-y-6">
                  <p className="text-black/60 text-lg leading-relaxed font-medium">
                    {t("about.desc1")}
                  </p>
                  <p className="text-black/60 text-lg leading-relaxed font-medium">
                    {t("about.desc2")}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-12 pt-12 border-t border-black/5">
                  <div>
                    <h4 className="text-6xl font-serif font-bold text-black mb-3 tracking-tighter">100%</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                      {t("about.cruelty")}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-6xl font-serif font-bold text-black mb-3 tracking-tighter">95%</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                      {t("about.natural")}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}