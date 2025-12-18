/**
 * Validation Utilities
 *
 * Functions for validating files, images, and user inputs
 */

/**
 * Supported image MIME types
 */
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

/**
 * Maximum file size (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Maximum number of files
 */
export const MAX_FILES = 10;

/**
 * Minimum image dimensions
 */
export const MIN_IMAGE_WIDTH = 100;
export const MIN_IMAGE_HEIGHT = 100;

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate file type
 */
export function validateFileType(file: File): ValidationResult {
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Only JPEG, PNG, and WebP images are supported.`,
    };
  }
  return { valid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(file: File): ValidationResult {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File "${file.name}" is too large. Maximum size is ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB.`,
    };
  }
  return { valid: true };
}

/**
 * Validate image dimensions
 */
export async function validateImageDimensions(
  file: File
): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      if (img.width < MIN_IMAGE_WIDTH || img.height < MIN_IMAGE_HEIGHT) {
        resolve({
          valid: false,
          error: `Image dimensions are too small. Minimum size is ${MIN_IMAGE_WIDTH}×${MIN_IMAGE_HEIGHT}px.`,
        });
      } else {
        resolve({ valid: true });
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        valid: false,
        error: 'Failed to load image. The file may be corrupted.',
      });
    };

    img.src = url;
  });
}

/**
 * Validate file - comprehensive check
 */
export async function validateFile(file: File): Promise<ValidationResult> {
  // Check file type
  const typeResult = validateFileType(file);
  if (!typeResult.valid) return typeResult;

  // Check file size
  const sizeResult = validateFileSize(file);
  if (!sizeResult.valid) return sizeResult;

  // Check image dimensions
  const dimensionsResult = await validateImageDimensions(file);
  if (!dimensionsResult.valid) return dimensionsResult;

  return { valid: true };
}

/**
 * Validate multiple files
 */
export async function validateFiles(
  files: File[],
  existingFilesCount: number = 0
): Promise<ValidationResult> {
  // Check total count
  if (existingFilesCount + files.length > MAX_FILES) {
    return {
      valid: false,
      error: `Maximum ${MAX_FILES} files allowed. You are trying to add ${files.length} file(s) to ${existingFilesCount} existing file(s).`,
    };
  }

  // Validate each file
  for (const file of files) {
    const result = await validateFile(file);
    if (!result.valid) return result;
  }

  return { valid: true };
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(file.type);
}

/**
 * Get image dimensions from file
 */
export async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
