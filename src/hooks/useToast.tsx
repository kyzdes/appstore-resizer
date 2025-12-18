/**
 * Toast Hook
 *
 * Hook for showing toast notifications
 */

import { useToastContext } from '@/contexts/ToastContext';

export const useToast = () => {
  return useToastContext();
};
