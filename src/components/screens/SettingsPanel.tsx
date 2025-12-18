/**
 * Settings Panel Component
 *
 * Theme and language settings in a modal dialog
 */

import * as React from 'react';
import { Sun, Moon, Monitor, Globe, Image, RotateCw } from 'lucide-react';
import { Theme, Language } from '@/types';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/hooks/useLocale';
import { useTheme } from '@/hooks/useTheme';
import { useImageSettings } from '@/hooks/useImageSettings';
import { cn } from '@/lib/cn';

export interface SettingsPanelProps {
  /** Is the settings panel open */
  open: boolean;
  /** Callback when panel should close */
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ open, onClose }) => {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const { settings, updateSettings, resetSettings } = useImageSettings();

  const themeOptions: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
    { value: 'light', label: t('settings.theme.light'), icon: <Sun className="h-5 w-5" /> },
    { value: 'dark', label: t('settings.theme.dark'), icon: <Moon className="h-5 w-5" /> },
    { value: 'system', label: t('settings.theme.system'), icon: <Monitor className="h-5 w-5" /> },
  ];

  const languageOptions: Array<{ value: Language; label: string; flag: string }> = [
    { value: 'en', label: t('settings.language.en'), flag: '🇺🇸' },
    { value: 'ru', label: t('settings.language.ru'), flag: '🇷🇺' },
  ];

  return (
    <Modal open={open} onClose={onClose} size="md">
      <ModalHeader>
        <ModalTitle>{t('settings.title')}</ModalTitle>
      </ModalHeader>

      <ModalBody className="space-y-6">
        {/* Theme Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">{t('settings.theme.title')}</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  'flex flex-col items-center gap-3 p-4 rounded-lg',
                  'border-2 transition-all duration-200',
                  'hover:bg-accent',
                  theme === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                )}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    'transition-all duration-200',
                    theme === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-muted-foreground'
                  )}
                >
                  {option.icon}
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">{t('settings.language.title')}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLocale(option.value)}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg',
                  'border-2 transition-all duration-200',
                  'hover:bg-accent',
                  locale === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                )}
              >
                <span className="text-3xl">{option.flag}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Quality Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">{t('settings.imageQuality.title')}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSettings}
              className="text-xs"
            >
              <RotateCw className="h-3 w-3 mr-1" />
              {t('settings.imageQuality.reset')}
            </Button>
          </div>

          <div className="space-y-4">
            {/* JPEG Quality Slider */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>{t('settings.imageQuality.jpegQuality')}</span>
                <span className="text-muted-foreground">{settings.jpegQuality}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.jpegQuality}
                onChange={(e) => updateSettings({ jpegQuality: parseInt(e.target.value) })}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground">
                {t('settings.imageQuality.jpegDescription')}
              </p>
            </div>

            {/* PNG Compression */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>{t('settings.imageQuality.pngCompression')}</span>
                <span className="text-muted-foreground">{settings.pngCompression}</span>
              </label>
              <input
                type="range"
                min="0"
                max="9"
                value={settings.pngCompression}
                onChange={(e) => updateSettings({ pngCompression: parseInt(e.target.value) })}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground">
                {t('settings.imageQuality.pngDescription')}
              </p>
            </div>

            {/* Fill Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t('settings.imageQuality.fillMode')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['contain', 'cover', 'stretch'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateSettings({ fillMode: mode })}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium',
                      'border-2 transition-all duration-200',
                      settings.fillMode === mode
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:bg-accent'
                    )}
                  >
                    {t(`settings.imageQuality.fillModes.${mode}`)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {t('settings.imageQuality.fillModeDescription')}
              </p>
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t('settings.imageQuality.backgroundColor')}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                  className="h-10 w-20 rounded-md cursor-pointer border-2 border-border"
                />
                <input
                  type="text"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                  placeholder="#FFFFFF"
                  className="flex-1 h-10 px-3 rounded-md border-2 border-border bg-background text-sm font-mono"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {t('settings.imageQuality.backgroundDescription')}
              </p>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="primary" onClick={onClose}>
          {t('common.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
