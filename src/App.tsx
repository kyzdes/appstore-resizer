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

import AVAILABLE_RESOLUTIONS from './resolutions.json';

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
        ? 'bg-slate-900'
        : 'bg-slate-50',
      card: isDarkMode
        ? 'bg-slate-800/50 border border-slate-700/50 shadow-lg'
        : 'bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-lg',
      textPrimary: isDarkMode ? 'text-slate-50' : 'text-slate-900',
      textSecondary: isDarkMode ? 'text-slate-400' : 'text-slate-600',
      textMuted: isDarkMode ? 'text-slate-500' : 'text-slate-400',
      divider: isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50',
      infoBox: isDarkMode
        ? 'bg-slate-800 border border-slate-700 text-slate-300'
        : 'bg-slate-100 border border-slate-200 text-slate-800',
      tag: isDarkMode
        ? 'text-xs text-slate-300 px-2 py-0.5 bg-slate-700 rounded-full'
        : 'text-xs text-slate-600 px-2 py-0.5 bg-slate-100 rounded-full',
      primaryButton: isDarkMode
        ? 'bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-400'
        : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-300 disabled:text-white',
      summaryCard: isDarkMode
        ? 'bg-slate-800/50 border border-slate-700/50 shadow-xl'
        : 'bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-xl',
      accentIcon: isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600',
      progress: {
        track: isDarkMode ? 'bg-slate-700' : 'bg-slate-200',
        fill: 'bg-indigo-500',
        text: isDarkMode ? 'text-slate-200' : 'text-slate-900',
        label: isDarkMode ? 'text-slate-300' : 'text-slate-700',
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
              <div className={`flex items-center gap-2 rounded-full px-1 py-1 ${isDarkMode ? 'bg-[#111827] border border-[#1f2937]' : 'bg-white border border-gray-200 shadow-sm'}`}>
                <button
                  onClick={() => setLocale('ru')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    locale === 'ru'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isDarkMode
                        ? 'text-gray-200 hover:bg-[#1f2937]'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    locale === 'en'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isDarkMode
                        ? 'text-gray-200 hover:bg-[#1f2937]'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkMode
                  ? 'bg-[#111827] border border-[#1f2937] text-gray-100 hover:border-indigo-400 hover:text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-700 shadow-sm'
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
