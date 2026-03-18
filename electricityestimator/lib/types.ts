export interface Slab {
  upTo: number;
  rate: number;
}

export interface Tariff {
  slabs: Slab[];
  meterRent: number;
  tvFee: number;
  gstPercent: number;
  dutyPercent: number;
}

export interface CalculationResult {
  units: number;
  slabDetails: {
    slab: string;
    units: number;
    rate: number;
    amount: number;
  }[];
  energyCharges: number;
  meterRent: number;
  tvFee: number;
  subtotal: number;
  gst: number;
  duty: number;
  total: number;
}