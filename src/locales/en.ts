/**
 * English Translations
 */

export const en = {
  app: {
    title: 'App Store Resizer',
    subtitle: 'Convert screenshots for Apple App Store',
  },

  header: {
    settings: 'Settings',
    toggleTheme: 'Toggle theme',
    changeLanguage: 'Change language',
  },

  footer: {
    author: 'Crafted by PRODUCTOWNER',
  },

  upload: {
    title: 'Upload Screenshots',
    subtitle: 'Start by uploading your screenshots',
    dropzone: {
      title: 'Drop images here',
      subtitle: 'or click to browse files',
      formats: 'JPEG or PNG • Max {maxFiles} files • Up to {maxSize} each',
    },
    filesSelected: '{count} file(s) selected',
    removeFile: 'Remove file',
    features: {
      allResolutions: {
        title: 'All Resolutions',
        description: 'iPhone, iPad, Apple Watch',
      },
      fastProcessing: {
        title: 'Fast Processing',
        description: 'Optimized for speed',
      },
      privateSecure: {
        title: 'Private & Secure',
        description: 'All processing done locally',
      },
    },
    errors: {
      invalidType: 'Invalid file type. Only JPEG and PNG images are allowed',
      tooLarge: 'File "{filename}" is too large. Maximum size is {maxSize}',
      tooMany: 'Maximum {maxFiles} files allowed',
      dimensionsTooSmall: 'Image dimensions are too small. Minimum size is {width}×{height}px',
      loadFailed: 'Failed to load image. The file may be corrupted',
    },
  },

  resolutions: {
    title: 'Select Resolutions',
    subtitle: 'Choose target device resolutions',
    deviceTypes: {
      all: 'All Devices',
      iPhone: 'iPhone',
      iPad: 'iPad',
      'Apple Watch': 'Apple Watch',
    },
    orientations: {
      all: 'All Orientations',
      portrait: 'Portrait',
      landscape: 'Landscape',
    },
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    selected: '{count} resolution(s) selected',
    selectResolution: 'Select',
    dimensions: '{width} × {height}',
  },

  processing: {
    title: 'Processing Images',
    subtitle: 'Please wait while we resize your screenshots',
    stages: {
      preparing: 'Preparing...',
      resizing: 'Resizing images...',
      archiving: 'Creating ZIP archive...',
      complete: 'Complete!',
    },
    status: 'Processing {current} of {total}',
    currentImage: 'Current: {filename}',
    currentResolution: 'Resolution: {resolution}',
  },

  download: {
    title: 'Ready to Download',
    subtitle: 'Your screenshots have been successfully processed',
    button: 'Download ZIP',
    downloadingButton: 'Downloading...',
    stats: {
      totalImages: 'Total images',
      totalResolutions: 'Resolutions',
      fileSize: 'File size',
      processingTime: 'Processing time',
    },
    startOver: 'Process More Images',
  },

  settings: {
    title: 'Settings',
    theme: {
      title: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    language: {
      title: 'Language',
      en: 'English',
      ru: 'Русский',
    },
    imageQuality: {
      title: 'Image Quality',
      reset: 'Reset',
      jpegQuality: 'JPEG Quality',
      jpegDescription: 'Higher values = better quality, larger file size',
      pngCompression: 'PNG Compression',
      pngDescription: 'Higher values = smaller file size, slower processing',
      fillMode: 'Fill Mode',
      fillModeDescription: 'How images fit target dimensions',
      fillModes: {
        contain: 'Contain',
        cover: 'Cover',
        stretch: 'Stretch',
      },
      backgroundColor: 'Background Color',
      backgroundDescription: 'Used for letterboxing and JPEG images',
    },
  },

  common: {
    cancel: 'Cancel',
    close: 'Close',
    confirm: 'Confirm',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    delete: 'Delete',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },

  errors: {
    generic: 'An error occurred. Please try again.',
    noImages: 'Please upload at least one image',
    noResolutions: 'Please select at least one resolution',
    processingFailed: 'Failed to process images. Please try again.',
  },
};

export type Translation = typeof en;
