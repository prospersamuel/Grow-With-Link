export const BasicInfoStep = ({ campaignData, setCampaignData }) => {

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Campaign Name *
        </label>
        <input
          type="text"
          value={campaignData.name}
          onChange={(e) => {
            setCampaignData({ ...campaignData, name: e.target.value });
          }}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. June Giveaway Campaign"
          autoFocus
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Target URL *
        </label>
        <input
          type="url"
          value={campaignData.targetUrl}
          onChange={(e) =>
            setCampaignData({ ...campaignData, targetUrl: e.target.value })
          }
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://yourdomain.com/landing-page"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Initial Status
        </label>
        <select
          value={campaignData.status}
          onChange={(e) =>
            setCampaignData({ ...campaignData, status: e.target.value })
          }
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
      </div>
    </div>
  );
};
