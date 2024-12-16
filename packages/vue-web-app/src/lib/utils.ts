import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 * - Uses clsx to conditionally join class names together
 * - Uses tailwind-merge to properly merge Tailwind CSS classes and handle conflicts
 *
 * @param inputs - Any number of class name values that clsx accepts (strings, objects, arrays)
 * @returns A merged string of class names with Tailwind conflicts resolved
 * 
 * @example
 * ```ts
 * cn('px-2 py-1', 'bg-blue-500', { 'text-white': true })
 * // => 'px-2 py-1 bg-blue-500 text-white'
 * 
 * cn('p-4', 'px-8') 
 * // => 'p-4 px-8' (px-8 overrides p-4's horizontal padding)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
