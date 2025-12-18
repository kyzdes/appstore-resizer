/**
 * Image Processing Utilities
 *
 * Core image resizing logic using Canvas API
 * Handles high-quality image resizing with proper aspect ratio handling
 */

import { Resolution } from '@/types';

export interface ResizeOptions {
  /** Target width */
  width: number;
  /** Target height */
  height: number;
  /** Image quality (0-1) for JPEG */
  quality?: number;
  /** Output format */
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
  /** Fill mode - how to handle aspect ratio differences */
  fillMode?: 'contain' | 'cover' | 'stretch';
  /** Background color for contain mode */
  backgroundColor?: string;
}

/**
 * Resize image to target dimensions
 */
export async function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<Blob> {
  const {
    width: targetWidth,
    height: targetHeight,
    quality = 0.92,
    format = 'image/jpeg',
    fillMode = 'contain',
    backgroundColor = '#FFFFFF',
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      try {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', {
          alpha: format === 'image/png',
          willReadFrequently: false,
        });

        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // Set canvas size to target dimensions
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Fill background (important for JPEG and contain mode)
        if (format === 'image/jpeg' || fillMode === 'contain') {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        // Calculate dimensions based on fill mode
        let sx = 0,
          sy = 0,
          sWidth = img.width,
          sHeight = img.height;
        let dx = 0,
          dy = 0,
          dWidth = targetWidth,
          dHeight = targetHeight;

        const sourceAspect = img.width / img.height;
        const targetAspect = targetWidth / targetHeight;

        if (fillMode === 'contain') {
          // Fit image inside target dimensions (letterbox/pillarbox)
          if (sourceAspect > targetAspect) {
            // Image is wider - fit to width
            dHeight = targetWidth / sourceAspect;
            dy = (targetHeight - dHeight) / 2;
          } else {
            // Image is taller - fit to height
            dWidth = targetHeight * sourceAspect;
            dx = (targetWidth - dWidth) / 2;
          }
        } else if (fillMode === 'cover') {
          // Fill target dimensions (crop if necessary)
          if (sourceAspect > targetAspect) {
            // Image is wider - crop sides
            sWidth = img.height * targetAspect;
            sx = (img.width - sWidth) / 2;
          } else {
            // Image is taller - crop top/bottom
            sHeight = img.width / targetAspect;
            sy = (img.height - sHeight) / 2;
          }
        }
        // 'stretch' mode uses default values (full canvas)

        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image
        ctx.drawImage(
          img,
          sx,
          sy,
          sWidth,
          sHeight,
          dx,
          dy,
          dWidth,
          dHeight
        );

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          format,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Resize image to multiple resolutions
 */
export async function resizeToMultipleResolutions(
  file: File,
  resolutions: Resolution[],
  onProgress?: (current: number, total: number) => void
): Promise<Map<string, Blob>> {
  const results = new Map<string, Blob>();

  for (let i = 0; i < resolutions.length; i++) {
    const resolution = resolutions[i];
    const key = `${resolution.width}x${resolution.height}`;

    try {
      const blob = await resizeImage(file, {
        width: resolution.width,
        height: resolution.height,
        fillMode: 'contain',
      });

      results.set(key, blob);
      onProgress?.(i + 1, resolutions.length);
    } catch (error) {
      console.error(`Failed to resize to ${key}:`, error);
      throw error;
    }
  }

  return results;
}

/**
 * Create image preview (thumbnail)
 */
export async function createImagePreview(
  file: File,
  maxSize: number = 200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // Calculate thumbnail dimensions
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to data URL
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Generate filename for resized image with folder structure
 * Format: {device}/{diagonal}/{filename}_{width}x{height}.{ext}
 */
export function generateResizedFilename(
  originalFilename: string,
  resolution: Resolution,
  index?: number
): string {
  const nameWithoutExt = originalFilename.replace(/\.[^/.]+$/, '');
  const ext = originalFilename.split('.').pop() || 'jpg';

  // Create folder structure: device/diagonal
  const deviceFolder = resolution.device.toLowerCase().replace(/\s+/g, '-');
  const diagonalFolder = resolution.diagonal.replace(/["']/g, '');

  const prefix = index !== undefined ? `${index + 1}_` : '';
  const filename = `${prefix}${nameWithoutExt}_${resolution.width}x${resolution.height}.${ext}`;

  // Return path with folder structure
  return `${deviceFolder}/${diagonalFolder}/${filename}`;
}
