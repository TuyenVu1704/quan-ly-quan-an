import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Xoá ký tự '/' ở đầu của path
 */

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};
