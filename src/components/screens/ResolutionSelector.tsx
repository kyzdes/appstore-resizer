/**
 * Resolution Selector Component
 *
 * Elegant device/resolution picker with visual previews
 * Features filtering, selection, and visual device representations
 */

import * as React from 'react';
import { Smartphone, Tablet, Watch, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { Resolution, DeviceType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { Select, SelectOption } from '@/components/ui/Select';
import { useLocale } from '@/hooks/useLocale';
import { formatDimensions } from '@/utils/formatters';
import { cn } from '@/lib/cn';

export interface ResolutionSelectorProps {
  /** Available resolutions */
  resolutions: Resolution[];
  /** Selected resolutions */
  selectedResolutions: Resolution[];
  /** Callback when selection changes */
  onSelectionChange: (resolutions: Resolution[]) => void;
  /** Device filter */
  deviceFilter: DeviceType | 'all';
  /** Orientation filter */
  orientationFilter: 'all' | 'portrait' | 'landscape';
  /** Callbacks for filters */
  onDeviceFilterChange: (filter: DeviceType | 'all') => void;
  onOrientationFilterChange: (filter: 'all' | 'portrait' | 'landscape') => void;
  /** Callbacks for actions */
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBack: () => void;
  onContinue: () => void;
}

const deviceIcons: Record<string, React.ReactNode> = {
  iPhone: <Smartphone className="h-5 w-5" />,
  iPad: <Tablet className="h-5 w-5" />,
  'Apple Watch': <Watch className="h-5 w-5" />,
};

export const ResolutionSelector: React.FC<ResolutionSelectorProps> = ({
  resolutions,
  selectedResolutions,
  onSelectionChange,
  deviceFilter,
  orientationFilter,
  onDeviceFilterChange,
  onOrientationFilterChange,
  onSelectAll,
  onDeselectAll,
  onBack,
  onContinue,
}) => {
  const { t } = useLocale();

  const toggleResolution = (resolution: Resolution) => {
    const selected = selectedResolutions.some((r) => r.id === resolution.id);

    if (selected) {
      onSelectionChange(selectedResolutions.filter((r) => r.id !== resolution.id));
    } else {
      onSelectionChange([...selectedResolutions, resolution]);
    }
  };

  const isSelected = (resolution: Resolution) => {
    return selectedResolutions.some((r) => r.id === resolution.id);
  };

  // Group resolutions by device
  const groupedResolutions = React.useMemo(() => {
    const groups: Record<string, Resolution[]> = {};
    resolutions.forEach((resolution) => {
      if (!groups[resolution.device]) {
        groups[resolution.device] = [];
      }
      groups[resolution.device].push(resolution);
    });
    return groups;
  }, [resolutions]);

  const deviceOptions: SelectOption[] = [
    { value: 'all', label: t('resolutions.deviceTypes.all') },
    { value: 'iPhone', label: 'iPhone', icon: <Smartphone className="h-4 w-4" /> },
    { value: 'iPad', label: 'iPad', icon: <Tablet className="h-4 w-4" /> },
    { value: 'Apple Watch', label: 'Apple Watch', icon: <Watch className="h-4 w-4" /> },
  ];

  const orientationOptions: SelectOption[] = [
    { value: 'all', label: t('resolutions.orientations.all') },
    { value: 'portrait', label: t('resolutions.orientations.portrait') },
    { value: 'landscape', label: t('resolutions.orientations.landscape') },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{t('resolutions.title')}</h1>
        <p className="text-lg text-muted-foreground">{t('resolutions.subtitle')}</p>
      </div>

      {/* Filters and Actions */}
      <Card variant="elevated">
        <CardContent className="p-6 space-y-4">
          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              label={t('resolutions.deviceTypes.all')}
              options={deviceOptions}
              value={deviceFilter}
              onChange={(value) => onDeviceFilterChange(value as DeviceType | 'all')}
              className="flex-1"
            />
            <Select
              label={t('resolutions.orientations.all')}
              options={orientationOptions}
              value={orientationFilter}
              onChange={(value) =>
                onOrientationFilterChange(value as 'all' | 'portrait' | 'landscape')
              }
              className="flex-1"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onSelectAll}>
                {t('resolutions.selectAll')}
              </Button>
              <Button variant="outline" size="sm" onClick={onDeselectAll}>
                {t('resolutions.deselectAll')}
              </Button>
            </div>

            <Badge variant="primary" size="lg">
              {t('resolutions.selected', { count: selectedResolutions.length })}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resolutions Grid */}
      <div className="space-y-6">
        {Object.entries(groupedResolutions).map(([device, deviceResolutions]) => (
          <div key={device} className="space-y-3">
            {/* Device Header */}
            <div className="flex items-center gap-3">
              <div className="text-primary">{deviceIcons[device]}</div>
              <h2 className="text-xl font-semibold">{device}</h2>
              <Badge variant="outline">{deviceResolutions.length}</Badge>
            </div>

            {/* Resolution Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {deviceResolutions.map((resolution) => {
                const selected = isSelected(resolution);
                const isPortrait = resolution.orientation === 'portrait';

                return (
                  <Card
                    key={resolution.id}
                    variant="interactive"
                    padding="none"
                    onClick={() => toggleResolution(resolution)}
                    className={cn(
                      'cursor-pointer transition-all duration-200',
                      selected && 'ring-2 ring-primary ring-offset-2'
                    )}
                  >
                    <CardContent className="p-4 space-y-3">
                      {/* Visual Device Representation */}
                      <div className="flex items-center justify-center h-24">
                        <div
                          className={cn(
                            'rounded-lg border-2 transition-all duration-200',
                            'flex items-center justify-center',
                            selected
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-accent/50',
                            isPortrait ? 'w-12 h-20' : 'w-20 h-12'
                          )}
                        >
                          {selected && (
                            <Check
                              className="h-6 w-6 text-primary animate-in zoom-in-75 duration-200"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                      </div>

                      {/* Resolution Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{resolution.diagonal}</span>
                          <Badge variant="outline" size="sm">
                            {resolution.orientation}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {formatDimensions(resolution.width, resolution.height)}
                        </p>
                      </div>

                      {/* Checkbox */}
                      <div
                        className="pt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleResolution(resolution)}
                          label={t('resolutions.selectResolution')}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" size="lg" onClick={onBack} leftIcon={<ArrowLeft className="h-5 w-5" />}>
          {t('common.back')}
        </Button>

        <Button
          size="lg"
          onClick={onContinue}
          disabled={selectedResolutions.length === 0}
          rightIcon={<ArrowRight className="h-5 w-5" />}
        >
          {t('common.continue')} ({selectedResolutions.length})
        </Button>
      </div>
    </div>
  );
};
