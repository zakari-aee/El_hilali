import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { motion } from "framer-motion";

export default function Contact() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={dir}>
      <Header />
      
      <main className="flex-1 pt-40 pb-32">
        <div className="container mx-auto px-6 md:px-10">
          {/* Header Section */}
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-tighter">
              {t("contact.title")}
            </h1>
            <p className="text-black/50 max-w-xl mx-auto font-medium text-lg leading-relaxed">
              {t("contact.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-6xl mx-auto">
            {/* Contact Info - Luxury Minimalist Style */}
            <div className="space-y-16">
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black mb-10 border-b border-black/5 pb-4">
                  {t("contact.visit")}
                </h3>
                
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-primary group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">PARFUMERIE EL HILALI
</p>
                      <p className="text-black/50 font-medium text-sm leading-relaxed italic font-serif">
                        PARFUMERIE EL HILALI<br/>Ryad, Meknès 50050
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-primary group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">Phone</p>
                      <p className="text-black/50 font-medium text-sm">+212 667174694</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-12 w-12 shrink-0 bg-[#FDFBF9] border border-black/5 flex items-center justify-center text-primary group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1">Email</p>
                      <p className="text-black/50 font-medium text-sm">elhilali@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#FDFBF9] p-10 border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-6">{t("contact.hours")}</h4>
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between border-b border-black/5 pb-2">
                    <span className="text-black/40">{t("days.monFri")}</span>
                    <span className="text-black">10:00 AM — 12:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-2">
                    <span className="text-black/40">{t("days.sat")} - {t("days.sun")}</span>
                    <span className="text-black">10:00 AM — 12:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form - Matching Luxury Input Style */}
            <div className="bg-white border border-black/5 p-10 md:p-12 shadow-2xl shadow-black/[0.02]">
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
                    placeholder="Product Inquiry" 
                    className="rounded-none border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent px-0 pb-3 h-auto"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                    {t("contact.form.message")}
                  </label>
                  <Textarea 
                    placeholder="" 
                    className="rounded-none border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-black transition-colors bg-transparent px-0 pb-3 h-auto min-h-[100px] resize-none"
                  />
                </div>

                <Button 
                  className="w-full bg-black text-white rounded-none py-8 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-primary transition-all duration-500 shadow-xl shadow-black/10" 
                  size="lg"
                >
                  {t("contact.btn.send")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}