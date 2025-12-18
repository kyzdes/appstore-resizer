/**
 * Image Settings Context
 *
 * Manages user preferences for image processing quality and options
 * Settings are persisted to localStorage
 */

import * as React from 'react';

export interface ImageSettings {
  /** JPEG quality (0-100) */
  jpegQuality: number;
  /** PNG compression level (0-9, where 0 is no compression) */
  pngCompression: number;
  /** How image should fill target dimensions */
  fillMode: 'contain' | 'cover' | 'stretch';
  /** Background color for contain mode and JPEG */
  backgroundColor: string;
}

interface ImageSettingsContextValue {
  settings: ImageSettings;
  updateSettings: (settings: Partial<ImageSettings>) => void;
  resetSettings: () => void;
}

const STORAGE_KEY = 'appstore-resizer-image-settings';

const defaultSettings: ImageSettings = {
  jpegQuality: 92,
  pngCompression: 6,
  fillMode: 'contain',
  backgroundColor: '#FFFFFF',
};

const ImageSettingsContext = React.createContext<ImageSettingsContextValue | undefined>(
  undefined
);

export interface ImageSettingsProviderProps {
  children: React.ReactNode;
  /** Initial settings (for testing) */
  initialSettings?: Partial<ImageSettings>;
}

export function ImageSettingsProvider({
  children,
  initialSettings,
}: ImageSettingsProviderProps) {
  const [settings, setSettings] = React.useState<ImageSettings>(() => {
    // Load from localStorage or use defaults
    if (initialSettings) {
      return { ...defaultSettings, ...initialSettings };
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultSettings, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load image settings from localStorage:', error);
    }

    return defaultSettings;
  });

  const updateSettings = React.useCallback((updates: Partial<ImageSettings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };

      // Validate ranges
      if (newSettings.jpegQuality < 0 || newSettings.jpegQuality > 100) {
        newSettings.jpegQuality = defaultSettings.jpegQuality;
      }
      if (newSettings.pngCompression < 0 || newSettings.pngCompression > 9) {
        newSettings.pngCompression = defaultSettings.pngCompression;
      }

      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      } catch (error) {
        console.error('Failed to save image settings to localStorage:', error);
      }

      return newSettings;
    });
  }, []);

  const resetSettings = React.useCallback(() => {
    setSettings(defaultSettings);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove image settings from localStorage:', error);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      settings,
      updateSettings,
      resetSettings,
    }),
    [settings, updateSettings, resetSettings]
  );

  return (
    <ImageSettingsContext.Provider value={value}>{children}</ImageSettingsContext.Provider>
  );
}

export function useImageSettings(): ImageSettingsContextValue {
  const context = React.useContext(ImageSettingsContext);
  if (!context) {
    throw new Error('useImageSettings must be used within ImageSettingsProvider');
  }
  return context;
}
