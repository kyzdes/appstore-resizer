/**
 * Premium Progress Component
 *
 * Features:
 * - Smooth animated progress bar
 * - Percentage display
 * - Multiple variants (default, success, error)
 * - Circular progress option
 * - Indeterminate loading state
 * - Status text support
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const progressVariants = cva('relative overflow-hidden rounded-full', {
  variants: {
    variant: {
      default: 'bg-secondary',
      success: 'bg-success/10',
      error: 'bg-destructive/10',
      warning: 'bg-warning/10',
    },
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const progressBarVariants = cva(
  [
    'h-full transition-all duration-500 ease-out rounded-full',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-success',
        error: 'bg-destructive',
        warning: 'bg-warning',
      },
      animated: {
        true: [
          // Shimmer effect for premium feel
          'after:absolute after:inset-0',
          'after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent',
          'after:animate-shimmer',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: true,
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Status text to display below bar */
  statusText?: string;
  /** Indeterminate state (animated loading) */
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant,
      size,
      value = 0,
      max = 100,
      showPercentage = false,
      statusText,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className="w-full space-y-2" {...props}>
        {/* Progress bar with optional percentage */}
        <div className="flex items-center gap-3">
          <div
            className={cn(progressVariants({ variant, size, className }), 'flex-1')}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={statusText || 'Progress'}
          >
            {indeterminate ? (
              // Indeterminate animation
              <div
                className={cn(
                  progressBarVariants({ variant }),
                  'w-1/3 animate-indeterminate'
                )}
              />
            ) : (
              // Determinate progress
              <div
                className={cn(progressBarVariants({ variant, animated: true }))}
                style={{ width: `${percentage}%` }}
              />
            )}
          </div>

          {/* Optional percentage display */}
          {showPercentage && !indeterminate && (
            <span className="text-sm font-medium text-muted-foreground tabular-nums min-w-[3ch]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>

        {/* Optional status text */}
        {statusText && (
          <p className="text-xs text-muted-foreground text-center">
            {statusText}
          </p>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// Circular Progress Component
export interface CircularProgressProps extends Omit<VariantProps<typeof progressVariants>, 'size'> {
  /** Progress value (0-100) */
  value?: number;
  /** Size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show percentage in center */
  showPercentage?: boolean;
  /** Class name */
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  variant = 'default',
  value = 0,
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
  className,
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    default: 'text-primary',
    success: 'text-success',
    error: 'text-destructive',
    warning: 'text-warning',
  };

  return (
    <div className={cn('relative inline-flex', className)} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={cn(colorMap[variant || 'default'], 'transition-all duration-500 ease-out')}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      {/* Percentage text in center */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold tabular-nums">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

CircularProgress.displayName = 'CircularProgress';

export { Progress, CircularProgress, progressVariants };
