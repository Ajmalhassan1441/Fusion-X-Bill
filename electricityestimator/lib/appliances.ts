import { loadTariff } from './storage';
import { calculateBill } from './calc';

export interface Appliance {
  id: string;
  nameEn: string;
  nameUr: string;
  wattage: number;
  icon: string;
  category: 'cooling' | 'heating' | 'lighting' | 'kitchen' | 'electronics' | 'others';
}

export interface SelectedAppliance extends Appliance {
  hours: number;
  quantity: number;
  id: string;
}

export interface ApplianceResult {
  appliance: SelectedAppliance;
  dailyKwh: number;
  monthlyKwh: number;
  billDetails: any; // CalculationResult
  cost: number;
}

export const appliances: Appliance[] = [
  // Cooling
  { id: 'ac-1', nameEn: 'AC (1 Ton)', nameUr: 'اے سی (1 ٹن)', wattage: 1500, icon: '❄️', category: 'cooling' },
  { id: 'ac-1.5', nameEn: 'AC (1.5 Ton)', nameUr: 'اے سی (1.5 ٹن)', wattage: 2000, icon: '❄️', category: 'cooling' },
  { id: 'ac-2', nameEn: 'AC (2 Ton)', nameUr: 'اے سی (2 ٹن)', wattage: 2500, icon: '❄️', category: 'cooling' },
  { id: 'fan', nameEn: 'Ceiling Fan', nameUr: 'پنکھا', wattage: 75, icon: '🌀', category: 'cooling' },
  { id: 'exhaust', nameEn: 'Exhaust Fan', nameUr: 'ایگزاسٹ پنکھا', wattage: 50, icon: '🌀', category: 'cooling' },
  
  // Lighting
  { id: 'led', nameEn: 'LED Bulb', nameUr: 'ایل ای ڈی بلب', wattage: 15, icon: '💡', category: 'lighting' },
  { id: 'energy-saver', nameEn: 'Energy Saver', nameUr: 'انرجی سیور', wattage: 25, icon: '💡', category: 'lighting' },
  { id: 'tube-light', nameEn: 'Tube Light', nameUr: 'ٹیوب لائٹ', wattage: 40, icon: '💡', category: 'lighting' },
  
  // Kitchen
  { id: 'fridge', nameEn: 'Refrigerator', nameUr: 'فریج', wattage: 200, icon: '🧊', category: 'kitchen' },
  { id: 'deep-freezer', nameEn: 'Deep Freezer', nameUr: 'ڈیپ فریزر', wattage: 300, icon: '🧊', category: 'kitchen' },
  { id: 'microwave', nameEn: 'Microwave', nameUr: 'مائیکروویو', wattage: 1200, icon: '☕', category: 'kitchen' },
  { id: 'kettle', nameEn: 'Electric Kettle', nameUr: 'کیتلی', wattage: 1500, icon: '🫖', category: 'kitchen' },
  { id: 'rice-cooker', nameEn: 'Rice Cooker', nameUr: 'رائس ککر', wattage: 800, icon: '🍚', category: 'kitchen' },
  
  // Electronics
  { id: 'tv', nameEn: 'LED TV', nameUr: 'ٹی وی', wattage: 100, icon: '📺', category: 'electronics' },
  { id: 'computer', nameEn: 'Computer', nameUr: 'کمپیوٹر', wattage: 300, icon: '🖥️', category: 'electronics' },
  { id: 'laptop', nameEn: 'Laptop', nameUr: 'لیپ ٹاپ', wattage: 60, icon: '💻', category: 'electronics' },
  { id: 'router', nameEn: 'WiFi Router', nameUr: 'روٹر', wattage: 10, icon: '📶', category: 'electronics' },
  
  // Others
  { id: 'iron', nameEn: 'Iron', nameUr: 'استری', wattage: 1000, icon: '🔥', category: 'others' },
  { id: 'water-pump', nameEn: 'Water Pump', nameUr: 'واٹر پمپ', wattage: 750, icon: '🚰', category: 'others' },
  { id: 'washing-machine', nameEn: 'Washing Machine', nameUr: 'واشنگ مشین', wattage: 500, icon: '🧺', category: 'others' },
];

export const categories = [
  { id: 'all', nameEn: 'All', nameUr: 'تمام' },
  { id: 'cooling', nameEn: 'Cooling', nameUr: 'ٹھنڈک' },
  { id: 'lighting', nameEn: 'Lighting', nameUr: 'روشنی' },
  { id: 'kitchen', nameEn: 'Kitchen', nameUr: 'باورچی خانہ' },
  { id: 'electronics', nameEn: 'Electronics', nameUr: 'الیکٹرانکس' },
  { id: 'heating', nameEn: 'Heating', nameUr: 'گرمی' },
  { id: 'others', nameEn: 'Others', nameUr: 'دیگر' },
];

export function calculateApplianceBill(
  selectedAppliances: SelectedAppliance[]
): { results: ApplianceResult[]; totalUnits: number; totalBill: number } {
  
  const tariff = loadTariff();
  let totalUnits = 0;
  const results: ApplianceResult[] = [];

  selectedAppliances.forEach(app => {
    // Calculate monthly units for this appliance
    const dailyKwh = (app.wattage * app.hours * app.quantity) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const monthlyUnits = monthlyKwh; // 1 kWh = 1 unit

    totalUnits += monthlyUnits;

    // Calculate bill using the same tariff logic
    const billDetails = calculateBill(monthlyUnits, tariff);

    results.push({
      appliance: app,
      dailyKwh,
      monthlyKwh,
      billDetails,
      cost: billDetails.total
    });
  });

  // Calculate total bill using the same tariff logic
  const totalBillDetails = calculateBill(totalUnits, tariff);

  return {
    results,
    totalUnits,
    totalBill: totalBillDetails.total
  };
}