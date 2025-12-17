import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useLanguage } from "../lib/i18n";
import heroImage from "../../generated_images/minimalist_luxury_cosmetics_hero_banner.png";

export default function About() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black" dir={dir}>
      <Header />

      <main className="flex-1">

        {/* Hero Section */}
        <div className="bg-white py-28 md:py-36">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 leading-tight">
              {t("about.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.hero.desc")}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

              {/* Image */}
              <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500">
                <img src={heroImage} alt="Our Lab" className="w-full h-full object-cover" />
              </div>

              {/* Text Content */}
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold">
                  {t("about.standard")}
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {t("about.desc1")}
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {t("about.desc2")}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-8 pt-10">
                  <div className="text-center">
                    <h4 className="text-5xl font-serif font-bold text-yellow-500 mb-2">100%</h4>
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                      {t("about.cruelty")}
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-5xl font-serif font-bold text-yellow-500 mb-2">95%</h4>
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
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
