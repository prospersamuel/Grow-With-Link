// HowItWorks.jsx
import { motion } from "framer-motion";
import { FaLink, FaCookie, FaShoppingCart } from "react-icons/fa";

const steps = [
  {
    icon: <FaLink size={28} />,
    title: "Generate Referral Links",
    desc: "Store owners create unique referral links and share them with partners or influencers.",
    img: "assets/undraw_referral_j2rw.svg",
  },
  {
    icon: <FaCookie size={28} />,
    title: "Track Visitors & Cookies",
    desc: "When a visitor clicks a link, we track the referral using cookies and URL parameters.",
    img: "assets/undraw_revenue_kv38.svg",
  },
  {
    icon: <FaShoppingCart size={28} />,
    title: "Monitor Conversions",
    desc: "Once the user checks out, your dashboard updates with the referral details instantly.",
    img: "assets/undraw_progress-tracking_9m3o.svg",
  },
];

export default function HowItWorks() {
  return (
    <section id="howitworks" className="py-24 bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex space-x-3 items-center mb-12 justify-center">
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        <h2 className="text-lg md:text-3xl font-bold left-0 mb-1 uppercase">How It Works</h2>
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 border-primary hover:shadow-xl transition-all duration-300 border rounded-xl shadow p-6 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary text-white rounded-full">{step.icon}</div>
                <h3 className="text-xl font-bold">{step.title}</h3>
              </div>
              <p className="font-semibold text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
              <img src={step.img} alt={step.title} className="h-48 w-full object-contain mt-6 rounded-lg drop-shadow-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
