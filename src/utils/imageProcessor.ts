import JSZip from 'jszip';
import type { Resolution } from '../App';

export async function processImages(
  files: File[],
  resolutions: Resolution[],
  onProgress: (progress: number) => void
): Promise<void> {
  const zip = new JSZip();
  const totalOperations = files.length * resolutions.length;
  const totalWorkUnits = totalOperations + 1; // include zip generation as a step
  let completedOperations = 0;

  for (const file of files) {
    // Load image
    const imageData = await loadImage(file);
    const originalFileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
    const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
    const mimeType: 'image/png' | 'image/jpeg' = isPng ? 'image/png' : 'image/jpeg';
    const outputExtension = isPng ? 'png' : 'jpg';

    for (const resolution of resolutions) {
      // Process image for this resolution
      const processedBlob = await resizeImage(
        imageData,
        resolution.width,
        resolution.height,
        mimeType
      );

      // Add to zip with naming convention: {original_name}_{width}x{height}.{ext}
      const fileName = `${originalFileName}_${resolution.width}x${resolution.height}.${outputExtension}`;
      const folderPath = `${resolution.device}/${resolution.diagonal}`;
      const targetFolder = zip.folder(folderPath) ?? zip;
      targetFolder.file(fileName, processedBlob);

      // Update progress
      completedOperations++;
      onProgress((completedOperations / totalWorkUnits) * 100);
    }
  }

  // Generate ZIP file
  const zipBlob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
    (metadata) => {
      onProgress(((totalOperations + metadata.percent / 100) / totalWorkUnits) * 100);
    }
  );

  // Download ZIP file
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `app-store-screenshots-${Date.now()}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizeImage(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  mimeType: 'image/png' | 'image/jpeg'
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    // Calculate scaling and positioning to maintain aspect ratio (cover mode)
    const sourceAspect = image.width / image.height;
    const targetAspect = targetWidth / targetHeight;

    let drawWidth = targetWidth;
    let drawHeight = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (sourceAspect > targetAspect) {
      // Source is wider - fit height and crop width
      drawHeight = targetHeight;
      drawWidth = drawHeight * sourceAspect;
      offsetX = (targetWidth - drawWidth) / 2;
    } else {
      // Source is taller - fit width and crop height
      drawWidth = targetWidth;
      drawHeight = drawWidth / sourceAspect;
      offsetY = (targetHeight - drawHeight) / 2;
    }

    // Fill background with white (for PNG transparency)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // Use high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw image
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

    // Convert to blob
    const quality = mimeType === 'image/png' ? undefined : 1; // Max quality for JPEG

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      mimeType,
      quality
    );
  });
}
