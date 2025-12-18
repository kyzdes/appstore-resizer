/**
 * Main Application Component
 *
 * Orchestrates the entire application flow:
 * 1. Upload screenshots
 * 2. Select resolutions
 * 3. Process images
 * 4. Download results
 */

import * as React from 'react';
import { Layout } from '@/components/layout/Layout';
import { UploadScreen } from '@/components/screens/UploadScreen';
import { ResolutionSelector } from '@/components/screens/ResolutionSelector';
import { ProcessingScreen } from '@/components/screens/ProcessingScreen';
import { DownloadScreen } from '@/components/screens/DownloadScreen';
import { SettingsPanel } from '@/components/screens/SettingsPanel';
import { useUpload } from '@/hooks/useUpload';
import { useResolutions } from '@/hooks/useResolutions';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { useToast } from '@/hooks/useToast';
import { useLocale } from '@/hooks/useLocale';

type AppStep = 'upload' | 'configure' | 'processing' | 'complete';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<AppStep>('upload');
  const [showSettings, setShowSettings] = React.useState(false);

  const { t } = useLocale();
  const { images, addImages, removeImage, clearImages, isValidating } = useUpload();
  const {
    selectedResolutions,
    setSelectedResolutions,
    filteredResolutions,
    deviceFilter,
    orientationFilter,
    setDeviceFilter,
    setOrientationFilter,
    selectAll,
    deselectAll,
    clearSelections,
  } = useResolutions();
  const { processingStatus, result, processImages, downloadResult, reset } =
    useImageProcessor();
  const { error: showError } = useToast();

  // Handle file changes from upload screen
  const handleFilesChange = React.useCallback(
    async (files: File[]) => {
      if (files.length > images.length) {
        // New files added
        const newFiles = files.slice(images.length);
        await addImages(newFiles);
      } else {
        // Files removed - find which one
        const removedImage = images.find((img) => !files.includes(img.file));
        if (removedImage) {
          removeImage(removedImage.id);
        }
      }
    },
    [images, addImages, removeImage]
  );

  // Navigate to resolution selection
  const handleUploadContinue = React.useCallback(() => {
    if (images.length === 0) {
      showError(t('errors.noImages'));
      return;
    }
    setCurrentStep('configure');
  }, [images.length, showError, t]);

  // Navigate back to upload
  const handleResolutionBack = React.useCallback(() => {
    setCurrentStep('upload');
  }, []);

  // Start processing
  const handleResolutionContinue = React.useCallback(async () => {
    if (selectedResolutions.length === 0) {
      showError(t('errors.noResolutions'));
      return;
    }

    setCurrentStep('processing');

    // Start processing
    const success = await processImages(images, selectedResolutions);

    if (success) {
      setCurrentStep('complete');
    } else {
      // Return to resolution selection on error
      setCurrentStep('configure');
    }
  }, [images, selectedResolutions, processImages, showError, t]);

  // Handle download
  const handleDownload = React.useCallback(() => {
    downloadResult();
  }, [downloadResult]);

  // Start over
  const handleStartOver = React.useCallback(() => {
    // Clean up
    clearImages();
    clearSelections();
    reset();

    // Return to upload
    setCurrentStep('upload');
  }, [clearImages, clearSelections, reset]);

  // Handle logo click - return to home
  const handleLogoClick = React.useCallback(() => {
    // Only reset if not already on upload screen
    if (currentStep !== 'upload') {
      handleStartOver();
    }
  }, [currentStep, handleStartOver]);

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <UploadScreen
            files={images.map((img) => img.file)}
            onFilesChange={handleFilesChange}
            onContinue={handleUploadContinue}
            isValidating={isValidating}
          />
        );

      case 'configure':
        return (
          <ResolutionSelector
            resolutions={filteredResolutions}
            selectedResolutions={selectedResolutions}
            onSelectionChange={setSelectedResolutions}
            deviceFilter={deviceFilter}
            orientationFilter={orientationFilter}
            onDeviceFilterChange={setDeviceFilter}
            onOrientationFilterChange={setOrientationFilter}
            onSelectAll={selectAll}
            onDeselectAll={deselectAll}
            onBack={handleResolutionBack}
            onContinue={handleResolutionContinue}
          />
        );

      case 'processing':
        return processingStatus ? (
          <ProcessingScreen status={processingStatus} />
        ) : (
          <div className="text-center">Loading...</div>
        );

      case 'complete':
        return result ? (
          <DownloadScreen
            result={result}
            onDownload={handleDownload}
            onStartOver={handleStartOver}
          />
        ) : (
          <div className="text-center">Loading...</div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Layout
        onSettingsClick={() => setShowSettings(true)}
        onLogoClick={handleLogoClick}
      >
        {renderStep()}
      </Layout>

      <SettingsPanel open={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};
