/**
 * Upload Hook
 *
 * Manages file upload state and validation
 */

import * as React from 'react';
import { UploadedImage } from '@/types';
import { validateFiles } from '@/utils/validators';
import { createImagePreview } from '@/utils/imageProcessor';
import { useToast } from './useToast';

export const useUpload = () => {
  const [images, setImages] = React.useState<UploadedImage[]>([]);
  const [isValidating, setIsValidating] = React.useState(false);
  const { error: showError } = useToast();

  const addImages = React.useCallback(
    async (files: File[]) => {
      setIsValidating(true);

      try {
        // Validate files
        const validation = await validateFiles(files, images.length);

        if (!validation.valid) {
          showError('Upload Error', validation.error);
          setIsValidating(false);
          return false;
        }

        // Create uploaded images with previews
        const newImages: UploadedImage[] = await Promise.all(
          files.map(async (file) => {
            const preview = await createImagePreview(file);
            return {
              id: `${Date.now()}-${Math.random()}`,
              file,
              preview,
              name: file.name,
              size: file.size,
              type: file.type,
            };
          })
        );

        setImages((prev) => [...prev, ...newImages]);
        setIsValidating(false);
        return true;
      } catch (err) {
        console.error('Error adding images:', err);
        showError('Upload Error', 'Failed to process images');
        setIsValidating(false);
        return false;
      }
    },
    [images.length, showError]
  );

  const removeImage = React.useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        // Revoke preview URL to free memory
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const clearImages = React.useCallback(() => {
    // Revoke all preview URLs
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });
    setImages([]);
  }, [images]);

  // Use a ref to track current images for unmount cleanup
  const imagesRef = React.useRef(images);
  imagesRef.current = images;

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  return {
    images,
    addImages,
    removeImage,
    clearImages,
    isValidating,
  };
};
