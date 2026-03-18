import { Tariff, CalculationResult } from './types';
import { DEFAULT_TARIFF } from './constants';

export interface CalculationHistory extends CalculationResult {
  id: string;
  createdAt: number;
}

export const STORAGE_KEYS = {
  TARIFF: 'tariff_v1',
  LAST_CALC: 'last_calc_v1',
  HISTORY: 'history_v1',
  LANGUAGE: 'language'
};

export function loadTariff(): Tariff {
  if (typeof window === 'undefined') return DEFAULT_TARIFF;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TARIFF);
    return stored ? JSON.parse(stored) : DEFAULT_TARIFF;
  } catch {
    return DEFAULT_TARIFF;
  }
}

export function saveTariff(tariff: Tariff): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TARIFF, JSON.stringify(tariff));
}

export function loadLastCalculation(): CalculationResult | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_CALC);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveLastCalculation(calc: CalculationResult): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.LAST_CALC, JSON.stringify(calc));
  
  // Also save to history
  const history = loadHistory();
  const historyItem: CalculationHistory = {
    ...calc,
    id: Date.now().toString(),
    createdAt: Date.now()
  };
  history.unshift(historyItem);
  saveHistory(history.slice(0, 50)); // Keep last 50 items
}

export function loadHistory(): CalculationHistory[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history: CalculationHistory[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}