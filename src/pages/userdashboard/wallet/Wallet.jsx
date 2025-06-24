// Create a new file Wallet.js
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiCopy, FiArrowUpRight, FiArrowDownLeft, FiPlus, FiX } from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("activity");
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSend, setShowSend] = useState(false);

  const transactions = [
    { id: 1, type: "deposit", amount: 500, currency: "USDC", date: "2023-06-15", status: "completed" },
    { id: 2, type: "withdrawal", amount: 0.1, currency: "ETH", date: "2023-06-10", status: "completed" },
    { id: 3, type: "swap", from: "ETH", to: "USDC", amount: 0.5, value: 1500, date: "2023-06-05", status: "completed" }
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
    // Show toast notification here
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium">Wallet Balance</h2>
            <p className="text-3xl font-bold mt-2">$5,950.00</p>
            <p className="text-blue-100 mt-1">0x742d...f44e</p>
          </div>
          <button 
            onClick={copyAddress}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FiCopy />
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => setShowDeposit(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-3 px-4 rounded-lg transition"
          >
            <FiArrowDownLeft /> Deposit
          </button>
          <button 
            onClick={() => setShowWithdraw(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-3 px-4 rounded-lg transition"
          >
            <FiArrowUpRight /> Withdraw
          </button>
          <button 
            onClick={() => setShowSend(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-3 px-4 rounded-lg transition"
          >
            <FiArrowUpRight /> Send
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 font-medium ${activeTab === "activity" ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500" : "text-slate-500 dark:text-slate-400"}`}
        >
          Activity
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "assets" ? (
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition">
                <FiPlus /> Add Asset
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === "deposit" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : tx.type === "withdrawal" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                      {tx.type === "deposit" ? <FiArrowDownLeft /> : tx.type === "withdrawal" ? <FiArrowUpRight /> : <RiExchangeLine />}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{tx.type}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.type === "deposit" ? "text-green-600 dark:text-green-400" : tx.type === "withdrawal" ? "text-red-600 dark:text-red-400" : ""}`}>
                      {tx.type === "swap" ? `${tx.amount} ${tx.from} → ${tx.value} ${tx.to}` : `${tx.amount} ${tx.currency}`}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showDeposit && (
          <WalletModal title="Deposit" onClose={() => setShowDeposit(false)}>
            {/* Deposit form content */}
          </WalletModal>
        )}
        {showWithdraw && (
          <WalletModal title="Withdraw" onClose={() => setShowWithdraw(false)}>
            {/* Withdraw form content */}
          </WalletModal>
        )}
        {showSend && (
          <WalletModal title="Send" onClose={() => setShowSend(false)}>
            {/* Send form content */}
          </WalletModal>
        )}
      </AnimatePresence>
    </div>
  );
}

function WalletModal({ title, onClose, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <FiX />
          </button>
        </div>
        {children || (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input 
                type="number" 
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                placeholder="0.00"
              />
            </div>
            {title === "Send" && (
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Address</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                  placeholder="0x..."
                />
              </div>
            )}
            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
              Confirm {title}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}