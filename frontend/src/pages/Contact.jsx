import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { motion } from "framer-motion";

export default function Contact() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={dir}>
      <Header />

      <main className="flex-1 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="container mx-auto px-6 md:px-10">
          
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-[1px] bg-black/20" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/60">
                Contact
              </span>
              <span className="w-8 h-[1px] bg-black/20" />
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 tracking-tighter">
              {t("contact.title")}
            </h1>
          </div>

          {/* SIDE BY SIDE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto items-start">
            
            {/* LEFT COLUMN: Visitez Notre Boutique */}
            <div className="space-y-12">
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black mb-8 border-b border-black/5 pb-4">
                  {t("contact.visit") || "Visitez Notre Boutique"}
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">PARFUMERIE EL HILALI</p>
                      <p className="text-black/50 font-medium text-sm leading-relaxed italic font-serif">
                        Ryad, Meknès 50050<br />Maroc
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">Téléphone</p>
                      <p className="text-black/50 font-medium text-sm">+212 667174694</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">Email</p>
                      <p className="text-black/50 font-medium text-sm">elhilali@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Section */}
              <div className="bg-[#FDFBF9] p-8 border border-black/5">
                <div className="flex items-center gap-3 mb-6">
                   <Clock className="w-4 h-4 text-black/30" />
                   <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">{t("contact.hours")}</h4>
                </div>
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between border-b border-black/5 pb-2">
                    <span className="text-black/40">{t("days.monFri")}</span>
                    <span className="text-black">10:00 AM — 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/40">{t("days.sat")} - {t("days.sun")}</span>
                    <span className="text-black">10:00 AM — 12:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Notre Emplacement (Map) */}
            <div className="w-full h-full">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black mb-8 border-b border-black/5 pb-4">
                {t("contact.map.title") || "Notre Emplacement"}
              </h3>
              <div className="relative w-full aspect-square lg:aspect-[4/5] bg-[#F9F9F9] border border-black/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 rounded-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.0943091721765!2d-5.5641413!3d33.8614603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05b9d62623d29%3A0xdc4b582ece2151cf!2sPARFUMERIE%20EL%20HILALI!5e0!3m2!1sen!2sma!4v1766837840888!5m2!1sen!2sma"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
