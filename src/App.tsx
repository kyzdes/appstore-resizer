import { useMemo, useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResolutionSelector } from './components/ResolutionSelector';
import { ProgressIndicator } from './components/ProgressIndicator';
import { processImages } from './utils/imageProcessor';
import { Smartphone, Download, CheckCircle2, Sun, Moon } from 'lucide-react';

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
      // Фон страницы - neomorphic base color с легким градиентом
      pageBg: isDarkMode
        ? 'min-h-screen relative'
        : 'min-h-screen relative',
      pageBgStyle: isDarkMode
        ? { background: 'radial-gradient(circle at 20% 20%, #1f2937, #0b0f19), radial-gradient(circle at 80% 0%, #0f172a, #0b0f19)' }
        : { background: 'radial-gradient(circle at 20% 20%, #eef2ff, #f9fafb)' },

      // Neomorphic карточки
      neumorphicCard: 'neumorphic-raised rounded-2xl p-6',
      neumorphicCardHover: 'neumorphic-raised neumorphic-raised-hover rounded-2xl p-6',
      neumorphicButton: 'neumorphic-raised-sm rounded-xl px-4 py-2 transition-all duration-300',
      neumorphicInset: 'neumorphic-inset rounded-xl p-4',

      // Text colors
      textPrimary: isDarkMode ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',

      // Divider
      divider: 'neumorphic-divider',
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
    <div
      className={`${theme.pageBg} ${isDarkMode ? 'theme-dark text-gray-100' : 'theme-light text-gray-900'}`}
      style={theme.pageBgStyle}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 relative z-10">
          {/* Top bar with controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* Logo with neomorphic effect */}
              <div className="neumorphic-raised p-3 rounded-2xl relative">
                <div className="absolute inset-0 neumorphic-gradient-primary rounded-2xl opacity-90" />
                <Smartphone className="w-8 h-8 text-white relative z-10" />
              </div>

              {/* Segmented control for Language */}
              <div className="neumorphic-raised rounded-full p-1 inline-flex gap-1">
                <button
                  onClick={() => setLocale('ru')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    locale === 'ru'
                      ? 'neumorphic-gradient-primary text-white'
                      : 'neumorphic-flat hover:neumorphic-raised-sm ' + theme.textSecondary
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    locale === 'en'
                      ? 'neumorphic-gradient-primary text-white'
                      : 'neumorphic-flat hover:neumorphic-raised-sm ' + theme.textSecondary
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="neumorphic-raised rounded-full p-3 transition-all duration-300 neumorphic-raised-hover hover:rotate-180"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-400 transition-transform duration-500" />
              )}
            </button>
          </div>

          {/* Title and subtitle - centered */}
          <div className="text-center space-y-4">
            <h1 className={`text-4xl font-bold tracking-tight ${theme.textPrimary}`}>
              {t.title}
            </h1>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme.textSecondary}`}>
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {/* Left Column - Upload & Resolutions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className={theme.neumorphicCard}>
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
            <div className={theme.neumorphicCard}>
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
            <div className={`${theme.neumorphicCard} lg:sticky lg:top-8 space-y-6`}>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>
                  {t.summaryTitle}
                </h2>
                <div className="neumorphic-gradient-primary rounded-full px-4 py-1.5">
                  <span className="text-sm font-medium text-white">
                    Ready
                  </span>
                </div>
              </div>

              {/* Stats with neumorphic dividers - БЕЗ эмодзи */}
              <div className="space-y-4">
                {[
                  { label: t.summaryUploaded, value: uploadedFiles.length },
                  { label: t.summarySelected, value: selectedResolutions.length },
                  { label: t.summaryTotal, value: totalOutputImages }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between py-3">
                      <span className={theme.textSecondary}>{stat.label}</span>
                      <span className={`text-2xl font-bold ${theme.textPrimary}`}>
                        {stat.value}
                      </span>
                    </div>
                    {/* Divider - только между элементами, не после последнего */}
                    {idx < 2 && <div className={theme.divider} />}
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              {isProcessing && (
                <div className="neumorphic-inset rounded-xl p-4">
                  <ProgressIndicator
                    progress={progress}
                    label={t.processingLabel}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}

              {/* Success message */}
              {isCompleted && (
                <div className="neumorphic-raised rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 neumorphic-gradient-accent opacity-10" />
                  <div className="relative z-10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-300">
                        {t.readyTitle}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        {t.readySubtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button - Gradient with neomorphic shadow */}
              <button
                onClick={handleConvert}
                disabled={uploadedFiles.length === 0 || selectedResolutions.length === 0 || isProcessing}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
                  uploadedFiles.length === 0 || selectedResolutions.length === 0 || isProcessing
                    ? 'neumorphic-flat text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                    : 'neumorphic-gradient-primary text-white hover:shadow-2xl hover:-translate-y-1 active:translate-y-0'
                }`}
              >
                {!(uploadedFiles.length === 0 || selectedResolutions.length === 0 || isProcessing) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Download className={`w-5 h-5 transition-transform duration-300 ${
                    !isProcessing ? 'group-hover:animate-bounce' : ''
                  }`} />
                  <span>{isProcessing ? t.processing : t.convert}</span>
                </div>
              </button>

              {/* Local processing note */}
              <p className={`text-sm text-center ${theme.textSecondary}`}>
                🔒 {t.localNote}
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
