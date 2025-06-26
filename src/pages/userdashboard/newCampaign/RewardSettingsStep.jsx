import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const RewardSettingsStep = ({
  campaignData,
  setCampaignData,
  calculateEarnings,
}) => {
  return (
    <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
      <h4 className="font-medium text-slate-700 dark:text-slate-300">
        Reward Settings
      </h4>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Reward Type
        </label>
        <Tabs
          selectedIndex={["percentage", "fixed", "custom"].indexOf(
            campaignData.rewardType
          )}
          onSelect={(index) =>
            setCampaignData({
              ...campaignData,
              rewardType: ["percentage", "fixed", "custom"][index],
            })
          }
        >
          <TabList className="flex border-b border-slate-200 dark:border-slate-600">
            <Tab className="md:px-4 md:py-2 px-2 py-1 cursor-pointer focus:outline-none">
              Percentage
            </Tab>
            <Tab className="md:px-4 md:py-2 px-2 py-1 cursor-pointer focus:outline-none">
              Fixed
            </Tab>
            <Tab className="md:px-4 md:py-2 px-2 py-1 cursor-pointer focus:outline-none">
              Custom
            </Tab>
          </TabList>

          <div className="mt-4">
            <TabPanel>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={campaignData.rewardAmount}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      rewardAmount: e.target.value,
                    })
                  }
                  className="w-24 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-slate-500">% of referred purchase</span>
              </div>
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Example: {calculateEarnings()}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex items-center gap-4">
                <span className="text-slate-500">$</span>
                <input
                  type="number"
                  min="1"
                  value={campaignData.rewardAmount}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      rewardAmount: e.target.value,
                    })
                  }
                  className="w-24 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-slate-500">per successful referral</span>
              </div>
            </TabPanel>
            <TabPanel>
              <input
                type="text"
                value={campaignData.customReward}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    customReward: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Free month, Store credit, etc."
              />
            </TabPanel>
          </div>
        </Tabs>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Reward Trigger
        </label>
        <select
          value={campaignData.rewardTrigger}
          onChange={(e) =>
            setCampaignData({ ...campaignData, rewardTrigger: e.target.value })
          }
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="signup">On sign up</option>
          <option value="purchase">On first purchase</option>
          <option value="task">On completing a task</option>
        </select>
        {campaignData.rewardTrigger === "task" && (
          <div className="mt-2">
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description (e.g. 'Complete profile')"
            />
          </div>
        )}
      </div>
    </div>
  );
};
