import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, Search, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useLanguage } from "../../lib/i18n";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export function Header() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.shop") },
    { href: "/about", label: t("nav.story") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white backdrop-blur-md border-border py-2 shadow-sm" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
  side={dir === 'rtl' ? "right" : "left"}
  className="w-[300px] sm:w-[400px] bg-white text-black p-6 shadow-lg"
>
  <div className="flex flex-col gap-6 mt-10">
    <nav className="flex flex-col gap-4">
      {navLinks.map((link) => (
        <Link 
          key={link.href} 
          href={link.href}
          className={cn(
            "text-2xl font-serif italic hover:text-primary transition-colors",
            location === link.href ? "text-primary" : "text-black"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
    
    <div className="border-t border-gray-300 pt-4">
      <div className="flex gap-2 justify-center">
        <Button variant={language === 'en' ? "default" : "outline"} size="sm" onClick={() => setLanguage('en')}>EN</Button>
        <Button variant={language === 'fr' ? "default" : "outline"} size="sm" onClick={() => setLanguage('fr')}>FR</Button>
        <Button variant={language === 'ar' ? "default" : "outline"} size="sm" onClick={() => setLanguage('ar')}>AR</Button>
      </div>
    </div>
  </div>
</SheetContent>

          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
          El Hilali
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors relative group",
                location === link.href ? "text-primary" : "text-foreground"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-0 transition-transform duration-300 origin-left",
                location === link.href ? "scale-x-100" : "group-hover:scale-x-100"
              )} />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Switcher */}
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? "bg-secondary" : ""}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')} className={language === 'fr' ? "bg-secondary" : ""}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')} className={language === 'ar' ? "bg-secondary" : ""}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex relative w-48 lg:w-64">
             <Search className={cn(
               "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
               dir === 'rtl' ? "right-2" : "left-2"
             )} />
             <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className={cn(
                "h-9 bg-transparent border-transparent hover:border-border focus:border-border transition-all rounded-full",
                dir === 'rtl' ? "pr-8" : "pl-8"
              )} 
            />
          </form>
          <Link href="/products">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className={cn(
                "absolute top-1 h-2 w-2 bg-primary rounded-full animate-pulse",
                dir === 'rtl' ? "left-1" : "right-1"
              )} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}