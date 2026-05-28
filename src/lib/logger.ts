/**
 * Debug-safe logging utility.
 * Prevents console.log memory leaks in production and provides structured formatting.
 */

const isProd = import.meta.env.PROD;

export const logger = {
  info: (message: string, ...data: any[]) => {
    if (isProd) return;
    console.log(`[HustiQ INFO]: ${message}`, ...data);
  },
  
  warn: (message: string, ...data: any[]) => {
    if (isProd) return;
    console.warn(`[HustiQ WARN]: ${message}`, ...data);
  },
  
  error: (message: string, error?: any, ...data: any[]) => {
    // We may want to send critical errors to a tracking service like Sentry in production
    // For now, we still log errors to console but structurally
    console.error(`[HustiQ ERROR]: ${message}`, error, ...data);
  },
  
  debug: (message: string, ...data: any[]) => {
    if (isProd) return;
    // Use console.debug which some browsers hide by default unless verbose is on
    console.debug(`[HustiQ DEBUG]: ${message}`, ...data);
  }
};
