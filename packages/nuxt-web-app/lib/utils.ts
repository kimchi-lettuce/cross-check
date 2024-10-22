import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// FIXME: Move this to utils folder
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
