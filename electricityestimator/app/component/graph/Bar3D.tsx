'use client'
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { GraphDataPoint } from '@/lib/graphData';
import { formatCurrency } from '@/lib/format';

interface Bar3DProps {
  data: GraphDataPoint[];
  maxValue: number;
  index: number;
}

export default function Bar3D({ data, maxValue, index }: Bar3DProps) {
  const { language } = useLanguage();
  const item = data[index];
  const height = (item.amount / maxValue) * 200; // Max height 200px
  const barColor = item.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      {/* 3D Bar Container */}
      <div className="relative h-[250px] w-16 mx-auto perspective-1000">
        {/* Front Face */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-0 left-0 right-0 rounded-t-lg cursor-pointer"
          style={{
            height: `${height}px`,
            backgroundColor: barColor,
            boxShadow: '0 10px 20px -5px rgba(0,0,0,0.5)',
            transform: 'rotateX(10deg) translateZ(10px)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Top Face */}
          <div
            className="absolute -top-2 left-0 right-0 h-2 rounded-t-lg"
            style={{
              backgroundColor: barColor,
              transform: 'rotateX(90deg) translateZ(2px)',
              opacity: 0.8
            }}
          />
          
          {/* Right Face */}
          <div
            className="absolute top-0 -right-2 w-2 h-full"
            style={{
              backgroundColor: barColor,
              transform: 'rotateY(90deg) translateZ(8px)',
              opacity: 0.6
            }}
          />
        </motion.div>

        {/* Tooltip on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none"
        >
          <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg border border-blue-500/30 shadow-lg">
            <p className="font-bold">{item.month}</p>
            <p className="text-blue-400">{formatCurrency(item.amount)}</p>
            <p className="text-gray-400">{item.units} units</p>
          </div>
        </motion.div>
      </div>

      {/* Month Label */}
      <p className="text-center text-xs text-gray-400 mt-2">{item.month}</p>
    </motion.div>
  );
}