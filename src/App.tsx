import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResolutionSelector } from './components/ResolutionSelector';
import { ProgressIndicator } from './components/ProgressIndicator';
import { processImages } from './utils/imageProcessor';
import { Smartphone, Download, CheckCircle2 } from 'lucide-react';

export interface Resolution {
  id: string;
  device: string;
  width: number;
  height: number;
}

export const AVAILABLE_RESOLUTIONS: Resolution[] = [
  { id: '6.9-1', device: 'iPhone 6.9"', width: 1290, height: 2796 },
  { id: '6.9-2', device: 'iPhone 6.9"', width: 1320, height: 2868 },
  { id: '6.5-1', device: 'iPhone 6.5"', width: 1284, height: 2778 },
  { id: '6.5-2', device: 'iPhone 6.5"', width: 1242, height: 2688 },
  { id: '6.3-1', device: 'iPhone 6.3"', width: 1179, height: 2556 },
  { id: '6.3-2', device: 'iPhone 6.3"', width: 1206, height: 2622 },
];

export default function App() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>([
    '6.9-1', // Default to mandatory 6.9" resolution
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
    setSelectedResolutions(prev => {
      if (prev.includes(resolutionId)) {
        return prev.filter(id => id !== resolutionId);
      } else {
        return [...prev, resolutionId];
      }
    });
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

      await processImages(uploadedFiles, resolutionsToProcess, (progress) => {
        setProgress(progress);
      });

      setIsCompleted(true);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Произошла ошибка при обработке изображений. Пожалуйста, попробуйте снова.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
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
            Загрузите до 10 изображений и выберите целевые разрешения iPhone.
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
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-blue-900">
                  <span className="font-medium">Примечание:</span> Разрешение 6.9" является обязательным для новых приложений в App Store Connect (декабрь 2025).
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
