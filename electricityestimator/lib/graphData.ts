export interface GraphDataPoint {
  month: string;
  amount: number;
  units: number;
  color: string;
}

export function generateGraphData(history: any[]): GraphDataPoint[] {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const colors = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // emerald
    '#6366f1', // indigo
    '#ef4444', // red
    '#14b8a6', // teal
    '#f97316', // orange
    '#84cc16', // lime
    '#06b6d4', // cyan
    '#a855f7', // purple
  ];

  // If no history, generate sample data
  if (history.length === 0) {
    return months.slice(0, 6).map((month, index) => ({
      month,
      amount: 3000 + Math.random() * 4000,
      units: 200 + Math.random() * 300,
      color: colors[index % colors.length]
    }));
  }

  // Use actual history data
  return history.slice(0, 12).reverse().map((item, index) => {
    const date = new Date(item.createdAt);
    const monthName = months[date.getMonth()];
    
    return {
      month: monthName,
      amount: item.total,
      units: item.units,
      color: colors[index % colors.length]
    };
  });
}

export function calculateStats(data: GraphDataPoint[]) {
  if (data.length === 0) return null;

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const totalUnits = data.reduce((sum, item) => sum + item.units, 0);
  const averageAmount = totalAmount / data.length;
  const maxAmount = Math.max(...data.map(item => item.amount));
  const maxMonth = data.find(item => item.amount === maxAmount)?.month;

  const trending = data.length >= 2
    ? ((data[0].amount - data[data.length - 1].amount) / data[data.length - 1].amount * 100).toFixed(1)
    : 0;

  return {
    totalAmount,
    totalUnits,
    averageAmount,
    maxAmount,
    maxMonth,
    trending: Number(trending)
  };
}
