import { Tariff, CalculationResult } from './types';

export function calculateBill(units: number, tariff: Tariff): CalculationResult {
  let energyCharges = 0;
  const slabDetails = [];
  
  // Units < 200
  if (units <= 200) {
    // Units 1-100
    const firstHundredUnits = Math.min(units, 100);
    const firstAmount = firstHundredUnits * 7;
    energyCharges += firstAmount;
    slabDetails.push({
      slab: '1-100',
      units: firstHundredUnits,
      rate: 7,
      amount: firstAmount
    });

    // Units 101-200
    if (units > 100) {
      const nextHundredUnits = Math.min(units - 100, 100);
      const nextAmount = nextHundredUnits * 10.41;
      energyCharges += nextAmount;
      slabDetails.push({
        slab: '101-200',
        units: nextHundredUnits,
        rate: 10.41,
        amount: nextAmount
      });
    }
  } 
  // Units > 200 but ≤ 400
  else if (units > 200 && units <= 400) {
    const totalAmount = units * 29.91;
    energyCharges += totalAmount;
    slabDetails.push({
      slab: '1-سے-زیادہ',
      units: units,
      rate: 29.91,
      amount: totalAmount
    });
  } 
  // Units > 400
  else {
    const totalAmount = units * 36.91;
    energyCharges += totalAmount;
    slabDetails.push({
      slab: '1-سے-زیادہ',
      units: units,
      rate: 36.91,
      amount: totalAmount
    });
  }

  // Extra charges (fixed)
  const meterRent = tariff.meterRent; // 50
  const tvFee = tariff.tvFee;          // 35
  const subtotal = energyCharges + meterRent + tvFee;
  const gst = (subtotal * tariff.gstPercent) / 100;
  const duty = (subtotal * tariff.dutyPercent) / 100;
  const total = subtotal + gst + duty;

  return {
    units,
    slabDetails,
    energyCharges: Number(energyCharges.toFixed(2)),
    meterRent,
    tvFee,
    subtotal: Number(subtotal.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    duty: Number(duty.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}