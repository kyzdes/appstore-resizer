/**
 * Premium Header Component
 *
 * Features:
 * - Logo and branding
 * - Theme toggle with smooth transitions
 * - Language selector
 * - Settings button
 * - Responsive design
 * - Glass morphism effect
 */

import * as React from 'react';
import { Settings, Moon, Sun, Globe } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useLocale } from '@/hooks/useLocale';

export interface HeaderProps {
  /** Callback when settings is clicked */
  onSettingsClick?: () => void;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;
  /** Custom class name */
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSettingsClick,
  onLogoClick,
  className,
}) => {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ru' : 'en');
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        'border-b border-border/40',
        'bg-background/80 backdrop-blur-xl',
        'transition-colors duration-300',
        className
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and title */}
          <div
            className={cn(
              'flex items-center gap-3',
              onLogoClick && 'cursor-pointer group'
            )}
            onClick={onLogoClick}
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center',
                'rounded-xl bg-gradient-to-br from-primary to-primary/80',
                'shadow-lg shadow-primary/25',
                'transition-transform duration-300',
                onLogoClick && 'group-hover:scale-105'
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-primary-foreground"
                aria-hidden="true"
              >
                <path
                  d="M4 6h16v12H4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 2v4M15 2v4M4 10h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h1 className={cn(
                'text-lg font-bold leading-tight',
                onLogoClick && 'group-hover:text-primary transition-colors duration-200'
              )}>
                {t('app.title')}
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLocale}
              ariaLabel={t('header.changeLanguage')}
              className="relative"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold px-1 py-0.5 rounded bg-primary/10 text-primary">
                {locale.toUpperCase()}
              </span>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              ariaLabel={t('header.toggleTheme')}
              className="relative"
            >
              {/* Sun icon - visible in light mode */}
              <Sun
                className={cn(
                  'h-5 w-5 transition-opacity duration-200',
                  theme === 'dark' ? 'opacity-0 absolute' : 'opacity-100'
                )}
              />
              {/* Moon icon - visible in dark mode */}
              <Moon
                className={cn(
                  'h-5 w-5 transition-opacity duration-200',
                  theme === 'dark' ? 'opacity-100' : 'opacity-0 absolute'
                )}
              />
            </Button>

            {/* Settings button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsClick}
              ariaLabel={t('header.settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
