// Create a new file Wallet.js
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiCopy,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiX,
} from "react-icons/fi";
import Transactions from "../transactions/Transactions";

export default function Wallet() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSend, setShowSend] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
    // Show toast notification here
  };

  const transactionButtons = [
    { name: "Deposit", icon: <FiArrowDownLeft /> },
    { name: "Send", icon: <FiArrowUpRight /> },
    { name: "Withdraw", icon: <FiArrowUpRight /> },
  ];

  return (
    <div className="space-y-6 h-[73vh] overflow-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium">Wallet Balance</h2>
            <p className="text-3xl font-bold mt-2">₦5,950.00</p>
            <p className="text-blue-100 mt-1">0x742d...f44e</p>
          </div>
          <button
            onClick={copyAddress}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FiCopy />
          </button>
        </div>

        <div className="gap-3 md:flex grid grid-cols-2 mt-6">
          {transactionButtons.map((button, i) => (
            <button
              key={i}
              onClick={() => {
                if (button.name === "Deposit") {
                  setShowDeposit(true);
                } else if (button.name === "Withdraw") {
                  setShowWithdraw(true);
                } else {
                  setShowSend(true);
                }
              }}
              className="md:flex-1 flex items-center justify-center gap-2 bg-white/10 py-1.5 px-2 hover:bg-white/20 md:py-3 md:px-4 rounded-lg transition"
            >
              {button.icon} {button.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Transactions />
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
          <button
            onClick={onClose}
            className="p-1 rounded-full text-2xl hover:bg-slate-100 dark:hover:bg-slate-700"
          >
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
                <label className="block text-sm font-medium mb-1">
                  Recipient Address
                </label>
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
