import { Check } from 'lucide-react';
import type { Resolution } from '../App';

interface ResolutionSelectorProps {
  resolutions: Resolution[];
  selectedResolutions: string[];
  onToggle: (resolutionId: string) => void;
  onToggleDiagonal: (device: Resolution['device'], diagonal: string) => void;
  onToggleAll: () => void;
  texts: {
    quickSelect: string;
    selectAll: string;
    clearAll: string;
    selectDiagonal: string;
    clearDiagonal: string;
    countLabel: (selected: number, total: number) => string;
    orientation: {
      portrait: string;
      landscape: string;
    };
  };
  isDarkMode?: boolean;
}

export function ResolutionSelector({
  resolutions,
  selectedResolutions,
  onToggle,
  onToggleDiagonal,
  onToggleAll,
  texts,
  isDarkMode = false,
}: ResolutionSelectorProps) {
  const groupedResolutions = resolutions.reduce((acc, resolution) => {
    if (!acc[resolution.device]) {
      acc[resolution.device] = {};
    }
    if (!acc[resolution.device][resolution.diagonal]) {
      acc[resolution.device][resolution.diagonal] = [];
    }
    acc[resolution.device][resolution.diagonal].push(resolution);
    return acc;
  }, {} as Record<Resolution['device'], Record<string, Resolution[]>>);

  const allSelected = selectedResolutions.length === resolutions.length;

  return (
    <div className="space-y-8">
      {/* Top-level quick actions */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="neumorphic-raised px-5 py-2 rounded-xl">
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {texts.countLabel(selectedResolutions.length, resolutions.length)}
            </span>
          </div>
        </div>
        <button
          onClick={onToggleAll}
          className="neumorphic-button hover:neumorphic-raised-hover text-sm font-medium px-5 py-2.5"
        >
          {allSelected ? texts.clearAll : texts.selectAll}
        </button>
      </div>

      {/* Divider */}
      <div className="neumorphic-divider" />

      {/* Device Groups - Simple Grid Layout */}
      <div className="space-y-10">
        {Object.entries(groupedResolutions).map(([device, diagonals]) => {
          const deviceResolutions = Object.values(diagonals).flat();
          const selectedCount = deviceResolutions.filter(r => selectedResolutions.includes(r.id)).length;

          return (
            <div key={device} className="space-y-5">
              {/* Device Header */}
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {device}
                </h3>
                <div className="neumorphic-raised px-4 py-1.5 rounded-full">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {selectedCount}/{deviceResolutions.length}
                  </span>
                </div>
              </div>

              {/* Diagonal Groups */}
              <div className="space-y-7">
                {Object.entries(diagonals).map(([diagonal, diagonalResolutions]) => {
                  const selectedDiagonalCount = diagonalResolutions.filter(r => selectedResolutions.includes(r.id)).length;
                  const allDiagonalSelected = selectedDiagonalCount === diagonalResolutions.length;

                  return (
                    <div key={`${device}-${diagonal}`} className="space-y-3">
                      {/* Diagonal Header with action button */}
                      <div className="neumorphic-raised rounded-xl p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                              {diagonal}
                            </p>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {texts.countLabel(selectedDiagonalCount, diagonalResolutions.length)}
                            </p>
                          </div>
                          <button
                            onClick={() => onToggleDiagonal(device as Resolution['device'], diagonal)}
                            className="neumorphic-button text-sm font-medium whitespace-nowrap px-4 py-2"
                          >
                            {allDiagonalSelected ? texts.clearDiagonal : texts.selectDiagonal}
                          </button>
                        </div>
                      </div>

                      {/* Resolution Cards Grid */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {diagonalResolutions.map(resolution => {
                          const isSelected = selectedResolutions.includes(resolution.id);
                          const isLandscape = resolution.width > resolution.height;

                          return (
                            <button
                              key={resolution.id}
                              onClick={() => onToggle(resolution.id)}
                              className={`relative transition-all duration-300 rounded-xl p-5 text-left ${
                                isSelected
                                  ? 'neumorphic-active'
                                  : 'neumorphic-raised hover:neumorphic-raised-hover'
                              }`}
                            >
                              {/* Gradient accent when selected */}
                              {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl pointer-events-none" />
                              )}

                              {/* Content */}
                              <div className="relative z-10 flex items-start justify-between gap-3">
                                <div className="flex-1 space-y-2">
                                  {/* Resolution */}
                                  <div className="flex items-center gap-2">
                                    <span className={`font-mono font-semibold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                      {resolution.width} × {resolution.height}
                                    </span>
                                  </div>

                                  {/* Metadata - БЕЗ Badge и БЕЗ эмодзи */}
                                  <div className="flex items-center gap-3">
                                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {isLandscape ? texts.orientation.landscape : texts.orientation.portrait}
                                    </span>
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                      {(resolution.width * resolution.height / 1000000).toFixed(1)} MP
                                    </span>
                                  </div>
                                </div>

                                {/* Selection indicator - checkbox style */}
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                                  isSelected
                                    ? 'neumorphic-gradient-primary'
                                    : 'neumorphic-inset-sm'
                                }`}>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Divider between diagonal groups */}
                      {Object.keys(diagonals).indexOf(diagonal) < Object.keys(diagonals).length - 1 && (
                        <div className="neumorphic-divider my-4" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Divider between device groups */}
              {Object.keys(groupedResolutions).indexOf(device) < Object.keys(groupedResolutions).length - 1 && (
                <div className="neumorphic-divider mt-6" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
