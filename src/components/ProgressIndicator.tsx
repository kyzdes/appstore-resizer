interface ProgressIndicatorProps {
  progress: number;
  label: string;
  isDarkMode?: boolean;
}

export function ProgressIndicator({ progress, label, isDarkMode = false }: ProgressIndicatorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{label}</span>
        <span className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>{Math.round(progress)}%</span>
      </div>
      <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
