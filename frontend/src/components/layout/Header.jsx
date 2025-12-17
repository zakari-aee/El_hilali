import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, Globe, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../lib/i18n";


export function Header() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const { t, language, setLanguage, dir } = useLanguage();

  // Scroll to top whenever the location (URL) changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.shop") },
    { href: "/about", label: t("nav.story") },
    { href: "/contact", label: t("nav.contact") },
  ], [t]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const headerBgClass = isMobileMenuOpen || scrolled 
    ? "bg-white py-5 shadow-sm border-black/5" 
    : "bg-transparent py-10 border-transparent";

  return (
    <header
      dir={dir}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${headerBgClass}`}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex-1">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-black/5 rounded-full">
            <Menu className="h-7 w-7 text-black" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <Link href="/" className="text-1xl md:text-4xl font-serif font-bold tracking-tight uppercase cursor-pointer">
            El Hilali
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-[12px] font-bold uppercase tracking-[0.3em] transition-colors relative group ${
                location === link.href ? "text-[#C5A27D]" : "text-black/70 hover:text-black"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 w-full h-[2px] bg-[#C5A27D] transition-transform duration-300 origin-left ${
                location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end gap-6 flex-1">
          <form onSubmit={handleSearch} className="hidden lg:flex relative items-center group">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className={`bg-transparent border-b border-black/10 focus:border-[#C5A27D] py-1 text-[11px] w-32 focus:w-48 transition-all outline-none tracking-widest font-semibold placeholder:text-black/30 ${dir === 'rtl' ? "text-right" : "text-left"}`}
            />
            <Search className={`h-4 w-4 text-black/40 absolute ${dir === 'rtl' ? "left-0" : "right-0"}`} />
          </form>

          {/* Desktop Language Selector */}
          <div className="hidden md:block relative">
            <button 
              onMouseEnter={() => setShowLanguageDropdown(true)}
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <Globe className="h-5 w-5 text-black/70" />
            </button>
            <AnimatePresence>
              {showLanguageDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  onMouseLeave={() => setShowLanguageDropdown(false)}
                  className="absolute right-0 top-full pt-2 w-36 z-[60]"
                >
                  <div className="bg-white border border-black/5 shadow-xl p-1 flex flex-col">
                    {['en', 'fr', 'ar'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setShowLanguageDropdown(false); }}
                        className={`text-[10px] font-bold tracking-widest p-3 text-left hover:bg-[#F4F1EE] transition-colors uppercase ${language === lang ? "text-[#C5A27D]" : "text-black"}`}
                      >
                        {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'العربية'}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: dir === 'rtl' ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? "100%" : "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`fixed top-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} h-full w-[80%] bg-white z-[70] shadow-2xl p-8 flex flex-col`}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif font-bold text-2xl">EL HILALI</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X className="h-6 w-6" /></button>
              </div>
              
              <nav className="flex flex-col gap-6 mb-auto">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className={`text-3xl font-serif italic block ${location === link.href ? "text-[#C5A27D]" : "text-black"}`}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="border-t border-black/5 pt-8 flex flex-col gap-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  {language === 'ar' ? 'اللغة' : language === 'fr' ? 'Langue' : 'Language'}
                </p>
                <div className="flex gap-2">
                  {['en', 'fr', 'ar'].map((lang) => (
                    <button 
                      key={lang}
                      onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }}
                      className={`text-[10px] font-bold flex-1 py-2 border uppercase ${language === lang ? "bg-black text-white" : "border-black/10"}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}