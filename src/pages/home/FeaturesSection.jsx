import { motion } from "framer-motion";
import { FaLink, FaChartLine, FaGift } from "react-icons/fa";

const features = [
  {
    icon: <FaLink size={28} />,
    title: "Custom Links",
    desc: "Create and manage unique referral links for your campaigns.",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Real-Time Tracking",
    desc: "Monitor click-throughs and conversions in real-time with pixel-perfect accuracy.",
  },
  {
    icon: <FaGift size={28} />,
    title: "Reward System",
    desc: "Set up automated or manual reward payouts for your best-performing referrers.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 px-6 bg-gradient-to-br from-white via-neutral-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-16 uppercase text-slate-800 dark:text-white"
        >
         <div className="flex space-x-1 items-center mb-12 justify-center">
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        <h2 className="text-lg md:text-3xl font-bold left-0 mb-1 uppercase">
          Powerful Features Built for Growth
          </h2>
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        </div>
        </motion.h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl p-8 bg-white/80 dark:bg-slate-800/80 border border-primary shadow-md hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
