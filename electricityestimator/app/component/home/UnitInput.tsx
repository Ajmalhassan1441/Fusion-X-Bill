'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { calculateBill } from '@/lib/calc';
import { loadTariff, saveLastCalculation } from '@/lib/storage';
import { formatCurrency } from '@/lib/format';

export default function UnitInput() {
  const [units, setUnits] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const { t, language } = useLanguage();

  const handleCalculate = () => {
    const unitsNum = parseFloat(units);
    if (isNaN(unitsNum) || unitsNum <= 0) {
      setError(t('Please enter valid units', 'براہ کرم درست یونٹس ڈالیں'));
      return;
    }
    if (unitsNum > 100000) {
      setError(t('Units are too high', 'یونٹس بہت زیادہ ہیں'));
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const tariff = loadTariff();
      const calculation = calculateBill(unitsNum, tariff);
      setResult(calculation);
      saveLastCalculation(calculation);
      setLoading(false);
    }, 500);
  };

  const quickUnits = [100, 200, 300, 400, 500];

  return (
    <Card className="w-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {t('Units Calculator', 'یونٹس کیلکولیٹر')}
            </h3>
            <p className="text-xs text-gray-400">
              {t('Enter units and see bill instantly', 'یونٹس ڈالیں اور بل فوراً دیکھیں')}
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <Input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder={t('e.g. 450', 'مثلاً 450')}
            label={t('Units Consumed', 'مستعمل یونٹس')}
            error={error}
            min="0"
            step="1"
            className="text-lg"
          />

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap gap-2">
            {quickUnits.map((value) => (
              <button
                key={value}
                onClick={() => setUnits(value.toString())}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
              >
                {value} {t('units', 'یونٹس')}
              </button>
            ))}
          </div>

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            disabled={loading}
            size="lg"
            className="w-full relative overflow-hidden group"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              <span className="flex items-center justify-center gap-2">
                {t('Calculate Bill', 'بل دیکھیں')}
                <span className="text-lg">📊</span>
              </span>
            )}
          </Button>
        </div>

        {/* Result Section */}
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t border-gray-800"
          >
            <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{t('Total Bill', 'کل بل')}</span>
                <span className="text-2xl font-bold text-white">
                  {formatCurrency(result.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('Energy Charges', 'انرجی چارجز')}</span>
                <span className="text-white">{formatCurrency(result.energyCharges)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">{t('Taxes', 'ٹیکسز')}</span>
                <span className="text-white">
                  {formatCurrency(result.gst + result.duty)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}