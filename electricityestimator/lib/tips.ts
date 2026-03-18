import { ApplianceResult } from './appliances';

export interface Tip {
  id: string;
  type: 'warning' | 'tip' | 'success' | 'danger';
  titleEn: string;
  titleUr: string;
  messageEn: string;
  messageUr: string;
  applianceId?: string;
  condition: (units: number, appliance?: any) => boolean;
  savings?: number;
  icon?: string;
}

export interface Notification {
  id: string;
  tipId: string;
  timestamp: number;
  read: boolean;
  dismissed: boolean;
}

export const tips: Tip[] = [
  // AC Tips
  {
    id: 'ac-temp',
    type: 'warning',
    titleEn: 'AC Temperature Alert',
    titleUr: 'اے سی ٹمپریچر الرٹ',
    messageEn: 'Set AC to 24°C instead of 18°C. You can save up to 25% electricity!',
    messageUr: 'اے سی کو 18°C کی بجائے 24°C پر رکھیں۔ 25% بجلی بچ سکتی ہے!',
    applianceId: 'ac-1',
    condition: (units) => units > 200,
    savings: 500,
    icon: '❄️'
  },
  {
    id: 'ac-hours',
    type: 'danger',
    titleEn: 'AC Running Too Long',
    titleUr: 'اے سی بہت زیادہ چل رہا ہے',
    messageEn: 'You are running AC for 15 hours/day. Reduce to 8 hours to save Rs 2,500/month',
    messageUr: 'آپ اے سی 15 گھنٹے/دن چلا رہے ہیں۔ 8 گھنٹے کرنے سے 2500 روپے/ماہ بچ سکتے ہیں',
    applianceId: 'ac-1',
    condition: (units) => units > 400,
    savings: 2500,
    icon: '⚠️'
  },

  // Fan Tips
  {
    id: 'fan-dust',
    type: 'tip',
    titleEn: 'Clean Your Fans',
    titleUr: 'پنکھے صاف کریں',
    messageEn: 'Dusty fans consume 15% more electricity. Clean them monthly!',
    messageUr: 'گرد آلود پنکھے 15% زیادہ بجلی استعمال کرتے ہیں۔ ماہانہ صاف کریں!',
    applianceId: 'fan',
    condition: (units) => units > 100,
    savings: 200,
    icon: '🌀'
  },
  {
    id: 'fan-speed',
    type: 'tip',
    titleEn: 'Fan Speed Matters',
    titleUr: 'پنکھے کی رفتار',
    messageEn: 'Running fan on speed 3 instead of 5 saves 20% electricity',
    messageUr: 'پنکھے کو 5 کی بجائے 3 کی رفتار پر چلانے سے 20% بجلی بچتی ہے',
    applianceId: 'fan',
    condition: (units) => units > 150,
    savings: 150,
    icon: '🌀'
  },

  // Fridge Tips
  {
    id: 'fridge-door',
    type: 'warning',
    titleEn: 'Fridge Door Alert',
    titleUr: 'فریج کا دروازہ',
    messageEn: 'Opening fridge door frequently wastes 30 minutes of cooling each time!',
    messageUr: 'فریج کا دروازہ بار بار کھولنے سے ہر بار 30 منٹ کی ٹھنڈک ضائع ہوتی ہے!',
    applianceId: 'fridge',
    condition: (units) => units > 200,
    savings: 300,
    icon: '🧊'
  },
  {
    id: 'fridge-distance',
    type: 'tip',
    titleEn: 'Fridge Placement',
    titleUr: 'فریج کی جگہ',
    messageEn: 'Keep fridge 6 inches away from wall for 10% better efficiency',
    messageUr: 'فریج کو دیوار سے 6 انچ دور رکھنے سے 10% بہتر کارکردگی',
    applianceId: 'fridge',
    condition: (units) => units > 150,
    savings: 200,
    icon: '🧊'
  },

  // Lighting Tips
  {
    id: 'led-upgrade',
    type: 'success',
    titleEn: 'Upgrade to LED',
    titleUr: 'ایل ای ڈی لگائیں',
    messageEn: 'Replace old bulbs with LED. Save 80% on lighting bill!',
    messageUr: 'پرانے بلب کو ایل ای ڈی سے بدلیں۔ 80% بچت!',
    condition: (units) => units > 100,
    savings: 500,
    icon: '💡'
  },
  {
    id: 'natural-light',
    type: 'tip',
    titleEn: 'Use Natural Light',
    titleUr: 'قدرتی روشنی استعمال کریں',
    messageEn: 'Open curtains during day instead of turning on lights',
    messageUr: 'دن میں لائٹس کی بجائے پردے کھولیں',
    condition: (units) => units > 50,
    savings: 100,
    icon: '☀️'
  },

  // General Tips
  {
    id: 'peak-hours',
    type: 'danger',
    titleEn: 'Peak Hours Alert',
    titleUr: 'پیک اوقات الرٹ',
    messageEn: '6PM to 10PM is peak time. Electricity is 3x expensive!',
    messageUr: 'شام 6 سے 10 بجے پیک اوقات ہیں۔ بجلی 3 گنا مہنگی!',
    condition: (units) => true,
    icon: '⚡'
  },
  {
    id: 'slab-warning',
    type: 'danger',
    titleEn: 'Slab Change Warning',
    titleUr: 'سلیب تبدیل ہونے کا خطرہ',
    messageEn: 'You are near 400 units. If you exceed, rate will jump to Rs 36.91/unit!',
    messageUr: 'آپ 400 یونٹس کے قریب ہیں۔ اگر بڑھے تو ریٹ 36.91 روپے/یونٹ ہو جائے گا!',
    condition: (units) => units > 350 && units < 400,
    icon: '📊'
  },
  {
    id: 'monthly-target',
    type: 'success',
    titleEn: 'Monthly Target',
    titleUr: 'ماہانہ ہدف',
    messageEn: 'You saved 500 units this month compared to last! Keep it up!',
    messageUr: 'آپ نے پچھلے مہینے کے مقابلے میں 500 یونٹس بچائے!',
    condition: (units) => units < 300,
    savings: 1000,
    icon: '🎯'
  }
];

export function getRelevantTips(
  totalUnits: number,
  appliances: ApplianceResult[] = []
): Tip[] {
  return tips.filter(tip => {
    // Check main condition
    if (!tip.condition(totalUnits)) return false;
    
    // If appliance specific, check if that appliance exists
    if (tip.applianceId) {
      return appliances.some(a => a.appliance.id === tip.applianceId);
    }
    
    return true;
  });
}

export function calculateTotalSavings(tips: Tip[]): number {
  return tips.reduce((total, tip) => total + (tip.savings || 0), 0);
}