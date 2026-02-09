/**
 * Image Processor Hook
 *
 * Orchestrates image processing workflow:
 * 1. Resize images to selected resolutions
 * 2. Create ZIP archive
 * 3. Provide download
 */

import * as React from 'react';
import { UploadedImage, Resolution, ProcessingStatus, ProcessedResult } from '@/types';
import { resizeImage, generateResizedFilename } from '@/utils/imageProcessor';
import { createZipFile, generateZipFilename } from '@/utils/zipGenerator';
import { formatFileSize } from '@/utils/formatters';
import { useToast } from './useToast';
import { useImageSettings } from './useImageSettings';

export const useImageProcessor = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStatus, setProcessingStatus] = React.useState<ProcessingStatus | null>(
    null
  );
  const [result, setResult] = React.useState<ProcessedResult | null>(null);
  const { success: showSuccess, error: showError } = useToast();
  const { settings } = useImageSettings();

  const processImages = React.useCallback(
    async (images: UploadedImage[], resolutions: Resolution[]) => {
      if (images.length === 0 || resolutions.length === 0) {
        showError('Processing Error', 'No images or resolutions selected');
        return false;
      }

      setIsProcessing(true);
      // Track start time for analytics if needed
      // const startTime = Date.now();

      try {
        const totalOperations = images.length * resolutions.length;
        let currentOperation = 0;

        // Array to hold all resized images
        const resizedFiles: Array<{ filename: string; data: Blob }> = [];

        // Stage 1: Preparing
        setProcessingStatus({
          total: totalOperations,
          current: 0,
          currentImage: images[0].name,
          currentResolution: `${resolutions[0].width}×${resolutions[0].height}`,
          percentage: 0,
          stage: 'preparing',
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Stage 2: Resizing
        setProcessingStatus((prev) => prev && { ...prev, stage: 'resizing' });

        for (let i = 0; i < images.length; i++) {
          const image = images[i];

          for (let j = 0; j < resolutions.length; j++) {
            const resolution = resolutions[j];

            // Update progress
            currentOperation++;
            setProcessingStatus({
              total: totalOperations,
              current: currentOperation,
              currentImage: image.name,
              currentResolution: `${resolution.width}×${resolution.height}`,
              percentage: Math.round((currentOperation / totalOperations) * 100),
              stage: 'resizing',
            });

            // Resize image using user settings
            const resizedBlob = await resizeImage(image.file, {
              width: resolution.width,
              height: resolution.height,
              quality: settings.jpegQuality / 100, // Convert 0-100 to 0-1
              fillMode: settings.fillMode,
              backgroundColor: settings.backgroundColor,
            });

            // Generate filename
            const filename = generateResizedFilename(
              image.name,
              resolution,
              images.length > 1 ? i : undefined
            );

            resizedFiles.push({ filename, data: resizedBlob });

            // Small delay to allow UI updates
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
        }

        // Stage 3: Archiving
        setProcessingStatus((prev) => prev && { ...prev, stage: 'archiving' });

        const zipBlob = await createZipFile(resizedFiles, (progress) => {
          setProcessingStatus(
            (prev) =>
              prev && {
                ...prev,
                percentage: Math.round(progress),
                stage: 'archiving',
              }
          );
        });

        // Stage 4: Complete
        // Processing time can be used for analytics
        // const processingTime = Date.now() - startTime;

        const processedResult: ProcessedResult = {
          totalImages: images.length,
          totalResolutions: resolutions.length,
          fileSize: zipBlob.size,
          downloadUrl: URL.createObjectURL(zipBlob),
          timestamp: new Date(),
        };

        setResult(processedResult);
        setProcessingStatus((prev) => prev && { ...prev, stage: 'complete', percentage: 100 });

        // Show success message
        showSuccess(
          'Processing Complete!',
          `${totalOperations} images ready for download (${formatFileSize(zipBlob.size)})`
        );

        setIsProcessing(false);
        return true;
      } catch (err) {
        console.error('Error processing images:', err);
        showError('Processing Failed', 'An error occurred while processing images');
        setIsProcessing(false);
        setProcessingStatus(null);
        return false;
      }
    },
    [showSuccess, showError, settings]
  );

  const downloadResult = React.useCallback(() => {
    if (!result) return;

    const filename = generateZipFilename('appstore-screenshots');

    // Download directly from the existing blob URL instead of re-fetching it
    const link = document.createElement('a');
    link.href = result.downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess('Download Started', 'Your screenshots ZIP is downloading');
  }, [result, showSuccess]);

  const reset = React.useCallback(() => {
    // Revoke download URL to free memory
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }

    setIsProcessing(false);
    setProcessingStatus(null);
    setResult(null);
  }, [result]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (result?.downloadUrl) {
        URL.revokeObjectURL(result.downloadUrl);
      }
    };
  }, [result]);

  return {
    isProcessing,
    processingStatus,
    result,
    processImages,
    downloadResult,
    reset,
  };
};
