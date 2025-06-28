// pages/dashboard/components/DashboardOverview.jsx
import { motion } from "framer-motion";
import StatsCard from "../../../components/Startscard";
import ReferralChart from "../referralChart/ReferralChart";
import Leaderboard from "../leadrboard/Leaderboard";

export default function DashboardOverview({ stats }) {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 shadow border border-slate-200/50 dark:border-slate-700/50">
          <ReferralChart />
        </div>
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 shadow border border-slate-200/50 dark:border-slate-700/50">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
