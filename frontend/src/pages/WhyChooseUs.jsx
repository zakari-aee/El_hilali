import React from "react";
import { motion } from "framer-motion";
import { Truck, Scale, BadgePercent, PackageCheck } from "lucide-react";
import { useLanguage } from "../lib/i18n";


const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    className="group relative p-10 bg-white border border-black/5 hover:border-primary/20 transition-all duration-500 flex flex-col items-start h-full"
  >
    {/* Decorative Icon */}
    <div className="absolute right-4 bottom-4 text-black/[0.02] group-hover:text-primary/[0.05] transition-colors duration-700 pointer-events-none">
      <Icon size={100} strokeWidth={1} />
    </div>

    {/* Icon */}
    <div className="h-14 w-14 bg-[#FDFBF9] border border-black/5 flex items-center justify-center mb-8 text-primary group-hover:bg-black group-hover:text-white transition-all duration-500">
      <Icon className="w-6 h-6" strokeWidth={1.5} />
    </div>

    {/* Title */}
    <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4 text-black group-hover:text-primary transition-colors duration-300">
      {title}
    </h3>

    {/* Description */}
    <p className="text-black/50 text-[14px] leading-relaxed font-medium">
      {description}
    </p>
  </motion.div>
);

export default function WhyChooseUs() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  const features = [
    {
      icon: BadgePercent,
      title: t("why.feature1.title"),
      description: t("why.feature1.desc"),
    },
    {
      icon: PackageCheck,
      title: t("why.feature2.title"),
      description: t("why.feature2.desc"),
    },
    {
      icon: Scale,
      title: t("why.feature3.title"),
      description: t("why.feature3.desc"),
    },
    {
      icon: Truck,
      title: t("why.feature4.title"),
      description: t("why.feature4.desc"),
    },
  ];

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-32 bg-[#FDFBF9] border-t border-black/5"
    >
      <div className="container mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-[1px] bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary">
              {t("why.smallTitle")}
            </span>
            <span className="w-8 h-[1px] bg-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-8 text-black"
          >
            {t("why.title.main")} <br />
            <span className="text-primary italic font-normal">
              {t("why.title.highlight")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-black/50 text-lg font-medium leading-relaxed"
          >
            {t("why.description")}
          </motion.p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>

        {/* Divider */}
        <div className="mt-24 flex justify-center opacity-10">
          <div className="w-px h-24 bg-black" />
        </div>
      </div>
    </section>
  );
}
