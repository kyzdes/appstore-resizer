/**
 * Locale Hook
 *
 * Hook for accessing translations and managing language
 */

import { useLocaleContext } from '@/contexts/LocaleContext';

export const useLocale = () => {
  return useLocaleContext();
};
