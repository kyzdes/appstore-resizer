/**
 * Premium Toast Notification Component
 *
 * Features:
 * - Multiple variants (success, error, warning, info)
 * - Smooth enter/exit animations
 * - Auto-dismiss with progress indicator
 * - Manual dismiss
 * - Icon support
 * - Accessible (ARIA live regions)
 * - Stacking support
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/cn';

const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-start gap-3',
    'overflow-hidden rounded-lg border p-4 pr-8 shadow-lg',
    'transition-all duration-300 ease-out',
    'animate-in slide-in-from-right-full',
    'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full',
  ],
  {
    variants: {
      variant: {
        default: 'bg-card border-border',
        success: 'bg-success/90 border-success text-success-foreground',
        error: 'bg-destructive/90 border-destructive text-destructive-foreground',
        warning: 'bg-warning/90 border-warning text-warning-foreground',
        info: 'bg-primary/90 border-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  default: Info,
};

const iconColorMap = {
  success: 'text-success',
  error: 'text-destructive',
  warning: 'text-warning',
  info: 'text-primary',
  default: 'text-muted-foreground',
};

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /** Toast title */
  title: string;
  /** Toast description */
  description?: string;
  /** Duration before auto-dismiss (ms), 0 to disable */
  duration?: number;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Show progress indicator */
  showProgress?: boolean;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      duration = 5000,
      onDismiss,
      showProgress = true,
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = React.useState(100);
    const [state, setState] = React.useState<'open' | 'closed'>('open');

    const Icon = iconMap[variant || 'default'];
    const iconColor = iconColorMap[variant || 'default'];

    React.useEffect(() => {
      if (duration === 0) return;

      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);

        setProgress(remaining);

        if (remaining === 0) {
          setState('closed');
          setTimeout(() => {
            onDismiss?.();
          }, 300); // Wait for exit animation
        }
      }, 50);

      return () => clearInterval(timer);
    }, [duration, onDismiss]);

    const handleDismiss = () => {
      setState('closed');
      setTimeout(() => {
        onDismiss?.();
      }, 300);
    };

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, className }))}
        data-state={state}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {/* Icon */}
        <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconColor)} aria-hidden="true" />

        {/* Content */}
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-tight">{title}</p>
          {description && (
            <p className="text-sm leading-tight">{description}</p>
          )}
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className={cn(
            'absolute right-2 top-2 rounded-md p-1',
            'opacity-0 transition-opacity group-hover:opacity-100',
            'hover:bg-black/5 dark:hover:bg-white/5',
            'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring'
          )}
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Progress indicator */}
        {showProgress && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10">
            <div
              className={cn(
                'h-full transition-all duration-50 ease-linear',
                {
                  'bg-success': variant === 'success',
                  'bg-destructive': variant === 'error',
                  'bg-warning': variant === 'warning',
                  'bg-primary': variant === 'info',
                  'bg-foreground': variant === 'default',
                }
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast Container for managing multiple toasts
export interface ToastContainerProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = 'top-right',
  className,
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={cn(
        'fixed z-toast flex flex-col gap-2 w-full max-w-md pointer-events-none',
        positionClasses[position],
        className
      )}
      aria-live="polite"
      aria-label="Notifications"
    >
      {children}
    </div>
  );
};

ToastContainer.displayName = 'ToastContainer';

export { Toast, ToastContainer, toastVariants };
