/**
 * ZIP File Generation Utilities
 *
 * Creates ZIP archives of processed images using JSZip
 */

import JSZip from 'jszip';

export interface ZipFileEntry {
  /** Filename in the ZIP */
  filename: string;
  /** File data */
  data: Blob;
}

/**
 * Create ZIP file from multiple files
 */
export async function createZipFile(
  files: ZipFileEntry[],
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const zip = new JSZip();

  // Add all files to ZIP
  for (const file of files) {
    zip.file(file.filename, file.data);
  }

  // Generate ZIP with progress tracking
  const blob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6, // Balanced compression
      },
    },
    (metadata) => {
      // Progress callback
      if (onProgress) {
        onProgress(metadata.percent);
      }
    }
  );

  return blob;
}

/**
 * Download ZIP file
 */
export function downloadZipFile(blob: Blob, filename: string = 'screenshots.zip'): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Create and download ZIP file in one step
 */
export async function createAndDownloadZip(
  files: ZipFileEntry[],
  filename: string = 'screenshots.zip',
  onProgress?: (progress: number) => void
): Promise<void> {
  const blob = await createZipFile(files, onProgress);
  downloadZipFile(blob, filename);
}

/**
 * Estimate ZIP file size (rough approximation)
 */
export function estimateZipSize(files: ZipFileEntry[]): number {
  // Rough estimate: sum of file sizes * 0.9 (assuming 10% compression)
  const totalSize = files.reduce((sum, file) => sum + file.data.size, 0);
  return Math.round(totalSize * 0.9);
}

/**
 * Generate default ZIP filename with timestamp
 */
export function generateZipFilename(prefix: string = 'appstore-screenshots'): string {
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.]/g, '-').split('T')[0];
  return `${prefix}_${timestamp}.zip`;
}
