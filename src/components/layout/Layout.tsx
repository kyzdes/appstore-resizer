/**
 * Premium Layout Component
 *
 * Features:
 * - Main app wrapper with header and footer
 * - Flexible content area
 * - Responsive container
 * - Smooth transitions
 * - Background effects
 */

import * as React from 'react';
import { cn } from '@/lib/cn';
import { Header } from './Header';
import { Footer } from './Footer';

export interface LayoutProps {
  /** Main content */
  children: React.ReactNode;
  /** Callback when settings is clicked */
  onSettingsClick?: () => void;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;
  /** Custom class name */
  className?: string;
  /** Show footer */
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onSettingsClick,
  onLogoClick,
  className,
  showFooter = true,
}) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradient orbs for premium feel */}
        <div
          className={cn(
            'absolute -top-1/2 -left-1/2 w-full h-full',
            'bg-gradient-to-br from-primary/5 via-transparent to-transparent',
            'rounded-full blur-3xl',
            'animate-pulse-slow'
          )}
        />
        <div
          className={cn(
            'absolute -bottom-1/2 -right-1/2 w-full h-full',
            'bg-gradient-to-tl from-primary/5 via-transparent to-transparent',
            'rounded-full blur-3xl',
            'animate-pulse-slow',
            'animation-delay-2000'
          )}
        />
      </div>

      {/* Header */}
      <Header onSettingsClick={onSettingsClick} onLogoClick={onLogoClick} />

      {/* Main content */}
      <main
        className={cn(
          'flex-1 w-full',
          'transition-all duration-300',
          className
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};
