import React from "react";
import { Link } from "wouter";
import { Facebook, Instagram, Music2, MessageCircle } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

export function Footer() {
  const { t, dir } = useLanguage();

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Music2 className="h-5 w-5" />, href: "#", label: "TikTok" },
    { icon: <MessageCircle className="h-5 w-5" />, href: "#", label: "WhatsApp" },
  ];

  const footerLinks = {
    shop: [
      { href: "/products", label: t("btn.viewAll") || "View All" },
    ],
    company: [
      { href: "/about", label: t("nav.story") },
      { href: "/contact", label: t("nav.contact") },
    ],
  };

  return (
    <footer 
      dir={dir} 
      className="bg-white pt-24 pb-12 border-t border-black/5"
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link href="/" className="text-3xl font-serif font-bold tracking-tight uppercase mb-6 block hover:opacity-70 transition-opacity">
              El Hilali
            </Link>
            <p className="text-black/50 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              {t("footer.desc") || "Crafting timeless elegance and contemporary luxury for the modern individual. Quality redefined through heritage and vision."}
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  aria-label={social.label}
                  className="text-black/40 hover:text-[#C5A27D] transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-black/90">
              {t("footer.shop") || "Collection"}
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-black/60 hover:text-black transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-black/90">
              {t("footer.company") || "Company"}
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-black/60 hover:text-black transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location/Contact Info */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-black/90">
              {t("nav.contact") || "Inquiries"}
            </h4>
            <address className="not-italic space-y-4">
              <p className="text-[13px] text-black/60 leading-relaxed font-medium">
                123 Avenue de Luxe<br />
                Casablanca, Morocco
              </p>
              <a href="mailto:contact@elhilali.com" className="text-[13px] text-black block hover:text-[#C5A27D] transition-colors font-bold underline decoration-black/10 underline-offset-4">
                contact@elhilali.com
              </a>
            </address>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-black/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
             <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30">
              &copy; {new Date().getFullYear()} El Hilali. {t("footer.rights") || "All Rights Reserved."}
            </p>
          </div>
          
          <div className="flex items-center gap-1">
             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30">
               {t("footer.designed") || "Design by"}
             </span>
             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/80">
               Studio El Hilali
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}