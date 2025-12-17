import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tight mb-4 block">
              El Hilali
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t("footer.desc")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-6">{t("footer.shop")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">{t("btn.viewAll")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-6">{t("footer.company")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">{t("nav.story")}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-6">{t("footer.newsletter")}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.newsletter.desc")}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 px-3 py-2 text-sm bg-white border border-border rounded-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-sm hover:opacity-90 transition-opacity">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t("footer.rights")}</p>
          <p>{t("footer.designed")}</p>
        </div>
      </div>
    </footer>
  );
}