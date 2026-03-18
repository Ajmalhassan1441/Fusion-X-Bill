'use client'
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { formatCurrency } from '@/lib/format';
import { FaChartLine, FaChartBar, FaChartPie, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface StatsCardsProps {
  stats: {
    totalAmount: number;
    totalUnits: number;
    averageAmount: number;
    maxAmount: number;
    maxMonth: string;
    trending: number;
  } | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const { t } = useLanguage();

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Amount */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30"
      >
        <div className="flex items-center gap-3 mb-2">
          <FaChartBar className="text-blue-500" />
          <p className="text-sm text-gray-400">{t('Total Bill', 'کل بل')}</p>
        </div>
        <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalAmount)}</p>
      </motion.div>

      {/* Average Amount */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-500/30"
      >
        <div className="flex items-center gap-3 mb-2">
          <FaChartPie className="text-purple-500" />
          <p className="text-sm text-gray-400">{t('Average Bill', 'اوسط بل')}</p>
        </div>
        <p className="text-2xl font-bold text-white">{formatCurrency(stats.averageAmount)}</p>
      </motion.div>

      {/* Highest Month */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl border border-yellow-500/30"
      >
        <div className="flex items-center gap-3 mb-2">
          <FaChartLine className="text-yellow-500" />
          <p className="text-sm text-gray-400">{t('Highest Bill', 'زیادہ ترین بل')}</p>
        </div>
        <p className="text-2xl font-bold text-white">{formatCurrency(stats.maxAmount)}</p>
        <p className="text-xs text-gray-400">{stats.maxMonth}</p>
      </motion.div>

      {/* Trending */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30"
      >
        <div className="flex items-center gap-3 mb-2">
          {stats.trending < 0 ? (
            <FaArrowDown className="text-green-500" />
          ) : (
            <FaArrowUp className={`${stats.trending > 0 ? 'text-red-500' : 'text-gray-500'}`} />
          )}
          <p className="text-sm text-gray-400">{t('Trending', 'رجحان')}</p>
        </div>
        <p className={`text-2xl font-bold ${stats.trending < 0 ? 'text-green-500' : stats.trending > 0 ? 'text-red-500' : 'text-white'}`}>
          {stats.trending > 0 ? '+' : ''}{stats.trending}%
        </p>
        <p className="text-xs text-gray-400">{t('vs last period', 'پچھلے عرصے سے')}</p>
      </motion.div>
    </div>
  );
}