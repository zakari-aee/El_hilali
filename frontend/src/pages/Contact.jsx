import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "../lib/i18n";

export default function Contact() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Header />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("contact.title")}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("contact.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6">{t("contact.visit")}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium">El Hilali Headquarters</p>
                      <p className="text-muted-foreground">123 Luxury Avenue<br/>Beverly Hills, CA 90210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">concierge@elhilali.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary p-8 rounded-lg">
                <h4 className="font-serif font-semibold mb-2">{t("contact.hours")}</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{t("days.monFri")}</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("days.sat")}</span>
                    <span>11:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("days.sun")}</span>
                    <span>{t("status.closed")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-border p-8 rounded-lg shadow-sm">
              <h3 className="font-serif text-2xl font-bold mb-6">{t("contact.form.title")}</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("contact.form.name")}</label>
                    <Input placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("contact.form.lastName")}</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.form.email")}</label>
                  <Input type="email" placeholder="jane@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.form.subject")}</label>
                  <Input placeholder="Product Inquiry" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.form.message")}</label>
                  <Textarea placeholder="" className="min-h-[120px]" />
                </div>

                <Button className="w-full" size="lg">{t("contact.btn.send")}</Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}