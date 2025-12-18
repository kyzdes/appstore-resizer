/**
 * Premium Footer Component
 *
 * Features:
 * - Minimal, professional design
 * - Copyright info
 * - Version number
 * - Social/contact links
 * - Responsive layout
 */

import * as React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLocale } from '@/hooks/useLocale';

export interface FooterProps {
  /** Custom class name */
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useLocale();

  return (
    <footer
      className={cn(
        'w-full border-t border-border/40 mt-auto',
        'bg-background/50',
        className
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* ProductOwner Link */}
          <a
            href="https://productowner.me"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-sm font-medium text-primary hover:text-primary/80',
              'transition-colors duration-200',
              'flex items-center gap-2',
              'group'
            )}
          >
            <span>{t('footer.author')}</span>
            <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
};
