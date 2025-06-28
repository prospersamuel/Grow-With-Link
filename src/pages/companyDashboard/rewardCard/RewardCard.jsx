import { useState } from 'react';
import { FiGift, FiDollarSign, FiPercent, FiUserPlus, FiSettings, FiCreditCard } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useApp } from '../../../context/Appcontext';

export function RewardsCenter() {
  const [activeTab, setActiveTab] = useState('rewards');
  const [rewardType, setRewardType] = useState('fixed');
  const [rewardValue, setRewardValue] = useState(10);
  const [rewardCurrency, setRewardCurrency] = useState('USD');
  const [minReferrals, setMinReferrals] = useState(1);
  const [payoutMethod, setPayoutMethod] = useState('manual');
  const [autoApprove, setAutoApprove] = useState(false);

  const saveSettings = () => {
    Swal.fire({
      title: 'Settings Saved',
      text: 'Your reward settings have been updated successfully',
      icon: 'success',
      confirmButtonText: 'Great!',
      background: '#1f2937',
      color: '#f8fafc',
    });
  };

  return (
    <>
      <div className="justify-between flex-wrap md:flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <FiGift className="mr-2 mb-5 md:mb-0 text-blue-600" />
          Rewards Center
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'rewards' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            Reward Settings
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'payouts' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            Payout Methods
          </button>
        </div>
      </div>

      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
              <FiDollarSign className="mr-2" />
              Reward Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setRewardType('fixed')}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${rewardType === 'fixed' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600'}`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${rewardType === 'fixed' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}>
                    {rewardType === 'fixed' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="font-medium">Fixed Amount</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-8">
                  Give a fixed reward for each successful referral
                </p>
              </div>
              <div
                onClick={() => setRewardType('percentage')}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${rewardType === 'percentage' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600'}`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${rewardType === 'percentage' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}>
                    {rewardType === 'percentage' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="font-medium">Percentage</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-8">
                  Give a percentage of each referred customer's purchase
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
              <FiSettings className="mr-2" />
              Reward Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {rewardType === 'fixed' ? 'Reward Amount' : 'Reward Percentage'}
                </label>
                <div className="flex">
                  {rewardType === 'percentage' ? (
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={rewardValue}
                        onChange={(e) => setRewardValue(e.target.value)}
                        className="pl-10 pr-4 py-2 border bg-transparent dark:text-white focus:outline-none focus:outline-primary text-black  border-gray-300 dark:border-gray-600 rounded-lg w-full"
                        min="1"
                        max={rewardType === 'percentage' ? '100' : undefined}
                      />
                      <span className="absolute left-3 text-gray-500">%</span>
                    </div>
                  ) : (
                    <div className="relative flex items-center">
                      <select
                        value={rewardCurrency}
                        onChange={(e) => setRewardCurrency(e.target.value)}
                        className="border-r-0 rounded-r-none border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2"
                      >
                        <option value="USD">$</option>
                        <option value="EUR">€</option>
                        <option value="GBP">£</option>
                      </select>
                      <input
                        type="number"
                        value={rewardValue}
                        onChange={(e) => setRewardValue(e.target.value)}
                        className="pl-4 pr-4 py-2 border bg-transparent dark:text-white focus:outline-none focus:outline-primary text-black border-gray-300 dark:border-gray-600 rounded-r-lg w-full"
                        min="1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Referrals for Reward
                </label>
                <input
                  type="number"
                  value={minReferrals}
                  onChange={(e) => setMinReferrals(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 bg-transparent dark:text-white focus:outline-none focus:outline-primary text-black  dark:border-gray-600 rounded-lg"
                  min="1"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Set how many successful referrals are needed before a reward is given
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={saveSettings}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Save Reward Settings
            </button>
          </div>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
              <FiCreditCard className="mr-2" />
              Payout Methods
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payout Method
                </label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:bg-slate-800 dark:text-white focus:outline-none focus:outline-primary text-black  dark:border-gray-600 rounded-lg"
                >
                  <option value="manual">Manual Approval</option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                disabled
                  type="checkbox"
                  id="autoApprove"
                  checked={autoApprove}
                  onChange={(e) => setAutoApprove(e.target.checked)}
                  className="h-4 w-4  disabled:opacity-30 disabled:cursor-not-allowed text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoApprove" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Automatically approve payouts
                </label>
              </div>

              {payoutMethod !== 'manual' && (
                <div className="mt-4 p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    <FiUserPlus className="inline mr-1" />
                    Connect your {payoutMethod.charAt(0).toUpperCase() + payoutMethod.slice(1)} account
                  </h4>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
                    You'll need to authenticate with {payoutMethod} to enable automatic payouts.
                  </p>
                  <button className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg">
                    Connect {payoutMethod.charAt(0).toUpperCase() + payoutMethod.slice(1)}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={saveSettings}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Save Payout Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
}