// FAQ.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Do users need to sign up to get tracked?",
    answer: "No. We track referrals anonymously using cookies and URL parameters — no account creation required.",
  },
  {
    question: "How are referrals verified?",
    answer: "Once a user checks out, we match it to the referral cookie/session and log it in your dashboard.",
  },
  {
    question: "Can I approve rewards manually?",
    answer: "Yes. You can choose to auto-approve or manually verify every referral before rewarding.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-neutral-50 dark:bg-slate-950 text-slate-800 dark:text-white">
      <div className="max-w-3xl mx-auto px-4">

         <div className="flex space-x-3 items-center mb-12 justify-center">
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        <h2 className="text-3xl font-bold left-0 mb-2 uppercase">
          Frequently Asked Questions
          </h2>
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 border border-primary rounded-xl shadow p-6"
            >
              <button
                onClick={() => setActiveIndex(i === activeIndex ? null : i)}
                className="flex justify-between items-center w-full text-left font-semibold"
              >
                {faq.question}
                <FaChevronDown
                  className={`ml-2 transform transition-transform ${activeIndex === i ? "rotate-180" : ""}`}
                />
              </button>

              {activeIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-sm text-slate-600 dark:text-slate-300"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
