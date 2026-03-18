'use client'
import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { calculateBill } from '@/lib/calc';
import { loadTariff, saveLastCalculation } from '@/lib/storage';
import { formatCurrency } from '@/lib/format';
import { CalculationResult } from '@/lib/types';

export default function QuickBill() {
  const [units, setUnits] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const unitsNum = parseFloat(units);
    if (isNaN(unitsNum) || unitsNum < 0) {
      setError('براہ کرم درست یونٹس ڈالیں');
      return;
    }
    setError('');
    
    const tariff = loadTariff();
    const calculation = calculateBill(unitsNum, tariff);
    setResult(calculation);
    saveLastCalculation(calculation);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-white mb-6 gradient-text">
          ⚡ یونٹس کیلکولیٹر
        </h2>
        
        <div className="space-y-4">
          <Input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="یونٹس ڈالیں (مثلاً 450)"
            label="مستعمل یونٹس"
            error={error}
            min="0"
            step="1"
          />
          
          <Button onClick={handleCalculate} size="lg" className="w-full">
            بل دیکھیں
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="animate-fadeIn">
          <h3 className="text-xl font-semibold text-white mb-4">
            آپ کا بل
          </h3>
          
          <div className="space-y-3">
            {result.slabDetails.map((slab, idx) => (
              <div key={idx} className="flex justify-between text-gray-300 text-sm border-b border-gray-800 pb-2">
                <span>{slab.slab} یونٹس ({slab.rate} روپے/یونٹ)</span>
                <span className="text-white font-medium">{formatCurrency(slab.amount)}</span>
              </div>
            ))}
            
            <div className="pt-3 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>انرجی چارجز</span>
                <span className="text-white">{formatCurrency(result.energyCharges)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>میٹر کرایہ</span>
                <span className="text-white">{formatCurrency(result.meterRent)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>ٹی وی فیس</span>
                <span className="text-white">{formatCurrency(result.tvFee)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>جی ایس ٹی (17%)</span>
                <span className="text-white">{formatCurrency(result.gst)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>الیکٹریسٹی ڈیوٹی (1.5%)</span>
                <span className="text-white">{formatCurrency(result.duty)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-blue-400">کل بل</span>
                <span className="text-white">{formatCurrency(result.total)}</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}