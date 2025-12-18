/**
 * Toast Context Provider
 *
 * Manages toast notifications with stacking, auto-dismiss, and animations
 */

import * as React from 'react';
import { Toast as ToastType } from '@/types';
import { Toast, ToastContainer } from '@/components/ui/Toast';

interface ToastContextType {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => string;
  removeToast: (id: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Maximum number of toasts to show */
  maxToasts?: number;
  /** Default toast duration (ms) */
  defaultDuration?: number;
  /** Toast position */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 3,
  defaultDuration = 5000,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<ToastType, 'id'>): string => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastType = {
        ...toast,
        id,
        duration: toast.duration ?? defaultDuration,
      };

      setToasts((prev) => {
        // Remove oldest toast if max limit reached
        const toastsToKeep = prev.slice(-(maxToasts - 1));
        return [...toastsToKeep, newToast];
      });

      return id;
    },
    [maxToasts, defaultDuration]
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Helper methods for different toast types
  const success = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'success', title, description });
    },
    [addToast]
  );

  const error = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'error', title, description });
    },
    [addToast]
  );

  const warning = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'warning', title, description });
    },
    [addToast]
  );

  const info = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'info', title, description });
    },
    [addToast]
  );

  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      success,
      error,
      warning,
      info,
    }),
    [toasts, addToast, removeToast, success, error, warning, info]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position={position}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.type}
            title={toast.title}
            description={toast.description}
            duration={toast.duration}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};
