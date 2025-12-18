/**
 * Theme Hook
 *
 * Hook for accessing and managing theme
 */

import { useThemeContext } from '@/contexts/ThemeContext';

export const useTheme = () => {
  return useThemeContext();
};
