// File: src/pages/Home/HeroSection.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Illustration from "../../../assets/undraw_progress-data_gvcq.svg"; 
import { useApp } from "../../context/Appcontext";

export default function HeroSection() {
  const { openLogin } = useApp();

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 h-[80vh] py-10 max-w-7xl mx-auto gap-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-neutral-800 dark:text-neutral-100">
          Track & Reward Referrals Effortlessly
        </h2>

        <p className="text-sm md:text-lg max-w-xl mb-8 font-bold text-neutral-500 dark:text-neutral-300">
          Build your referral system for your store in minutes. Monitor clicks,
          reward referrals, and grow your brand without hassle.
        </p>

        <div className="flex justify-center md:justify-start gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              onClick={openLogin}
              className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg transition"
            >
              Get Started
            </button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href="#howitworks"
              className="inline-block border border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition"
            >
              How It Works
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1"
      >
        <img
          src={Illustration}
          alt="Referral Tracking"
          className="w-full h-auto drop-shadow-lg"
        />
      </motion.div>
    </section>
  );
}
