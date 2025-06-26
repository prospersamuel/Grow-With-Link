import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiExternalLink, FiBarChart2, FiMoreVertical, FiCopy, FiSave, FiEdit2 } from "react-icons/fi";
import { toast } from 'react-hot-toast';

const CampaignTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Summer Special", status: "active", clicks: 842, conversions: 128, roi: 24.5 },
    { id: 2, name: "New User Bonus", status: "paused", clicks: 521, conversions: 87, roi: 18.2 },
    { id: 3, name: "Holiday Promo", status: "completed", clicks: 1204, conversions: 210, roi: 32.7 },
    { id: 4, name: "Loyalty Program", status: "draft", clicks: 0, conversions: 0, roi: 0 },
  ]);
  const [editingName, setEditingName] = useState(null);
  const [tempName, setTempName] = useState("");

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const startEditing = (id, currentName, e) => {
    e.stopPropagation();
    setEditingName(id);
    setTempName(currentName);
  };

  const saveName = (id) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, name: tempName } : campaign
    ));
    setEditingName(null);
    toast.success("Campaign name updated!");
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        const newStatus = campaign.status === 'active' ? 'paused' : 'active';
        toast[newStatus === 'active' ? 'success' : 'error'](
          `Campaign ${newStatus === 'active' ? 'activated' : 'paused'}`,
        );
        return { ...campaign, status: newStatus };
      }
      return campaign;
    }));
  };

  const deleteCampaign = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      toast.warning('Campaign deleted');
      if (expandedRow === id) setExpandedRow(null);
    }
  };

  return (
    <>
      <div className="pb-3 flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <FiBarChart2 className="text-blue-500" /> Campaign Performance
        </h3>
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

      <div className="divide-y divide-slate-200/50 max-h-[65vh] overflow-auto dark:divide-slate-700/50">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="transition-colors hover:bg-slate-100/30 dark:hover:bg-slate-700/30">
            <div 
              className="grid grid-cols-12 gap-4 items-center p-5 cursor-pointer"
              onClick={() => toggleExpand(campaign.id)}
            >
              <div className="col-span-5 font-medium flex items-center gap-2">
                {editingName === campaign.id ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 flex-1"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && saveName(campaign.id)}
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        saveName(campaign.id);
                      }}
                      className="text-emerald-500 hover:text-emerald-700"
                    >
                      <FiSave size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    {campaign.name}
                    {expandedRow === campaign.id && (
                      <button 
                        onClick={(e) => startEditing(campaign.id, campaign.name, e)}
                        className="text-slate-400 hover:text-blue-500"
                      >
                        <FiEdit2 size={14} />
                      </button>
                    )}
                  </>
                )}
              </div>

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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(campaign.id);
                  }}
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
                  className="overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm pt-3">
                    {/* Stats Column */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Performance</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">Conversions</p>
                          <p className="font-medium flex items-center gap-1">
                            {campaign.conversions}
                            <span className="text-xs text-emerald-500">
                              ({campaign.clicks > 0 ? 
                                ((campaign.conversions / campaign.clicks) * 100).toFixed(1) + '%' : 
                                '0%'})
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">Avg. Reward Value</p>
                          <p className="font-medium">
                            {campaign.conversions > 0 ? 
                              '$' + (campaign.roi * 10 / campaign.conversions).toFixed(2) : 
                              '$0.00'}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">Total Revenue</p>
                          <p className="font-medium">${(campaign.roi * 10).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Referral Links Column */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Referral Links</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            readOnly
                            value={`https://theirapp.com/signup?ref=${campaign.id}`}
                            className="text-xs p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 flex-1 truncate"
                          />
                          <button 
                            onClick={() => copyLink(`https://theirapp.com/signup?ref=${campaign.id}`)}
                            className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex items-center gap-1"
                          >
                            <FiCopy size={12} /> Copy
                          </button>
                        </div>
                        <button className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                          <FiExternalLink size={12} /> View all generated links
                        </button>
                      </div>
                    </div>

                    {/* Top Referrers Column */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Top Referrers</h4>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-sm">user{i}@example.com</span>
                            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                              {Math.floor(campaign.conversions/(i+1))} conversions
                            </span>
                          </div>
                        ))}
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2">
                          View full leaderboard →
                        </button>
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Actions</h4>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => toggleCampaignStatus(campaign.id)}
                          className="text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors text-left"
                        >
                          {campaign.status === 'active' ? 'Pause Campaign' : 'Activate Campaign'}
                        </button>
                        <button 
                          onClick={() => deleteCampaign(campaign.id)}
                          className="text-xs bg-white dark:bg-slate-700 border border-red-200 dark:border-red-900 px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left text-red-200"
                        >
                          Delete Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
};

export default CampaignTable;