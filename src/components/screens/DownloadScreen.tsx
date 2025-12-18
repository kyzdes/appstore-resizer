/**
 * Download Screen Component
 *
 * Success state with download button and statistics
 * Shows processing results and allows starting over
 */

import * as React from 'react';
import { Download, CheckCircle2, Image, Grid, FileArchive, RotateCcw } from 'lucide-react';
import { ProcessedResult } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useLocale } from '@/hooks/useLocale';
import { formatFileSize } from '@/utils/formatters';
import { cn } from '@/lib/cn';

export interface DownloadScreenProps {
  /** Processing result */
  result: ProcessedResult;
  /** Callback when download is clicked */
  onDownload: () => void;
  /** Callback when start over is clicked */
  onStartOver: () => void;
  /** Is download in progress */
  isDownloading?: boolean;
}

export const DownloadScreen: React.FC<DownloadScreenProps> = ({
  result,
  onDownload,
  onStartOver,
  isDownloading = false,
}) => {
  const { t } = useLocale();

  const stats = [
    {
      icon: Image,
      label: t('download.stats.totalImages'),
      value: result.totalImages.toString(),
      color: 'text-primary',
    },
    {
      icon: Grid,
      label: t('download.stats.totalResolutions'),
      value: result.totalResolutions.toString(),
      color: 'text-success',
    },
    {
      icon: FileArchive,
      label: t('download.stats.fileSize'),
      value: formatFileSize(result.fileSize),
      color: 'text-warning',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in-0 zoom-in-95 duration-500">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div
          className={cn(
            'inline-flex h-20 w-20 items-center justify-center rounded-full mb-4',
            'bg-success/10 animate-in zoom-in-95 duration-500'
          )}
        >
          <CheckCircle2 className="h-10 w-10 text-success animate-in zoom-in-75 duration-700 delay-200" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-success">
          {t('download.title')}
        </h1>
        <p className="text-lg text-muted-foreground">{t('download.subtitle')}</p>
      </div>

      {/* Stats Card */}
      <Card variant="elevated">
        <CardContent className="p-8 space-y-6">
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={cn(
                    'flex flex-col items-center text-center space-y-3',
                    'animate-in fade-in-0 slide-in-from-bottom-4 duration-500'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-xl',
                      'bg-accent border border-border'
                    )}
                  >
                    <Icon className={cn('h-7 w-7', stat.color)} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Files Badge */}
          <div className="flex justify-center pt-4">
            <Badge variant="success" size="lg">
              {result.totalImages * result.totalResolutions} total files created
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Download Card */}
      <Card variant="glass" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Download Icon */}
            <div className="relative">
              <div
                className={cn(
                  'absolute inset-0 bg-primary/20 rounded-full blur-2xl',
                  'animate-pulse'
                )}
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Download className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Download Text */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Your ZIP file is ready</h2>
              <p className="text-sm text-muted-foreground">
                Click below to download all processed screenshots
              </p>
            </div>

            {/* Download Button */}
            <Button
              size="lg"
              onClick={onDownload}
              loading={isDownloading}
              leftIcon={<Download className="h-5 w-5" />}
              className="w-full sm:w-auto px-12"
            >
              {isDownloading ? t('download.downloadingButton') : t('download.button')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Start Over Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={onStartOver}
          leftIcon={<RotateCcw className="h-5 w-5" />}
        >
          {t('download.startOver')}
        </Button>
      </div>

      {/* Success Animation */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute w-2 h-2 bg-success rounded-full',
              'animate-in fade-in-0 zoom-in-0 duration-1000'
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 500}ms`,
              opacity: Math.random() * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};
