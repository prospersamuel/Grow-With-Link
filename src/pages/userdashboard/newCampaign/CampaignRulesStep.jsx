import { FiCalendar } from "react-icons/fi";

export const CampaignRulesStep = ({ campaignData, setCampaignData }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
          Campaign Duration
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={campaignData.startDate}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    startDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiCalendar className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <input
                type="checkbox"
                checked={campaignData.hasEndDate}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    hasEndDate: e.target.checked,
                  })
                }
                className="mr-2"
              />
              Set End Date
            </label>
            {campaignData.hasEndDate && (
              <div className="relative">
                <input
                  type="date"
                  value={campaignData.endDate}
                  min={campaignData.startDate}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      endDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiCalendar className="absolute right-3 top-2.5 text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
          Referral Limits
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Total campaign rewards limit (optional)
            </label>
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <input
                type="number"
                min="0"
                value={campaignData.referralLimit.total}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    referralLimit: {
                      ...campaignData.referralLimit,
                      total: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No limit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Maximum rewards per referrer (optional)
            </label>
            <input
              type="number"
              min="0"
              value={campaignData.referralLimit.perReferrer}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  referralLimit: {
                    ...campaignData.referralLimit,
                    perReferrer: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="No limit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Maximum rewards per referred user (optional)
            </label>
            <input
              type="number"
              min="0"
              value={campaignData.referralLimit.perReferred}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  referralLimit: {
                    ...campaignData.referralLimit,
                    perReferred: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="No limit"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
          Campaign Visibility
        </h4>

        <div className="md:flex grid grid-cols-1 md:gap-4 gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={campaignData.visibility === "public"}
              onChange={() =>
                setCampaignData({ ...campaignData, visibility: "public" })
              }
              className="mr-2"
            />
            Public (anyone with the link can join)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={campaignData.visibility === "private"}
              onChange={() =>
                setCampaignData({ ...campaignData, visibility: "private" })
              }
              className="mr-2"
            />
            Private (invite-only)
          </label>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
          Approval Rules
        </h4>

        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="approvalType"
              value="auto"
              checked={campaignData.approvalType === "auto"}
              onChange={() =>
                setCampaignData({ ...campaignData, approvalType: "auto" })
              }
              className="mr-2"
            />
            Auto-approve referrals
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="approvalType"
              value="manual"
              checked={campaignData.approvalType === "manual"}
              onChange={() =>
                setCampaignData({ ...campaignData, approvalType: "manual" })
              }
              className="mr-2"
            />
            Manual approval required
          </label>
        </div>
      </div>
    </div>
  );
};
