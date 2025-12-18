/**
 * Upload Screen Component
 *
 * Hero section with premium file upload zone
 * Features drag & drop, file previews, and validation
 */

import * as React from 'react';
import { Upload, ArrowRight } from 'lucide-react';
import { FileUpload } from '@/components/ui/FileUpload';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/lib/cn';

export interface UploadScreenProps {
  /** Current uploaded files */
  files: File[];
  /** Callback when files change */
  onFilesChange: (files: File[]) => void;
  /** Callback when continue is clicked */
  onContinue: () => void;
  /** Loading state */
  isValidating?: boolean;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  files,
  onFilesChange,
  onContinue,
  isValidating = false,
}) => {
  const { t } = useLocale();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4 animate-in zoom-in-95 duration-500">
          <Upload className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {t('upload.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('upload.subtitle')}
        </p>
      </div>

      {/* Upload Card */}
      <Card variant="elevated" className="animate-in fade-in-0 slide-in-from-bottom-6 duration-700">
        <CardContent className="p-8">
          <FileUpload
            files={files}
            onFilesChange={onFilesChange}
            maxFiles={10}
            maxSize={10 * 1024 * 1024}
            accept="image/jpeg,image/png,image/webp"
            showPreviews={true}
          />
        </CardContent>
      </Card>

      {/* Continue Button */}
      {files.length > 0 && (
        <div
          className={cn(
            'flex justify-center',
            'animate-in fade-in-0 slide-in-from-bottom-8 duration-1000'
          )}
        >
          <Button
            size="lg"
            onClick={onContinue}
            disabled={isValidating}
            loading={isValidating}
            rightIcon={<ArrowRight className="h-5 w-5" />}
            className="px-8"
          >
            {t('common.continue')} ({files.length})
          </Button>
        </div>
      )}

      {/* Features List */}
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8',
          'animate-in fade-in-0 duration-1000 delay-300'
        )}
      >
        {[
          {
            icon: '🎯',
            titleKey: 'upload.features.allResolutions.title',
            descriptionKey: 'upload.features.allResolutions.description',
          },
          {
            icon: '⚡',
            titleKey: 'upload.features.fastProcessing.title',
            descriptionKey: 'upload.features.fastProcessing.description',
          },
          {
            icon: '🔒',
            titleKey: 'upload.features.privateSecure.title',
            descriptionKey: 'upload.features.privateSecure.description',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col items-center text-center p-4 rounded-lg',
              'bg-accent/50 border border-border',
              'transition-all duration-300 hover:bg-accent hover:scale-105'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-3xl mb-2">{feature.icon}</span>
            <h3 className="font-semibold mb-1">{t(feature.titleKey)}</h3>
            <p className="text-sm text-muted-foreground">{t(feature.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
