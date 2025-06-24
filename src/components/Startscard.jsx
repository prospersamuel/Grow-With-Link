import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export default function Statscard({ title, value, change, icon, delay = 0 }) {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {value}
          </h3>
        </div>
        
        <div className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200">
          {icon}
        </div>
      </div>
      
      <motion.div 
        className="flex items-center gap-1.5 mt-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        <div className={`flex items-center ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isPositive ? (
            <FiTrendingUp className="mr-1" />
          ) : (
            <FiTrendingDown className="mr-1" />
          )}
          {change}
        </div>
        <span className="text-slate-400 dark:text-slate-500 text-xs">vs last period</span>
      </motion.div>
      
      {/* Animated background pattern (optional) */}
      <motion.div 
        className="absolute -right-10 -bottom-10 opacity-5 text-slate-400 dark:text-slate-600 text-6xl"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}