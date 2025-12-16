import { Check } from 'lucide-react';
import type { Resolution } from '../App';

interface ResolutionSelectorProps {
  resolutions: Resolution[];
  selectedResolutions: string[];
  onToggle: (resolutionId: string) => void;
  onToggleDiagonal: (device: Resolution['device'], diagonal: string) => void;
  onToggleAll: () => void;
}

export function ResolutionSelector({
  resolutions,
  selectedResolutions,
  onToggle,
  onToggleDiagonal,
  onToggleAll,
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
        <p className="text-gray-700">Быстрый выбор</p>
        <button
          onClick={onToggleAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {allSelected ? 'Снять все' : 'Выбрать всё'}
        </button>
      </div>

      {Object.entries(groupedResolutions).map(([device, diagonals]) => (
        <div key={device} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-800 font-medium">{device}</h3>
            <span className="text-sm text-gray-500">
              {Object.values(diagonals).flat().filter(r => selectedResolutions.includes(r.id)).length}/
              {Object.values(diagonals).flat().length}
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(diagonals).map(([diagonal, diagonalResolutions]) => {
              const selectedCount = diagonalResolutions.filter(r => selectedResolutions.includes(r.id)).length;
              const allDiagonalSelected = selectedCount === diagonalResolutions.length;

              return (
                <div key={`${device}-${diagonal}`} className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-gray-900 font-medium">{diagonal}</p>
                      <p className="text-gray-500 text-sm">
                        {selectedCount}/{diagonalResolutions.length} разрешений
                      </p>
                    </div>
                    <button
                      onClick={() => onToggleDiagonal(device as Resolution['device'], diagonal)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {allDiagonalSelected ? 'Снять диагональ' : 'Выбрать диагональ'}
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
                                <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                                  {isLandscape ? 'Альбом' : 'Портрет'}
                                </span>
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
