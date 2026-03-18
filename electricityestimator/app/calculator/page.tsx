'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ApplianceSelector from '../component/calculator/ApplianceSelector';
import { calculateBill } from '@/lib/calc';
import { loadTariff } from '@/lib/storage';
import { formatCurrency } from '@/lib/format';
import Card from '../component/ui/Card';

export default function CalculatorPage() {
  const { t } = useLanguage();
  const [results, setResults] = useState<any[]>([]);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (selected: any[]) => {
    console.log('Selected appliances:', selected);
    
    if (selected.length === 0) {
      alert(t('Please add appliances first', 'پہلے آلات شامل کریں'));
      return;
    }

    // Load current tariff
    const tariff = loadTariff();
    
    // Calculate total monthly units
    let totalUnits = 0;
    const applianceResults = selected.map(item => {
      // Calculate monthly units: (wattage × hours × quantity × 30) / 1000
      const monthlyUnits = (item.wattage * item.hours * item.quantity * 30) / 1000;
      totalUnits += monthlyUnits;
      
      return {
        ...item,
        monthlyUnits: monthlyUnits.toFixed(2)
      };
    });

    console.log('Total Units:', totalUnits);

    // ✅ بل کا حساب Home Page کی طرح
    const billResult = calculateBill(totalUnits, tariff);
    
    console.log('Bill Result:', billResult);

    setResults(applianceResults);
    setTotalUnits(totalUnits);
    setTotalBill(billResult.total);
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t('Appliance', 'آلات')} <span className="text-blue-500">{t('Calculator', 'کیلکولیٹر')}</span>
        </h1>
        <p className="text-gray-400 text-lg">
          {t('Calculate monthly bill for each appliance', 'ہر آلے کا ماہانہ بل نکالیں')}
        </p>
      </motion.div>

      <Card className="p-6 mb-8">
        <ApplianceSelector onCalculate={handleCalculate} />
      </Card>

      {showResults && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('Results', 'نتائج')}
            </h2>
            
            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{t('Total Monthly Units', 'کل ماہانہ یونٹس')}</span>
                <span className="text-2xl font-bold text-white">{totalUnits.toFixed(2)} kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{t('Total Bill', 'کل بل')}</span>
                <span className="text-3xl font-bold text-green-400">{formatCurrency(totalBill)}</span>
              </div>
            </div>

            {/* Individual Results */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white mb-3">
                {t('Appliance Details', 'آلات کی تفصیل')}
              </h3>
              {results.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-4 rounded-lg flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-white font-medium">{item.nameEn}</p>
                      <p className="text-sm text-gray-400">
                        {item.wattage}W × {item.quantity} × {item.hours}h/day
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-medium">{item.monthlyUnits} kWh</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}