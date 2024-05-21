import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export const combine = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
