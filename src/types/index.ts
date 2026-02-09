/**
 * Core Type Definitions
 * App Store Screenshot Converter
 */

export type DeviceType = 'iPhone' | 'iPad' | 'Apple Watch';

export interface Resolution {
  id: string;
  width: number;
  height: number;
  diagonal: string;
  device: DeviceType;
  orientation: 'portrait' | 'landscape';
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

export interface ProcessingStatus {
  total: number;
  current: number;
  currentImage: string;
  currentResolution: string;
  percentage: number;
  stage: 'preparing' | 'resizing' | 'archiving' | 'complete';
}

export interface ProcessedResult {
  totalImages: number;
  totalResolutions: number;
  fileSize: number;
  downloadUrl: string;
  timestamp: Date;
}

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'ru';

export interface AppState {
  // Upload state
  images: UploadedImage[];
  selectedResolutions: Resolution[];

  // Processing state
  isProcessing: boolean;
  processingStatus?: ProcessingStatus;

  // Result state
  result?: ProcessedResult;

  // Settings
  theme: Theme;
  language: Language;

  // UI state
  activeStep: 'upload' | 'configure' | 'processing' | 'complete';
  showSettings: boolean;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}
