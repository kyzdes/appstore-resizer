/**
 * Premium Button Component
 *
 * Features:
 * - Multiple variants (primary, secondary, ghost, destructive)
 * - Size variants (sm, md, lg)
 * - Loading states with spinner
 * - Icon support (left/right)
 * - Smooth hover/active animations
 * - Full accessibility support
 * - Keyboard navigation
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  // Base styles - applied to all buttons
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold',
    'rounded-lg',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'shadow-md hover:shadow-lg',
          'hover:bg-primary/90',
          'focus-visible:ring-primary',
          // Subtle gradient overlay for premium feel
          'before:absolute before:inset-0',
          'before:bg-gradient-to-b before:from-white/10 before:to-transparent',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'border border-border',
          'shadow-sm hover:shadow-md',
          'hover:bg-secondary/80',
          'focus-visible:ring-secondary',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-accent',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
          'shadow-md hover:shadow-lg',
          'hover:bg-destructive/90',
          'focus-visible:ring-destructive',
        ],
        outline: [
          'border-2 border-border bg-transparent',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-primary',
        ],
        link: [
          'text-primary underline-offset-4 hover:underline',
          'focus-visible:ring-primary',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Accessible label for icon-only buttons */
  ariaLabel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const isIconOnly = !children && (leftIcon || rightIcon);

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        aria-label={ariaLabel || (isIconOnly ? 'Button' : undefined)}
        aria-busy={loading}
        {...props}
      >
        {/* Loading spinner replaces left icon */}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon && (
            <span className="inline-flex shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}

        {/* Button content */}
        {children && <span className="truncate">{children}</span>}

        {/* Right icon (not replaced by loading spinner) */}
        {rightIcon && !loading && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Ripple effect container (premium micro-interaction) */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10"
          aria-hidden="true"
        />
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
