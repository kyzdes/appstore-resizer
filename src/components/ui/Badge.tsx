/**
 * Premium Badge Component
 *
 * Features:
 * - Multiple variants (default, primary, success, warning, error)
 * - Size variants
 * - Icon support
 * - Removable/dismissible option
 * - Smooth animations
 * - Dot indicator option
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 font-medium',
    'rounded-full transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground border border-border',
        primary: 'bg-primary/10 text-primary border border-primary/20',
        success: 'bg-success/10 text-success border border-success/20',
        warning: 'bg-warning/10 text-warning-foreground border border-warning/20',
        error: 'bg-destructive/10 text-destructive border border-destructive/20',
        outline: 'border-2 border-border text-foreground bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Show a dot indicator */
  dot?: boolean;
  /** Make badge removable with X button */
  removable?: boolean;
  /** Callback when badge is removed */
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      dot,
      removable,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const [isRemoving, setIsRemoving] = React.useState(false);

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsRemoving(true);
      setTimeout(() => {
        onRemove?.();
      }, 200); // Wait for exit animation
    };

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          isRemoving && 'animate-out fade-out-0 zoom-out-95 duration-200',
          className
        )}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              {
                'bg-secondary-foreground': variant === 'default',
                'bg-primary': variant === 'primary',
                'bg-success': variant === 'success',
                'bg-warning': variant === 'warning',
                'bg-destructive': variant === 'error',
                'bg-foreground': variant === 'outline',
              }
            )}
            aria-hidden="true"
          />
        )}

        {/* Icon */}
        {icon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Content */}
        {children && <span className="truncate">{children}</span>}

        {/* Remove button */}
        {removable && (
          <button
            onClick={handleRemove}
            className={cn(
              'inline-flex shrink-0 rounded-full',
              'hover:bg-black/10 dark:hover:bg-white/10',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-1 focus:ring-ring'
            )}
            aria-label="Remove"
            type="button"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
