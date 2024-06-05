import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export const combine = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}