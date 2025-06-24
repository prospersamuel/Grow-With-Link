// File: src/pages/Home/PricingSection.jsx
import { motion } from "framer-motion";
import { useApp } from "../../context/Appcontext";

const plans = [
  {
    name: "Starter",
    price: "$0",
    features: ["Track 20 referrals/month", "Basic analytics", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    features: ["Unlimited referrals", "Advanced tracking", "Email support", "Custom branding"],
    cta: "Choose Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Team accounts", "Dedicated support", "API access", "Custom integrations"],
    cta: "Contact Us",
    popular: false,
  },
];

export default function PricingSection() {

    const {openLogin} = useApp()
    
  return (
    <section id="pricing" className="py-24 bg-neutral-50 dark:bg-slate-950 text-slate-800 dark:text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 uppercase"
        >
           <div className="flex space-x-3 items-center justify-center">
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        <h2 className="text-3xl mb-3 font-bold left-0 uppercase">
          Pricing Plans
          </h2>
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        </div>
        <p className="text-slate-600 text-sm mb-12 dark:text-slate-400 max-w-xl mx-auto">
          Simple pricing for all sizes. Start free and upgrade when you're ready to scale.
        </p>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-xl p-8 shadow-lg bg-white dark:bg-slate-800 border hover:scale-[200%] hover:shadow-2xl transition-all duration-500 border-primary`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
              <ul className="text-left space-y-2 mb-6">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <span className="text-primary">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button 
              onClick={openLogin}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-semibold transition">
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
