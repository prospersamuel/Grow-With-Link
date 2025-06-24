import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiExternalLink, FiBarChart2, FiMoreVertical } from "react-icons/fi";

const campaigns = [
  { id: 1, name: "Summer Special", status: "active", clicks: 842, conversions: 128, roi: 24.5 },
  { id: 2, name: "New User Bonus", status: "paused", clicks: 521, conversions: 87, roi: 18.2 },
  { id: 3, name: "Holiday Promo", status: "completed", clicks: 1204, conversions: 210, roi: 32.7 },
  { id: 4, name: "Loyalty Program", status: "draft", clicks: 0, conversions: 0, roi: 0 }
];

export default function CampaignTable() {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
    >
      <div className="p-5 pb-3 flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <FiBarChart2 className="text-blue-500" /> Campaign Performance
        </h3>
        <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Export
        </button>
      </div>

      <div className="px-5">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="col-span-5">Campaign</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Clicks</div>
          <div className="col-span-2 text-center">ROI</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="transition-colors hover:bg-slate-100/30 dark:hover:bg-slate-700/30">
            <div 
              className="grid grid-cols-12 gap-4 items-center p-5 cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === campaign.id ? null : campaign.id)}
            >
              <div className="col-span-5 font-medium">{campaign.name}</div>
              <div className="col-span-2 flex justify-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  campaign.status === 'active' ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  campaign.status === 'paused' ? 'bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  campaign.status === 'completed' ? 'bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-slate-100/50 text-slate-700 dark:bg-slate-700/50 dark:text-slate-400'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <div className="col-span-2 text-center">{campaign.clicks.toLocaleString()}</div>
              <div className="col-span-2 text-center font-medium">
                {campaign.roi > 0 ? (
                  <span className="text-emerald-500">{campaign.roi}%</span>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </div>
              <div className="col-span-1 flex justify-end">
                <motion.button 
                  whileHover={{ rotate: 90 }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <FiMoreVertical />
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {expandedRow === campaign.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-slate-500 dark:text-slate-400">Conversions</p>
                      <p className="font-medium">{campaign.conversions}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 dark:text-slate-400">Conversion Rate</p>
                      <p className="font-medium">
                        {campaign.clicks > 0 ? 
                          ((campaign.conversions / campaign.clicks) * 100).toFixed(1) + '%' : 
                          '0%'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 dark:text-slate-400">Avg. Value</p>
                      <p className="font-medium">
                        {campaign.conversions > 0 ? 
                          '$' + (campaign.roi * 10 / campaign.conversions).toFixed(2) : 
                          '$0.00'}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        View details <FiExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
      </>
  );
}