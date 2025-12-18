/**
 * Premium Modal/Dialog Component
 *
 * Features:
 * - Smooth backdrop blur and fade animations
 * - Click outside to close
 * - ESC key to close
 * - Focus trap
 * - Body scroll lock
 * - Flexible content with Header, Body, Footer
 * - Multiple size variants
 * - Full accessibility (ARIA, focus management)
 */

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ModalProps {
  /** Is the modal open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Prevent closing on backdrop click */
  preventBackdropClose?: boolean;
  /** Prevent closing on ESC key */
  preventEscapeClose?: boolean;
  /** Custom class name for content */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  size = 'md',
  showCloseButton = true,
  preventBackdropClose = false,
  preventEscapeClose = false,
  className,
}) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  // Handle ESC key
  React.useEffect(() => {
    if (!open || preventEscapeClose) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose, preventEscapeClose]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = '';
      setIsAnimating(false);
      // Restore focus to previously focused element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap
  React.useEffect(() => {
    if (!open || !contentRef.current) return;

    const content = contentRef.current;
    const focusableElements = content.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when modal opens
    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    content.addEventListener('keydown', handleTab);
    return () => content.removeEventListener('keydown', handleTab);
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (preventBackdropClose) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open && !isAnimating) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl mx-4',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'animate-in fade-in-0 duration-200',
        !open && 'animate-out fade-out-0 duration-200'
      )}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={contentRef}
        className={cn(
          'relative w-full rounded-xl',
          'bg-card border border-border',
          'shadow-2xl',
          'animate-in zoom-in-95 slide-in-from-bottom-4 duration-200',
          !open && 'animate-out zoom-out-95 slide-out-to-bottom-4 duration-200',
          sizeClasses[size],
          className
        )}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className={cn(
              'absolute right-4 top-4 z-10',
              'rounded-md p-1.5',
              'text-muted-foreground hover:text-foreground',
              'hover:bg-accent',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-ring'
            )}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

// Modal Header
export const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('px-6 pt-6 pb-4 border-b border-border', className)}
    {...props}
  >
    {children}
  </div>
);

ModalHeader.displayName = 'ModalHeader';

// Modal Title
export const ModalTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h2
    className={cn('text-2xl font-semibold leading-tight', className)}
    {...props}
  >
    {children}
  </h2>
);

ModalTitle.displayName = 'ModalTitle';

// Modal Description
export const ModalDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p
    className={cn('text-sm text-muted-foreground mt-2', className)}
    {...props}
  >
    {children}
  </p>
);

ModalDescription.displayName = 'ModalDescription';

// Modal Body
export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
);

ModalBody.displayName = 'ModalBody';

// Modal Footer
export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'px-6 py-4 border-t border-border',
      'flex items-center justify-end gap-3',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

ModalFooter.displayName = 'ModalFooter';
