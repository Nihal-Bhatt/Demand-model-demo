import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPercent(value: number, digits = 0) {
  return `${value.toFixed(digits)}%`
}

export function formatCr(value: number) {
  return `₹${value.toLocaleString('en-IN')} Cr`
}
