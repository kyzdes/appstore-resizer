/**
 * Premium File Upload Component
 *
 * Features:
 * - Drag and drop with visual feedback
 * - Click to browse files
 * - File validation (type, size, count)
 * - Preview thumbnails
 * - Remove files
 * - Smooth animations
 * - Full accessibility
 * - Error states
 */

import * as React from 'react';
import { Upload, X, FileImage, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './Button';
import { useLocale } from '@/hooks/useLocale';

export interface FileUploadProps {
  /** Accepted file types */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Current uploaded files */
  files?: File[];
  /** Callback when files are added */
  onFilesChange?: (files: File[]) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
  /** Show file previews */
  showPreviews?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = 'image/jpeg,image/png',
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  files = [],
  onFilesChange,
  disabled = false,
  className,
  showPreviews = true,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dragCounter = React.useRef(0);
  const { t } = useLocale();

  const validateFiles = (newFiles: File[]): { valid: File[]; error: string | null } => {
    // Check total count
    if (files.length + newFiles.length > maxFiles) {
      return {
        valid: [],
        error: t('upload.errors.tooMany', { maxFiles: maxFiles.toString() }),
      };
    }

    const validFiles: File[] = [];
    const acceptedTypes = accept.split(',').map((type) => type.trim());

    for (const file of newFiles) {
      // Check file type
      const isValidType = acceptedTypes.some((type) => {
        if (type.endsWith('/*')) {
          const baseType = type.split('/')[0];
          return file.type.startsWith(baseType + '/');
        }
        return file.type === type;
      });

      if (!isValidType) {
        return {
          valid: [],
          error: t('upload.errors.invalidType'),
        };
      }

      // Check file size
      if (file.size > maxSize) {
        return {
          valid: [],
          error: t('upload.errors.tooLarge', {
            filename: file.name,
            maxSize: formatFileSize(maxSize),
          }),
        };
      }

      validFiles.push(file);
    }

    return { valid: validFiles, error: null };
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    const filesArray = Array.from(newFiles);
    const { valid, error: validationError } = validateFiles(filesArray);

    if (validationError) {
      setError(validationError);
      setTimeout(() => setError(null), 5000);
      return;
    }

    setError(null);
    onFilesChange?.([...files, ...valid]);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange?.(newFiles);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          'relative flex flex-col items-center justify-center',
          'rounded-xl border-2 border-dashed',
          'px-8 py-12 transition-all duration-300 ease-out',
          'cursor-pointer group',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-accent/50',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
          aria-label="File input"
        />

        {/* Icon with animation */}
        <div
          className={cn(
            'mb-4 rounded-full p-4',
            'bg-primary/10 transition-transform duration-300',
            isDragging ? 'scale-110' : 'group-hover:scale-105'
          )}
        >
          <Upload
            className={cn(
              'h-8 w-8 text-primary transition-transform duration-300',
              isDragging && 'animate-bounce'
            )}
          />
        </div>

        {/* Text content */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">
            {t('upload.dropzone.title')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('upload.dropzone.subtitle')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('upload.dropzone.formats', {
              maxFiles: maxFiles.toString(),
              maxSize: formatFileSize(maxSize),
            })}
          </p>
        </div>

        {/* Drag overlay effect */}
        {isDragging && (
          <div
            className="absolute inset-0 rounded-xl bg-primary/5 border-2 border-primary pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Error message */}
      {error && (
        <div
          className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive animate-in slide-in-from-top-2"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* File previews */}
      {showPreviews && files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {t('upload.filesSelected', { count: files.length })}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {files.map((file, index) => (
              <FilePreview
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => removeFile(index)}
                removeLabel={t('upload.removeFile')}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// File Preview Component
interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  removeLabel: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, removeLabel }) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file]);

  return (
    <div
      className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-accent/50 animate-in fade-in-0 zoom-in-95 duration-300"
    >
      {/* Image preview or fallback */}
      {preview ? (
        <img
          src={preview}
          alt={file.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <FileImage className="h-8 w-8 text-muted-foreground" />
        </div>
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <Button
          size="icon"
          variant="destructive"
          onClick={onRemove}
          className="h-8 w-8"
          ariaLabel={removeLabel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* File name tooltip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-xs text-white truncate">{file.name}</p>
        <p className="text-xs text-white/70">{formatFileSize(file.size)}</p>
      </div>
    </div>
  );
};

// Utility function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
