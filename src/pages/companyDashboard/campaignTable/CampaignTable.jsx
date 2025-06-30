import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiBarChart2,
  FiMoreVertical,
  FiCopy,
  FiSave,
  FiX,
  FiEdit2,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import useCompanyCampaigns from "../../../hooks/useCompanyCampains";

const statusOptions = [
  { value: "draft", label: "Draft", color: "bg-slate-100 text-slate-700 dark:bg-slate-600 dark:text-slate-300" },
  { value: "active", label: "Active", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400" },
  { value: "paused", label: "Paused", color: "bg-yellow-400 text-white dark:bg-yellow-600" },
  { value: "completed", label: "Completed", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400" },
];

export default function CampaignTable() {
  const {
    campaigns,
    loading,
    error,
    refreshCampaigns,
    updateCampaign,
    toggleCampaignStatus,
    deleteCampaign,
  } = useCompanyCampaigns();

  const [expandedRow, setExpandedRow] = useState(null);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const startEditing = (campaign) => {
    setEditingCampaignId(campaign.id);
    setEditValues({
      name: campaign.name,
      referralLink: campaign.referralLink || `https://yourapp.com/signup?ref=${campaign.id}`,
      budget: campaign.budget,
      startDate: campaign.startDate?.split('T')[0] || '',
      endDate: campaign.endDate?.split('T')[0] || '',
      status: campaign.status || 'draft',
      description: campaign.description || ''
    });
  };

  const cancelEditing = () => {
    setEditingCampaignId(null);
    setEditValues({});
  };

  const handleSave = async () => {
    try {
      await updateCampaign(editingCampaignId, editValues);
      toast.success("Campaign updated successfully!");
      cancelEditing();
      refreshCampaigns();
    } catch (err) {
      toast.error("Failed to update campaign");
      console.error(err);
    }
  };

  const handleInputChange = (field, value) => {
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.color : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
  };

  const getStatusLabel = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.label : "Unknown";
  };

  if (loading) {
    return (
      <p className="text-slate-500 dark:text-slate-400">Loading campaigns...</p>
    );
  }

  if (error) {
    return <p className="text-rose-500">Error: {error}</p>;
  }

  if (campaigns.length === 0) {
    return (
      <p className="text-slate-500 dark:text-slate-400">
        No campaigns created yet.
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2 text-lg">
          <FiBarChart2 className="text-blue-500" /> Campaign Performance
        </h3>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-[65vh] overflow-auto">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-700/30"
          >
            {/* Row */}
            <div
              className="grid grid-cols-12 gap-4 items-center p-4 cursor-pointer"
              onClick={() => toggleExpand(campaign.id)}
            >
              {/* Name */}
              <div className="col-span-5 font-medium flex items-center gap-2 truncate">
                {editingCampaignId === campaign.id ? (
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  campaign.name || "Unnamed Campaign"
                )}
              </div>

              {/* Status */}
              <div className="col-span-2 flex justify-center">
                {editingCampaignId === campaign.id ? (
                  <select
                    value={editValues.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                    {getStatusLabel(campaign.status)}
                  </span>
                )}
              </div>

              {/* Clicks */}
              <div className="col-span-2 text-center">
                {campaign.totalClicks ?? 0}
              </div>

              {/* Budget */}
              <div className="col-span-2 text-center font-medium">
                {editingCampaignId === campaign.id ? (
                  <input
                    type="number"
                    value={editValues.budget}
                    onChange={(e) => handleInputChange('budget', parseFloat(e.target.value))}
                    className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 w-20 text-center"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  `$${campaign.budget ?? 0}`
                )}
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end">
                <motion.button
                  whileHover={{ rotate: 90 }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (editingCampaignId === campaign.id) {
                      cancelEditing();
                    } else {
                      startEditing(campaign);
                    }
                  }}
                >
                  {editingCampaignId === campaign.id ? <FiX size={18} /> : <FiMoreVertical />}
                </motion.button>
              </div>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
              {expandedRow === campaign.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {/* Editable Fields */}
                    <div className="flex flex-col">
                      <label className="text-slate-500 dark:text-slate-400 text-xs mb-1">
                        Description
                      </label>
                      {editingCampaignId === campaign.id ? (
                        <textarea
                          value={editValues.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1"
                          rows={3}
                        />
                      ) : (
                        <p className="font-medium break-words">
                          {campaign.description || "-"}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-slate-500 dark:text-slate-400 text-xs mb-1">
                        Start Date
                      </label>
                      {editingCampaignId === campaign.id ? (
                        <input
                          type="date"
                          value={editValues.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1"
                        />
                      ) : (
                        <p className="font-medium">
                          {campaign.startDate?.split('T')[0] || "-"}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-slate-500 dark:text-slate-400 text-xs mb-1">
                        End Date
                      </label>
                      {editingCampaignId === campaign.id ? (
                        <input
                          type="date"
                          value={editValues.endDate}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1"
                        />
                      ) : (
                        <p className="font-medium">
                          {campaign.endDate?.split('T')[0] || "-"}
                        </p>
                      )}
                    </div>

                    {/* Referral Link */}
                    <div className="flex flex-col col-span-full">
                      <label className="text-slate-500 dark:text-slate-400 text-xs mb-1">
                        Referral Link
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          readOnly={editingCampaignId !== campaign.id}
                          value={
                            editingCampaignId === campaign.id 
                              ? editValues.referralLink
                              : campaign.referralLink || `https://yourapp.com/signup?ref=${campaign.id}`
                          }
                          onChange={(e) => handleInputChange('referralLink', e.target.value)}
                          className="text-sm p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 flex-1 truncate"
                        />
                        <button
                          onClick={() => copyLink(
                            editingCampaignId === campaign.id 
                              ? editValues.referralLink
                              : campaign.referralLink || `https://yourapp.com/signup?ref=${campaign.id}`
                          )}
                          className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex items-center gap-1"
                        >
                          <FiCopy size={14} /> Copy
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 col-span-full mt-2">
                      {editingCampaignId === campaign.id ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={cancelEditing}
                            className="text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-4 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-1"
                          >
                            <FiSave size={14} /> Save Changes
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(campaign);
                            }}
                            className="text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-1"
                          >
                            <FiEdit2 size={14} /> Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCampaignStatus(campaign.id);
                            }}
                            className="text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex-1 text-left"
                          >
                            {campaign.status === "active" ? "Pause Campaign" : "Activate Campaign"}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm("Delete this campaign?")) {
                                deleteCampaign(campaign.id);
                              }
                            }}
                            className="text-sm bg-white dark:bg-slate-700 border border-red-200 dark:border-red-900 px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}