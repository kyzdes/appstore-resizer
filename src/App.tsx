import { useMemo, useState } from 'react';
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

type Locale = 'ru' | 'en';

const TRANSLATIONS: Record<Locale, {
  title: string;
  subtitle: string;
  steps: {
    upload: string;
    resolutions: string;
  };
  hint: string;
  summaryTitle: string;
  summaryUploaded: string;
  summarySelected: string;
  summaryTotal: string;
  processingLabel: string;
  localNote: string;
  readyTitle: string;
  readySubtitle: string;
  convert: string;
  processing: string;
  footerNote: string;
  upload: {
    dropTitle: string;
    dropSubtitle: string;
    helperFormats: string;
    helperCount: string;
    helperSize: string;
    alertUnsupported: (name: string) => string;
    alertTooLarge: (name: string) => string;
    alertTooMany: (current: number, limit: number) => string;
  };
  selector: {
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
}> = {
  ru: {
    title: 'App Store Screenshot Converter',
    subtitle: 'Конвертируйте скриншоты в требуемые разрешения для App Store Connect. Загрузите до 10 изображений и выберите целевые разрешения iPhone, iPad и Apple Watch.',
    steps: { upload: '1. Загрузите изображения', resolutions: '2. Выберите целевые разрешения' },
    hint: 'Подсказка: выберите диагональ или нажмите «Выбрать все», чтобы подготовить полный набор для App Store и отзывов Apple.',
    summaryTitle: 'Сводка',
    summaryUploaded: 'Загружено файлов:',
    summarySelected: 'Выбрано разрешений:',
    summaryTotal: 'Итого изображений:',
    processingLabel: 'Обработка изображений',
    localNote: 'Обработка выполняется локально в вашем браузере',
    readyTitle: 'Готово!',
    readySubtitle: 'Архив успешно скачан',
    convert: 'Конвертировать и скачать',
    processing: 'Обработка...',
    footerNote: 'Все изображения обрабатываются локально. Файлы не загружаются на сервер.',
    upload: {
      dropTitle: 'Перетащите файлы сюда или нажмите для выбора',
      dropSubtitle: 'JPEG или PNG, до 10 файлов',
      helperFormats: '• Форматы: JPEG, PNG',
      helperCount: '• Количество: 1-10 файлов',
      helperSize: '• Размер: до 10 МБ на файл',
      alertUnsupported: (name) => `Файл "${name}" имеет неподдерживаемый формат. Разрешены только JPEG и PNG.`,
      alertTooLarge: (name) => `Файл "${name}" превышает лимит 10 МБ и не будет добавлен.`,
      alertTooMany: (current, limit) => `Можно загрузить максимум ${limit} файлов. У вас уже загружено ${current} файлов.`,
    },
    selector: {
      quickSelect: 'Быстрый выбор',
      selectAll: 'Выбрать всё',
      clearAll: 'Снять все',
      selectDiagonal: 'Выбрать диагональ',
      clearDiagonal: 'Снять диагональ',
      countLabel: (selected, total) => `${selected}/${total} разрешений`,
      orientation: {
        portrait: 'Портрет',
        landscape: 'Альбом',
      },
    },
  },
  en: {
    title: 'App Store Screenshot Converter',
    subtitle: 'Convert screenshots to the required resolutions for App Store Connect. Upload up to 10 images and pick iPhone, iPad, and Apple Watch targets.',
    steps: { upload: '1. Upload images', resolutions: '2. Choose target resolutions' },
    hint: 'Tip: pick a diagonal or use “Select all” to prepare a full set for App Store review.',
    summaryTitle: 'Summary',
    summaryUploaded: 'Files uploaded:',
    summarySelected: 'Resolutions selected:',
    summaryTotal: 'Total outputs:',
    processingLabel: 'Processing images',
    localNote: 'All processing runs locally in your browser',
    readyTitle: 'Done!',
    readySubtitle: 'Archive downloaded',
    convert: 'Convert & download',
    processing: 'Processing...',
    footerNote: 'All processing happens locally. Files are never uploaded to a server.',
    upload: {
      dropTitle: 'Drop files here or click to select',
      dropSubtitle: 'JPEG or PNG, up to 10 files',
      helperFormats: '• Formats: JPEG, PNG',
      helperCount: '• Count: 1-10 files',
      helperSize: '• Size: up to 10 MB per file',
      alertUnsupported: (name) => `File "${name}" has an unsupported format. Only JPEG and PNG are allowed.`,
      alertTooLarge: (name) => `File "${name}" exceeds the 10 MB limit and will be skipped.`,
      alertTooMany: (current, limit) => `You can upload at most ${limit} files. You already have ${current} files added.`,
    },
    selector: {
      quickSelect: 'Quick select',
      selectAll: 'Select all',
      clearAll: 'Clear all',
      selectDiagonal: 'Select diagonal',
      clearDiagonal: 'Clear diagonal',
      countLabel: (selected, total) => `${selected}/${total} resolutions`,
      orientation: {
        portrait: 'Portrait',
        landscape: 'Landscape',
      },
    },
  },
};

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
  const [locale, setLocale] = useState<Locale>('ru');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>([
    'iphone-6-9-1260x2736', // Default to one of the 6.9" iPhone resolutions
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const MAX_FILES = 10;
  const MAX_FILE_SIZE_MB = 10;

  const t = useMemo(() => TRANSLATIONS[locale], [locale]);

  const theme = useMemo(
    () => ({
      pageBg: isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-black'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
      card: isDarkMode
        ? 'bg-slate-900 border border-slate-800 shadow-sm'
        : 'bg-white border border-gray-200 shadow-sm',
      textPrimary: isDarkMode ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      textMuted: isDarkMode ? 'text-gray-500' : 'text-gray-500',
      divider: isDarkMode ? 'border-slate-800' : 'border-gray-100',
      infoBox: isDarkMode
        ? 'bg-slate-800 border border-slate-700 text-gray-200'
        : 'bg-blue-50 border border-blue-100 text-blue-900',
      tag: isDarkMode
        ? 'text-xs text-gray-200 px-2 py-0.5 bg-slate-800 rounded-full'
        : 'text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full',
      primaryButton: isDarkMode
        ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-700 disabled:text-gray-400'
        : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-white',
      summaryCard: isDarkMode
        ? 'bg-slate-900 border border-slate-800 shadow-sm'
        : 'bg-white border border-gray-200 shadow-sm',
      accentIcon: isDarkMode ? 'bg-blue-600' : 'bg-blue-600',
      progress: {
        track: isDarkMode ? 'bg-slate-800' : 'bg-gray-200',
        fill: 'bg-blue-600',
        text: isDarkMode ? 'text-gray-200' : 'text-gray-900',
        label: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      },
    }),
    [isDarkMode]
  );

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
    <div className={`min-h-screen ${theme.pageBg} ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`${theme.accentIcon} p-3 rounded-2xl`}>
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLocale('ru')}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                    locale === 'ru'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : isDarkMode
                        ? 'border-slate-700 text-gray-200 hover:border-blue-400 hover:text-blue-200'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                    locale === 'en'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : isDarkMode
                        ? 'border-slate-700 text-gray-200 hover:border-blue-400 hover:text-blue-200'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-gray-200 hover:border-blue-400 hover:text-blue-200'
                  : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700 bg-white'
              }`}
            >
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>
          <div className="text-center">
            <h1 className={`${theme.textPrimary} mb-2`}>
              {t.title}
            </h1>
            <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Resolutions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className={`${theme.card} rounded-2xl p-6`}>
              <h2 className={`${theme.textPrimary} mb-4`}>
                {t.steps.upload}
              </h2>
              <ImageUploader
                onFilesSelected={handleFilesSelected}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
                maxFiles={MAX_FILES}
                maxFileSizeMB={MAX_FILE_SIZE_MB}
                texts={t.upload}
                isDarkMode={isDarkMode}
              />
              <div className={`mt-4 space-y-1 ${theme.textSecondary}`}>
                <p>{t.upload.helperFormats}</p>
                <p>{t.upload.helperCount}</p>
                <p>{t.upload.helperSize}</p>
              </div>
            </div>

            {/* Resolution Selection */}
            <div className={`${theme.card} rounded-2xl p-6`}>
              <h2 className={`${theme.textPrimary} mb-4`}>
                {t.steps.resolutions}
              </h2>
              <ResolutionSelector
                resolutions={AVAILABLE_RESOLUTIONS}
                selectedResolutions={selectedResolutions}
                onToggle={handleResolutionToggle}
                onToggleDiagonal={handleDiagonalToggle}
                onToggleAll={handleSelectAll}
                texts={t.selector}
                isDarkMode={isDarkMode}
              />
              <div className={`mt-4 p-4 rounded-xl ${theme.infoBox}`}>
                <p className="space-y-1">
                  {t.hint}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="lg:col-span-1">
            <div className={`${theme.summaryCard} rounded-2xl p-6 sticky top-8`}>
              <h2 className={`${theme.textPrimary} mb-6`}>
                {t.summaryTitle}
              </h2>

              <div className="space-y-4 mb-6">
                <div className={`flex items-center justify-between py-3 border-b ${theme.divider}`}>
                  <span className={theme.textSecondary}>{t.summaryUploaded}</span>
                  <span className={theme.textPrimary}>{uploadedFiles.length}</span>
                </div>
                <div className={`flex items-center justify-between py-3 border-b ${theme.divider}`}>
                  <span className={theme.textSecondary}>{t.summarySelected}</span>
                  <span className={theme.textPrimary}>{selectedResolutions.length}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className={theme.textSecondary}>{t.summaryTotal}</span>
                  <span className={theme.textPrimary}>{totalOutputImages}</span>
                </div>
              </div>

              {isProcessing && (
                <div className="mb-6">
                  <ProgressIndicator progress={progress} label={t.processingLabel} isDarkMode={isDarkMode} />
                </div>
              )}

              {isCompleted && (
                <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${isDarkMode ? 'bg-green-900/30 border-green-700 text-green-200' : 'bg-green-50 border-green-200'}`}>
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className={isDarkMode ? 'text-green-200' : 'text-green-900'}>
                      {t.readyTitle}
                    </p>
                    <p className={isDarkMode ? 'text-green-200/80 mt-1' : 'text-green-700 mt-1'}>
                      {t.readySubtitle}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleConvert}
                disabled={uploadedFiles.length === 0 || selectedResolutions.length === 0 || isProcessing}
                className={`w-full py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed ${theme.primaryButton}`}
              >
                <Download className="w-5 h-5" />
                {isProcessing ? t.processing : t.convert}
              </button>

              <p className={`${theme.textSecondary} mt-4 text-center`}>
                {t.localNote}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className={`mt-12 text-center ${theme.textSecondary}`}>
          <p>{t.footerNote}</p>
        </div>
      </div>
    </div>
  );
}
