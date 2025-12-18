/**
 * Premium Checkbox Component
 *
 * Features:
 * - Smooth animations
 * - Indeterminate state support
 * - Custom check icon
 * - Hover and focus states
 * - Full accessibility (ARIA)
 * - Label integration
 * - Disabled state
 */

import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Checked state */
  checked?: boolean;
  /** Indeterminate state (overrides checked) */
  indeterminate?: boolean;
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Error state */
  error?: boolean;
  /** Helper text or error message */
  helperText?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked = false,
      indeterminate = false,
      disabled = false,
      onCheckedChange,
      onChange,
      label,
      description,
      error = false,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    // Sync indeterminate state with DOM
    React.useEffect(() => {
      const input = inputRef.current;
      if (input) {
        input.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const isChecked = indeterminate || checked;

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label
          htmlFor={checkboxId}
          className={cn(
            'flex items-start gap-3 group',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          )}
        >
          {/* Hidden native checkbox for accessibility */}
          <input
            ref={(node) => {
              // @ts-ignore - Handle both internal and forwarded refs
              inputRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref && 'current' in ref) {
                // @ts-ignore - Assign to forwarded ref
                ref.current = node;
              }
            }}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only peer"
            aria-describedby={helperText ? `${checkboxId}-helper` : undefined}
            aria-invalid={error}
            {...props}
          />

          {/* Custom checkbox visual */}
          <div
            className={cn(
              'relative shrink-0 mt-0.5',
              'h-5 w-5 rounded-md',
              'border-2 transition-all duration-200 ease-out',
              'flex items-center justify-center',
              // Default state
              'border-input bg-background',
              // Hover state
              !disabled && 'group-hover:border-primary/50 group-hover:bg-accent/50',
              // Focus state
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
              // Checked state
              isChecked && [
                'border-primary bg-primary',
                'shadow-sm',
              ],
              // Error state
              error && 'border-destructive',
              // Disabled state
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Check icon with smooth animation */}
            {isChecked && (
              <div
                className={cn(
                  'text-primary-foreground',
                  'animate-in zoom-in-75 duration-200'
                )}
              >
                {indeterminate ? (
                  <Minus className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                ) : (
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                )}
              </div>
            )}
          </div>

          {/* Label and description */}
          {(label || description) && (
            <div className="flex-1 space-y-0.5 pt-0.5">
              {label && (
                <span
                  className={cn(
                    'text-sm font-medium leading-none',
                    error && 'text-destructive'
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <p className="text-sm text-muted-foreground leading-snug">
                  {description}
                </p>
              )}
            </div>
          )}
        </label>

        {/* Helper text or error message */}
        {helperText && (
          <p
            id={`${checkboxId}-helper`}
            className={cn(
              'text-xs ml-8',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
