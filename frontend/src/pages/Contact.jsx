import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { motion } from "framer-motion";

/**
 * CONTACT PAGE
 * Restored original imports while maintaining the premium responsive design
 * and the optimized Map location for Parfumerie El Hilali.
 */

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
            <p className="text-black/50 max-w-xl mx-auto font-medium text-base md:text-lg leading-relaxed px-4">
              {t("contact.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto mb-24">
            {/* Contact Info - Luxury Minimalist Style */}
            <div className="space-y-12 md:space-y-16">
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black mb-8 border-b border-black/5 pb-4">
                  {t("contact.visit")}
                </h3>

                <div className="space-y-8 md:space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">
                        PARFUMERIE EL HILALI
                      </p>
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
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">
                        Téléphone
                      </p>
                      <p className="text-black/50 font-medium text-sm">
                        +212 667174694
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">
                        Email
                      </p>
                      <p className="text-black/50 font-medium text-sm">
                        elhilali@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-[#FDFBF9] p-8 md:p-10 border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/[0.02] rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="flex items-center gap-3 mb-6">
                   <Clock className="w-4 h-4 text-black/30" />
                   <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">
                     {t("contact.hours")}
                   </h4>
                </div>
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between border-b border-black/5 pb-2">
                    <span className="text-black/40">{t("days.monFri")}</span>
                    <span className="text-black">10:00 AM — 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/40">
                      {t("days.sat")} - {t("days.sun")}
                    </span>
                    <span className="text-black">10:00 AM — 12:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white border border-black/5 p-8 md:p-12 shadow-2xl shadow-black/[0.02]">
              <h3 className="text-3xl font-serif font-bold mb-10 tracking-tight italic">
                {t("contact.form.title")}
              </h3>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                      {t("contact.form.name")}
                    </label>
                    <Input
                      placeholder="Aicha"
                      className="rounded-none border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent px-0 pb-3 h-auto"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                      {t("contact.form.lastName")}
                    </label>
                    <Input
                      placeholder="El Hilali"
                      className="rounded-none border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent px-0 pb-3 h-auto"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                    {t("contact.form.email")}
                  </label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="rounded-none border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent px-0 pb-3 h-auto"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                    {t("contact.form.subject")}
                  </label>
                  <Input
                    placeholder="Sujet"
                    className="rounded-none border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent px-0 pb-3 h-auto"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                    {t("contact.form.message")}
                  </label>
                  <Textarea
                    placeholder="Votre message..."
                    className="rounded-none border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent px-0 pb-3 h-auto min-h-[100px] resize-none"
                  />
                </div>

                <Button
                  className="w-full bg-black text-white rounded-none py-8 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black/80 transition-all duration-500 shadow-xl shadow-black/10"
                  size="lg"
                >
                  {t("contact.btn.send")}
                </Button>
              </form>
            </div>
          </div>

          {/* Map Section - Responsive & High Performance */}
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 flex items-center gap-4 px-4 sm:px-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
                {t("contact.map.title") || "Localisation"}
              </span>
              <div className="h-[1px] flex-1 bg-black/5" />
            </div>

            <div
              className="
                relative w-full
                aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]
                min-h-[350px]
                bg-[#F9F9F9]
                border border-black/5
                overflow-hidden
                grayscale hover:grayscale-0
                transition-all duration-1000
                rounded-sm
              "
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3313.095170530904!2d-5.5667223!3d33.8614381!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05b9d62623d29%3A0xdc4b582ece2151cf!2sPARFUMERIE%20EL%20HILALI!5e0!3m2!1sen!2sma!4v1766013511928!5m2!1sen!2sma"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Decorative Frame */}
              <div className="pointer-events-none absolute inset-0 border border-black/5 shadow-inner" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}