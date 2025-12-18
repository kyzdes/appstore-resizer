/**
 * Processing Screen Component
 *
 * Beautiful progress indicators with status updates
 * Shows current processing stage, image, and resolution
 */

import * as React from 'react';
import { Loader2, Image as ImageIcon, Archive, CheckCircle2 } from 'lucide-react';
import { ProcessingStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Progress, CircularProgress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/lib/cn';

export interface ProcessingScreenProps {
  /** Current processing status */
  status: ProcessingStatus;
}

const stageIcons = {
  preparing: Loader2,
  resizing: ImageIcon,
  archiving: Archive,
  complete: CheckCircle2,
};

const stageColors = {
  preparing: 'default',
  resizing: 'default',
  archiving: 'default',
  complete: 'success',
} as const;

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ status }) => {
  const { t } = useLocale();

  const StageIcon = stageIcons[status.stage];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in-0 zoom-in-95 duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <div
          className={cn(
            'inline-flex h-20 w-20 items-center justify-center rounded-2xl mb-4',
            'bg-primary/10 animate-pulse'
          )}
        >
          <StageIcon
            className={cn(
              'h-10 w-10 text-primary',
              status.stage === 'preparing' && 'animate-spin',
              status.stage === 'complete' && 'animate-in zoom-in-75 duration-300'
            )}
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{t('processing.title')}</h1>
        <p className="text-lg text-muted-foreground">{t('processing.subtitle')}</p>
      </div>

      {/* Main Progress Card */}
      <Card variant="elevated">
        <CardContent className="p-8 space-y-6">
          {/* Circular Progress */}
          <div className="flex justify-center">
            <CircularProgress
              value={status.percentage}
              size={160}
              strokeWidth={12}
              variant={stageColors[status.stage]}
              showPercentage={true}
            />
          </div>

          {/* Stage Badge */}
          <div className="flex justify-center">
            <Badge variant="primary" size="lg" icon={<StageIcon className="h-4 w-4" />}>
              {t(`processing.stages.${status.stage}`)}
            </Badge>
          </div>

          {/* Linear Progress */}
          <Progress
            value={status.percentage}
            variant={stageColors[status.stage]}
            size="lg"
            showPercentage={true}
            statusText={t('processing.status', {
              current: status.current,
              total: status.total,
            })}
          />

          {/* Processing Details */}
          {status.stage === 'resizing' && (
            <div
              className={cn(
                'space-y-3 p-4 rounded-lg',
                'bg-accent/50 border border-border',
                'animate-in fade-in-0 slide-in-from-bottom-2 duration-300'
              )}
            >
              <div className="text-sm text-muted-foreground">
                {t('processing.currentImage', { filename: status.currentImage })}
              </div>
              <div className="text-sm font-mono font-medium">
                {t('processing.currentResolution', { resolution: status.currentResolution })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stage Progress Indicators */}
      <div className="grid grid-cols-4 gap-3">
        {(['preparing', 'resizing', 'archiving', 'complete'] as const).map((stage) => {
          const Icon = stageIcons[stage];
          const isActive = status.stage === stage;
          const isComplete =
            ['preparing', 'resizing', 'archiving', 'complete'].indexOf(status.stage) >
            ['preparing', 'resizing', 'archiving', 'complete'].indexOf(stage);

          return (
            <div
              key={stage}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg',
                'border transition-all duration-300',
                isActive && 'border-primary bg-primary/5 scale-105',
                isComplete && 'border-success bg-success/5',
                !isActive && !isComplete && 'border-border bg-accent/30'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  'transition-all duration-300',
                  isActive && 'bg-primary text-primary-foreground animate-pulse',
                  isComplete && 'bg-success text-success-foreground',
                  !isActive && !isComplete && 'bg-muted text-muted-foreground'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5',
                    isActive && stage === 'preparing' && 'animate-spin'
                  )}
                />
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center',
                  isActive && 'text-primary',
                  isComplete && 'text-success',
                  !isActive && !isComplete && 'text-muted-foreground'
                )}
              >
                {t(`processing.stages.${stage}`)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
