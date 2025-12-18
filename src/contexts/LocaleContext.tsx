/**
 * Locale Context Provider
 *
 * Manages application language (en/ru) with translation support
 * Persists language preference to localStorage
 */

import * as React from 'react';
import { Language } from '@/types';
import { en, Translation } from '@/locales/en';
import { ru } from '@/locales/ru';

interface LocaleContextType {
  locale: Language;
  setLocale: (locale: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  translations: Translation;
}

const LocaleContext = React.createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = 'app-locale';

const translations: Record<Language, Translation> = {
  en,
  ru,
};

export interface LocaleProviderProps {
  children: React.ReactNode;
  defaultLocale?: Language;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  defaultLocale = 'en',
}) => {
  const [locale, setLocaleState] = React.useState<Language>(() => {
    // Load locale from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      return stored || defaultLocale;
    }
    return defaultLocale;
  });

  const setLocale = React.useCallback((newLocale: Language) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);

    // Update document language
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  }, []);

  // Set initial document language
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  /**
   * Translation function with nested key support and parameter interpolation
   *
   * Examples:
   * t('app.title') -> 'App Store Resizer'
   * t('upload.filesSelected', { count: 5 }) -> '5 file(s) selected'
   */
  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const keys = key.split('.');
      let value: any = translations[locale];

      // Navigate through nested keys
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      // Interpolate parameters
      if (typeof value === 'string' && params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return paramKey in params ? String(params[paramKey]) : match;
        });
      }

      return typeof value === 'string' ? value : key;
    },
    [locale]
  );

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      t,
      translations: translations[locale],
    }),
    [locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocaleContext = () => {
  const context = React.useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within LocaleProvider');
  }
  return context;
};
