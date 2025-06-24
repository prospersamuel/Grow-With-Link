import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowUpRight, 
  FiArrowDownLeft, 
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiCopy,
  FiExternalLink,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Transactions() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Sample transaction data
  const transactions = [
    {
      id: "0x4a3b...8c2d",
      type: "deposit",
      amount: 0.5,
      currency: "ETH",
      value: 1500,
      status: "completed",
      timestamp: "2023-06-15T14:32:00Z",
      from: "0x742d...f44e",
      to: "Wallet",
      explorerUrl: "#"
    },
    {
      id: "0x8b2e...7f1a",
      type: "withdrawal",
      amount: 250,
      currency: "USDC",
      value: 250,
      status: "completed",
      timestamp: "2023-06-12T09:15:00Z",
      from: "Wallet",
      to: "0x913a...b27c",
      explorerUrl: "#"
    },

    {
      id: "0x5f1b...3d8a",
      type: "deposit",
      amount: 1200,
      currency: "USDC",
      value: 1200,
      status: "pending",
      timestamp: "2023-06-05T11:20:00Z",
      from: "0x742d...f44e",
      to: "Wallet",
      explorerUrl: "#"
    },
    {
      id: "0x2e9a...4c7b",
      type: "send",
      amount: 50,
      currency: "USDC",
      value: 50,
      status: "completed",
      timestamp: "2023-05-28T16:10:00Z",
      from: "Wallet",
      to: "0x6d3f...e29a",
      explorerUrl: "#"
    },
    {
      id: "0x1a2b...3c4d",
      type: "deposit",
      amount: 0.75,
      currency: "ETH",
      value: 2250,
      status: "completed",
      timestamp: "2023-05-20T10:30:00Z",
      from: "0x742d...f44e",
      to: "Wallet",
      explorerUrl: "#"
    },
    {
      id: "0x4d5e...6f7a",
      type: "withdrawal",
      amount: 100,
      currency: "USDC",
      value: 100,
      status: "completed",
      timestamp: "2023-05-15T14:45:00Z",
      from: "Wallet",
      to: "0x913a...b27c",
      explorerUrl: "#"
    }
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "deposit", label: "Deposits" },
    { id: "withdrawal", label: "Withdrawals" },
    { id: "send", label: "Transfers" }
  ];

  const statuses = {
    completed: { color: "bg-green-500", text: "Completed" },
    pending: { color: "bg-yellow-500", text: "Pending" },
    failed: { color: "bg-red-500", text: "Failed" }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTransactions = transactions.filter(tx => {
    // Filter by type
    const matchesFilter = activeFilter === "all" || tx.type === activeFilter;
    
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toString().includes(searchQuery) ||
      tx.currency.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by date range
    const txDate = new Date(tx.timestamp);
    const matchesDate = !startDate || !endDate || 
      (txDate >= new Date(startDate) && txDate <= new Date(endDate));
    
    return matchesFilter && matchesSearch && matchesDate;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, dateRange]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "deposit":
        return <FiArrowDownLeft className="text-green-500" />;
      case "withdrawal":
      case "send":
        return <RiExchangeLine className="text-blue-500" />;
      default:
        return <FiArrowUpRight />;
    }
  };

  const clearDateFilter = () => {
    setDateRange([null, null]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Transaction History</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Showing {filteredTransactions.length} transactions
            {dateRange[0] && dateRange[1] && (
              <span className="ml-2">
                from {formatDate(dateRange[0])} to {formatDate(dateRange[1])}
              </span>
            )}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDateFilter(!showDateFilter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                dateRange[0] && dateRange[1] 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" 
                  : "border-slate-200 dark:border-slate-700"
              } hover:bg-slate-100 dark:hover:bg-slate-700 transition`}
            >
              <FiCalendar />
              {dateRange[0] && dateRange[1] ? "Date Filtered" : "Date"}
            </button>
            
            {showDateFilter && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Filter by date range</h3>
                  <button 
                    onClick={() => setShowDateFilter(false)}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <FiX size={18} />
                  </button>
                </div>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                  inline
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={clearDateFilter}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Clear dates
                  </button>
                  <button
                    onClick={() => setShowDateFilter(false)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
              setDateRange([null, null]);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <FiRefreshCw /> Reset
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeFilter === filter.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 dark:bg-slate-700/30 border-b border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-500 dark:text-slate-400">
          <div className="col-span-4">Transaction</div>
          <div className="col-span-3">Amount</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2">Time</div>
        </div>

        <AnimatePresence>
          {currentItems.length > 0 ? (
            currentItems.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-12 px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
              >
                 <div className="col-span-4 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-700">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <div className="font-medium capitalize">{tx.type}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="truncate max-w-[120px]">{tx.id}</span>
                      <button 
                        onClick={() => copyToClipboard(tx.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                        title="Copy TX ID"
                      >
                        <FiCopy size={14} />
                      </button>
                      <a 
                        href={tx.explorerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                        title="View on explorer"
                      >
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                    {copiedId === tx.id && (
                      <span className="text-xs text-green-500">Copied!</span>
                    )}
                  </div>
                </div>

                <div className="col-span-3">
                  <div className={`font-medium ${
                    tx.type === "deposit" ? "text-green-600 dark:text-green-400" : 
                    ["withdrawal", "send"].includes(tx.type) ? "text-red-600 dark:text-red-400" : ""
                  }`}>
                    {tx.type === "deposit" ? "+" : ["withdrawal", "send"].includes(tx.type) ? "-" : ""}
                    {tx.amount} {tx.currency}
                  </div>
                  {tx.toCurrency && (
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      → {tx.value} {tx.toCurrency}
                    </div>
                  )}
                  {!tx.toCurrency && tx.value && (
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      ${tx.value.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="col-span-3 flex items-center">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statuses[tx.status]?.color || "bg-gray-500"}`}></span>
                    <span>{statuses[tx.status]?.text || tx.status}</span>
                  </div>
                </div>

                <div className="col-span-2 text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(tx.timestamp)}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <div className="text-slate-400 dark:text-slate-500">
                No transactions found matching your criteria
              </div>
              <button 
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                  setDateRange([null, null]);
                }}
                className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Pagination */}
      {filteredTransactions.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600 flex items-center disabled:opacity-50 disabled:cursor-not-allowed p-2  ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <FiChevronLeft />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show limited page numbers with ellipsis
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`w-10 h-10 rounded flex items-center justify-center ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && (
              <span className="px-2">...</span>
            )}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-3 py-1.5  rounded-lg border border-slate-200 dark:border-slate-700 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}