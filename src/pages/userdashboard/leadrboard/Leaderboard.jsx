import { motion } from "framer-motion";
import { FiAward, FiUser, FiDollarSign } from "react-icons/fi";

const referrers = [
  { id: 1, name: "Alex Johnson", referrals: 42, earned: 210, avatar: "AJ" },
  { id: 2, name: "Sam Wilson", referrals: 38, earned: 190, avatar: "SW" },
  { id: 3, name: "Taylor Smith", referrals: 29, earned: 145, avatar: "TS" },
  { id: 4, name: "Jordan Lee", referrals: 21, earned: 105, avatar: "JL" },
  { id: 5, name: "Casey Kim", referrals: 17, earned: 85, avatar: "CK" },
];

export default function Leaderboard() {
  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
          <FiAward />
        </div>
        <h3 className="font-semibold">Top Referrers</h3>
      </div>
      
      <div className="space-y-4  h-fit max-h-[67vh] overflow-auto">
        {referrers.map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center gap-4 p-3 hover:bg-slate-100/50 dark:hover:bg-slate-700/30 rounded-xl transition-colors"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
              index < 3 
                ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                : "bg-slate-100 dark:bg-slate-700"
            }`}>
              {person.avatar}
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium">{person.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Referred {person.referrals} users</p>
            </div>
            
            <div className="flex items-center gap-1 text-emerald-500 font-medium">
              <FiDollarSign /> {person.earned}
            </div>
          </motion.div>
        ))}
      </div>
      </>
  );
}