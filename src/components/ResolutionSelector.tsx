import { Check } from 'lucide-react';
import type { Resolution } from '../App';

interface ResolutionSelectorProps {
  resolutions: Resolution[];
  selectedResolutions: string[];
  onToggle: (resolutionId: string) => void;
}

export function ResolutionSelector({ resolutions, selectedResolutions, onToggle }: ResolutionSelectorProps) {
  // Group resolutions by device
  const groupedResolutions = resolutions.reduce((acc, resolution) => {
    if (!acc[resolution.device]) {
      acc[resolution.device] = [];
    }
    acc[resolution.device].push(resolution);
    return acc;
  }, {} as Record<string, Resolution[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedResolutions).map(([device, deviceResolutions]) => (
        <div key={device} className="space-y-2">
          <h3 className="text-gray-700">{device}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {deviceResolutions.map(resolution => {
              const isSelected = selectedResolutions.includes(resolution.id);

              return (
                <button
                  key={resolution.id}
                  onClick={() => onToggle(resolution.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900">
                          {resolution.width} × {resolution.height}
                        </p>
                      </div>
                      <p className="text-gray-500">
                        {(resolution.width * resolution.height / 1000000).toFixed(1)} MP
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
