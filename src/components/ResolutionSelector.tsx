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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>{texts.quickSelect}</p>
        <button
          onClick={onToggleAll}
          className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${
            isDarkMode
              ? 'border-slate-700 text-blue-200 hover:border-blue-400 hover:text-blue-300 bg-slate-900'
              : 'border-blue-100 text-blue-600 hover:border-blue-300 hover:text-blue-700 bg-blue-50'
          }`}
        >
          {allSelected ? texts.clearAll : texts.selectAll}
        </button>
      </div>

      {Object.entries(groupedResolutions).map(([device, diagonals]) => (
        <div key={device} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={isDarkMode ? 'text-gray-100 font-medium' : 'text-gray-800 font-medium'}>{device}</h3>
            <span className={isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
              {Object.values(diagonals).flat().filter(r => selectedResolutions.includes(r.id)).length}/
              {Object.values(diagonals).flat().length}
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(diagonals).map(([diagonal, diagonalResolutions]) => {
              const selectedCount = diagonalResolutions.filter(r => selectedResolutions.includes(r.id)).length;
              const allDiagonalSelected = selectedCount === diagonalResolutions.length;

              return (
                <div
                  key={`${device}-${diagonal}`}
                  className={`rounded-xl p-4 space-y-3 border ${
                    isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className={isDarkMode ? 'text-gray-100 font-medium' : 'text-gray-900 font-medium'}>
                        {diagonal}
                      </p>
                      <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>
                        {texts.countLabel(selectedCount, diagonalResolutions.length)}
                      </p>
                    </div>
                    <button
                      onClick={() => onToggleDiagonal(device as Resolution['device'], diagonal)}
                      className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${
                        isDarkMode
                          ? 'border-slate-700 text-blue-200 hover:border-blue-400 hover:text-blue-300 bg-slate-900'
                          : 'border-blue-100 text-blue-600 hover:border-blue-300 hover:text-blue-700 bg-blue-50'
                      }`}
                    >
                      {allDiagonalSelected ? texts.clearDiagonal : texts.selectDiagonal}
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {diagonalResolutions.map(resolution => {
                      const isSelected = selectedResolutions.includes(resolution.id);
                      const isLandscape = resolution.width > resolution.height;

                      return (
                        <button
                          key={resolution.id}
                          onClick={() => onToggle(resolution.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? isDarkMode
                                ? 'border-blue-500 bg-slate-800'
                                : 'border-blue-500 bg-blue-50'
                              : isDarkMode
                                ? 'border-slate-800 bg-slate-900 hover:border-slate-700'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>
                                  {resolution.width} × {resolution.height}
                                </p>
                                <span className={isDarkMode ? 'text-xs text-gray-200 px-2 py-0.5 bg-slate-800 rounded-full' : 'text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full'}>
                                  {isLandscape ? texts.orientation.landscape : texts.orientation.portrait}
                                </span>
                              </div>
                              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                                {(resolution.width * resolution.height / 1000000).toFixed(1)} MP
                              </p>
                            </div>
                            <div
                              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-500'
                                  : isDarkMode
                                    ? 'border-slate-700 bg-slate-900'
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
