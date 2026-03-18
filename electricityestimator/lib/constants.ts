import { Tariff } from './types';

export const DEFAULT_TARIFF: Tariff = {
  slabs: [
    { upTo: 100, rate: 7 },
    { upTo: 200, rate: 10.41 },
    { upTo: Infinity, rate: 29.91 }  // default, but actually handled in calc.ts
  ],
  meterRent: 50,
  tvFee: 35,
  gstPercent: 17,
  dutyPercent: 1.5
};

export const STORAGE_KEYS = {
  TARIFF: 'tariff_v1',
  LAST_CALC: 'last_calc_v1',
  HISTORY: 'history_v1',
  LANGUAGE: 'language'
};