import { FiImage } from "react-icons/fi";

export const CustomizationStep = ({ campaignData, setCampaignData }) => {

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCampaignData((prev) => ({ ...prev, customBanner: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 overflow-auto h-[44vh]">
      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
          Custom Referrer Landing Page
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Custom Banner Image (optional)
            </label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer">
                <div className="flex items-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600">
                  <FiImage className="mr-2" />
                  Upload Image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </label>
              {campaignData.customBanner && (
                <span className="ml-2 text-sm text-slate-500">
                  Image selected
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Custom Headline
            </label>
            <input
              type="text"
              value={campaignData.customHeadline}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  customHeadline: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Refer friends, earn rewards!"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
          UTM Tracking (Advanced)
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              UTM Source
            </label>
            <input
              type="text"
              value={campaignData.utmParams.source}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  utmParams: {
                    ...campaignData.utmParams,
                    source: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              UTM Medium
            </label>
            <input
              type="text"
              value={campaignData.utmParams.medium}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  utmParams: {
                    ...campaignData.utmParams,
                    medium: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              UTM Campaign
            </label>
            <input
              type="text"
              value={campaignData.utmParams.campaign}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  utmParams: {
                    ...campaignData.utmParams,
                    campaign: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Will default to campaign name"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
          Referral Link Format
        </h4>

        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="linkFormat"
              value="query"
              checked={campaignData.linkFormat === "query"}
              onChange={() =>
                setCampaignData({ ...campaignData, linkFormat: "query" })
              }
              className="mr-2"
            />
            Query parameter (yourdomain.com?ref=CODE)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="linkFormat"
              value="path"
              checked={campaignData.linkFormat === "path"}
              onChange={() =>
                setCampaignData({ ...campaignData, linkFormat: "path" })
              }
              className="mr-2"
            />
            Path-based (yourdomain.com/campaign/CODE)
          </label>
        </div>

        {campaignData.linkFormat === "path" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Custom Path Slug (optional)
            </label>
            <div className="flex items-center">
              <span className="mr-2">yourdomain.com/campaign/</span>
              <input
                type="text"
                value={campaignData.customSlug}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    customSlug: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ref"
              />
              <span className="ml-2">/CODE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
