import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResolutionSelector } from './components/ResolutionSelector';
import { ProgressIndicator } from './components/ProgressIndicator';
import { processImages } from './utils/imageProcessor';
import { Smartphone, Download, CheckCircle2 } from 'lucide-react';

export interface Resolution {
  id: string;
  device: 'iPhone' | 'iPad' | 'Apple Watch';
  diagonal: string;
  width: number;
  height: number;
}

export const AVAILABLE_RESOLUTIONS: Resolution[] = [
  // iPhone 6.9"
  { id: 'iphone-6-9-1260x2736', device: 'iPhone', diagonal: '6.9"', width: 1260, height: 2736 },
  { id: 'iphone-6-9-2736x1260', device: 'iPhone', diagonal: '6.9"', width: 2736, height: 1260 },
  { id: 'iphone-6-9-1320x2868', device: 'iPhone', diagonal: '6.9"', width: 1320, height: 2868 },
  { id: 'iphone-6-9-2868x1320', device: 'iPhone', diagonal: '6.9"', width: 2868, height: 1320 },
  { id: 'iphone-6-9-1290x2796', device: 'iPhone', diagonal: '6.9"', width: 1290, height: 2796 },
  { id: 'iphone-6-9-2796x1290', device: 'iPhone', diagonal: '6.9"', width: 2796, height: 1290 },

  // iPhone 6.5"
  { id: 'iphone-6-5-1242x2688', device: 'iPhone', diagonal: '6.5"', width: 1242, height: 2688 },
  { id: 'iphone-6-5-2688x1242', device: 'iPhone', diagonal: '6.5"', width: 2688, height: 1242 },
  { id: 'iphone-6-5-1284x2778', device: 'iPhone', diagonal: '6.5"', width: 1284, height: 2778 },
  { id: 'iphone-6-5-2778x1284', device: 'iPhone', diagonal: '6.5"', width: 2778, height: 1284 },

  // iPhone 6.3"
  { id: 'iphone-6-3-1206x2622', device: 'iPhone', diagonal: '6.3"', width: 1206, height: 2622 },
  { id: 'iphone-6-3-2622x1206', device: 'iPhone', diagonal: '6.3"', width: 2622, height: 1206 },
  { id: 'iphone-6-3-1179x2556', device: 'iPhone', diagonal: '6.3"', width: 1179, height: 2556 },
  { id: 'iphone-6-3-2556x1179', device: 'iPhone', diagonal: '6.3"', width: 2556, height: 1179 },

  // iPhone 6.1"
  { id: 'iphone-6-1-1125x2436', device: 'iPhone', diagonal: '6.1"', width: 1125, height: 2436 },
  { id: 'iphone-6-1-2436x1125', device: 'iPhone', diagonal: '6.1"', width: 2436, height: 1125 },
  { id: 'iphone-6-1-1080x2340', device: 'iPhone', diagonal: '6.1"', width: 1080, height: 2340 },
  { id: 'iphone-6-1-2340x1080', device: 'iPhone', diagonal: '6.1"', width: 2340, height: 1080 },
  { id: 'iphone-6-1-2532x1170', device: 'iPhone', diagonal: '6.1"', width: 2532, height: 1170 },
  { id: 'iphone-6-1-1170x2532', device: 'iPhone', diagonal: '6.1"', width: 1170, height: 2532 },

  // iPad 13"
  { id: 'ipad-13-2064x2752', device: 'iPad', diagonal: '13"', width: 2064, height: 2752 },
  { id: 'ipad-13-2752x2064', device: 'iPad', diagonal: '13"', width: 2752, height: 2064 },
  { id: 'ipad-13-2048x2732', device: 'iPad', diagonal: '13"', width: 2048, height: 2732 },
  { id: 'ipad-13-2732x2048', device: 'iPad', diagonal: '13"', width: 2732, height: 2048 },

  // iPad 11"
  { id: 'ipad-11-1668x2420', device: 'iPad', diagonal: '11"', width: 1668, height: 2420 },
  { id: 'ipad-11-2420x1668', device: 'iPad', diagonal: '11"', width: 2420, height: 1668 },
  { id: 'ipad-11-1668x2388', device: 'iPad', diagonal: '11"', width: 1668, height: 2388 },
  { id: 'ipad-11-2388x1668', device: 'iPad', diagonal: '11"', width: 2388, height: 1668 },
  { id: 'ipad-11-1640x2360', device: 'iPad', diagonal: '11"', width: 1640, height: 2360 },
  { id: 'ipad-11-2360x1640', device: 'iPad', diagonal: '11"', width: 2360, height: 1640 },
  { id: 'ipad-11-2266x1488', device: 'iPad', diagonal: '11"', width: 2266, height: 1488 },
  { id: 'ipad-11-1488x2266', device: 'iPad', diagonal: '11"', width: 1488, height: 2266 },

  // iPad 12.9"
  { id: 'ipad-12-9-2048x2732', device: 'iPad', diagonal: '12.9"', width: 2048, height: 2732 },
  { id: 'ipad-12-9-2732x2048', device: 'iPad', diagonal: '12.9"', width: 2732, height: 2048 },

  // iPad 10.5"
  { id: 'ipad-10-5-1668x2224', device: 'iPad', diagonal: '10.5"', width: 1668, height: 2224 },
  { id: 'ipad-10-5-2224x1668', device: 'iPad', diagonal: '10.5"', width: 2224, height: 1668 },

  // iPad 9.7"
  { id: 'ipad-9-7-1536x2008', device: 'iPad', diagonal: '9.7"', width: 1536, height: 2008 },
  { id: 'ipad-9-7-1536x2048', device: 'iPad', diagonal: '9.7"', width: 1536, height: 2048 },
  { id: 'ipad-9-7-2048x1496', device: 'iPad', diagonal: '9.7"', width: 2048, height: 1496 },
  { id: 'ipad-9-7-2048x1536', device: 'iPad', diagonal: '9.7"', width: 2048, height: 1536 },
  { id: 'ipad-9-7-768x1004', device: 'iPad', diagonal: '9.7"', width: 768, height: 1004 },
  { id: 'ipad-9-7-768x1024', device: 'iPad', diagonal: '9.7"', width: 768, height: 1024 },
  { id: 'ipad-9-7-1024x748', device: 'iPad', diagonal: '9.7"', width: 1024, height: 748 },
  { id: 'ipad-9-7-1024x768', device: 'iPad', diagonal: '9.7"', width: 1024, height: 768 },

  // Apple Watch
  { id: 'watch-ultra-3-422x514', device: 'Apple Watch', diagonal: 'Ultra 3', width: 422, height: 514 },
  { id: 'watch-ultra-3-410x502', device: 'Apple Watch', diagonal: 'Ultra 3', width: 410, height: 502 },
  { id: 'watch-series-11-416x496', device: 'Apple Watch', diagonal: 'Series 11', width: 416, height: 496 },
  { id: 'watch-series-9-396x484', device: 'Apple Watch', diagonal: 'Series 9', width: 396, height: 484 },
  { id: 'watch-series-6-368x448', device: 'Apple Watch', diagonal: 'Series 6', width: 368, height: 448 },
  { id: 'watch-series-3-312x390', device: 'Apple Watch', diagonal: 'Series 3', width: 312, height: 390 },
];

export default function App() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>([
    'iphone-6-9-1260x2736', // Default to one of the 6.9" iPhone resolutions
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
    setIsCompleted(false);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleResolutionToggle = (resolutionId: string) => {
    setSelectedResolutions(prev =>
      prev.includes(resolutionId)
        ? prev.filter(id => id !== resolutionId)
        : [...prev, resolutionId]
    );
    setIsCompleted(false);
  };

  const handleDiagonalToggle = (device: Resolution['device'], diagonal: string) => {
    const idsForDiagonal = AVAILABLE_RESOLUTIONS
      .filter(r => r.device === device && r.diagonal === diagonal)
      .map(r => r.id);

    setSelectedResolutions(prev => {
      const allSelected = idsForDiagonal.every(id => prev.includes(id));
      if (allSelected) {
        return prev.filter(id => !idsForDiagonal.includes(id));
      }
      return Array.from(new Set([...prev, ...idsForDiagonal]));
    });
    setIsCompleted(false);
  };

  const handleSelectAll = () => {
    const areAllSelected = selectedResolutions.length === AVAILABLE_RESOLUTIONS.length;
    if (areAllSelected) {
      setSelectedResolutions([]);
    } else {
      setSelectedResolutions(AVAILABLE_RESOLUTIONS.map(r => r.id));
    }
    setIsCompleted(false);
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0 || selectedResolutions.length === 0) {
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setIsCompleted(false);

    try {
      const resolutionsToProcess = AVAILABLE_RESOLUTIONS.filter(r =>
        selectedResolutions.includes(r.id)
      );

      await processImages(uploadedFiles, resolutionsToProcess, (progressValue) => {
        setProgress(progressValue);
      });

      setProgress(100);
      setIsCompleted(true);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Произошла ошибка при обработке изображений. Пожалуйста, попробуйте снова.');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalOutputImages = uploadedFiles.length * selectedResolutions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-2xl">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">
            App Store Screenshot Converter
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Конвертируйте скриншоты в требуемые разрешения для App Store Connect.
            Загрузите до 10 изображений и выберите целевые разрешения iPhone, iPad и Apple Watch.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Resolutions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">
                1. Загрузите изображения
              </h2>
              <ImageUploader
                onFilesSelected={handleFilesSelected}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
              />
              <div className="mt-4 text-gray-600 space-y-1">
                <p>• Форматы: JPEG, PNG</p>
                <p>• Количество: 1-10 файлов</p>
                <p>• Рекомендуемый минимум: 1242×2648 px</p>
              </div>
            </div>

            {/* Resolution Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">
                2. Выберите целевые разрешения
              </h2>
              <ResolutionSelector
                resolutions={AVAILABLE_RESOLUTIONS}
                selectedResolutions={selectedResolutions}
                onToggle={handleResolutionToggle}
                onToggleDiagonal={handleDiagonalToggle}
                onToggleAll={handleSelectAll}
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-blue-900 space-y-1">
                  <span className="font-medium">Подсказка:</span> выберите диагональ или нажмите «Выбрать все», чтобы подготовить полный набор для App Store и отзывов Apple.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-gray-900 mb-6">
                Сводка
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Загружено файлов:</span>
                  <span className="text-gray-900">{uploadedFiles.length}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Выбрано разрешений:</span>
                  <span className="text-gray-900">{selectedResolutions.length}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Итого изображений:</span>
                  <span className="text-gray-900">{totalOutputImages}</span>
                </div>
              </div>

              {isProcessing && (
                <div className="mb-6">
                  <ProgressIndicator progress={progress} />
                </div>
              )}

              {isCompleted && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-900">
                      Готово!
                    </p>
                    <p className="text-green-700 mt-1">
                      Архив успешно скачан
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleConvert}
                disabled={uploadedFiles.length === 0 || selectedResolutions.length === 0 || isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {isProcessing ? 'Обработка...' : 'Конвертировать и скачать'}
              </button>

              <p className="text-gray-500 mt-4 text-center">
                Обработка выполняется локально в вашем браузере
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-500">
          <p>Все изображения обрабатываются локально. Файлы не загружаются на сервер.</p>
        </div>
      </div>
    </div>
  );
}
