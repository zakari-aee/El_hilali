import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../lib/i18n";

/**
 * LUXURY FAQ COMPONENT
 * i18n: EN / FR / AR
 * RTL safe
 * Design: Minimalist, luxury
 */

const FAQItem = ({ question, answer, isOpen, toggle }) => (
  <div className="border-b border-black/5 py-8 md:py-10">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between text-left group transition-all duration-300"
    >
      <h3
        className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${
          isOpen
            ? "text-black"
            : "text-black/60 group-hover:text-black"
        }`}
      >
        {question}
      </h3>

      <div
        className={`h-8 w-8 rounded-full border border-black/5 flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? "bg-black text-white"
            : "text-black group-hover:border-black"
        }`}
      >
        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden"
        >
          <p className="pt-6 text-black/40 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQ() {
  const { t, dir } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
    { question: t("faq.q7"), answer: t("faq.a7") },
  ];

  return (
    <section
      className="py-24 md:py-40 bg-white"
      dir={dir}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

          {/* Header */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-10 h-[1px] bg-black" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black">
                {t("faq.title.small")}
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8 tracking-tighter">
              {t("faq.title.main")} <br />
              <span className="text-black/30 italic font-normal">
                {t("faq.title.highlight")}
              </span>
            </h2>

            <p className="text-black/40 text-lg font-medium leading-relaxed italic border-l border-black/10 pl-6">
              {t("faq.quote")}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggle={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
