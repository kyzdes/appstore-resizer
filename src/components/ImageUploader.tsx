import { useEffect, useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  uploadedFiles: File[];
  onRemoveFile: (index: number) => void;
  maxFiles: number;
  maxFileSizeMB: number;
  texts: {
    dropTitle: string;
    dropSubtitle: string;
    helperFormats: string;
    helperCount: string;
    helperSize: string;
    alertUnsupported: (name: string) => string;
    alertTooLarge: (name: string) => string;
    alertTooMany: (current: number, limit: number) => string;
  };
  isDarkMode?: boolean;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export function ImageUploader({
  onFilesSelected,
  uploadedFiles,
  onRemoveFile,
  maxFiles,
  maxFileSizeMB,
  texts,
  isDarkMode = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_BYTES = maxFileSizeMB * 1024 * 1024;

  const validateFiles = (files: FileList | null): File[] => {
    if (!files) return [];

    const validFiles: File[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    Array.from(files).forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(texts.alertUnsupported(file.name));
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert(texts.alertTooLarge(file.name));
        return;
      }

      validFiles.push(file);
    });

    return validFiles;
  };

  const handleFileSelect = (files: FileList | null) => {
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      const totalFiles = uploadedFiles.length + validFiles.length;
      if (totalFiles > maxFiles) {
        alert(texts.alertTooMany(uploadedFiles.length, maxFiles));
        const allowedCount = maxFiles - uploadedFiles.length;
        if (allowedCount > 0) {
          onFilesSelected([...uploadedFiles, ...validFiles.slice(0, allowedCount)]);
        }
      } else {
        onFilesSelected([...uploadedFiles, ...validFiles]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
          isDarkMode
            ? 'bg-[#111827] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)]'
            : 'bg-gray-100 shadow-sm'
        } ${isDragging ? 'scale-[1.02] ring-2 ring-blue-500/60' : ''}`}
      >
        {/* Gradient overlay on drag */}
        {isDragging && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />
        )}

        {/* Content */}
        <div className="relative z-10">
          <Upload className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
            isDragging
              ? 'text-blue-500 scale-110 animate-bounce'
              : isDarkMode
                ? 'text-gray-500 group-hover:text-blue-400 group-hover:scale-105'
                : 'text-gray-400 group-hover:text-blue-500 group-hover:scale-105'
          }`} />

          <p className={`text-lg font-medium mb-2 transition-colors ${
            isDragging
              ? 'text-blue-600'
              : isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {texts.dropTitle}
          </p>

          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            {texts.dropSubtitle}
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedFiles.map((file, index) => (
            <FilePreview
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => onRemoveFile(index)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  isDarkMode: boolean;
}

function FilePreview({ file, onRemove, isDarkMode }: FilePreviewProps) {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isMounted) {
        setPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    return () => {
      isMounted = false;
    };
  }, [file]);

  return (
    <div className="relative group">
      {/* Preview card */}
      <div
        className={`rounded-xl overflow-hidden aspect-[9/16] relative transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-900 border border-slate-800 shadow-[0_15px_45px_-30px_rgba(0,0,0,0.9)]'
            : 'bg-gray-50 border border-gray-200 shadow-sm'
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
          }`}>
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Remove button - small neomorphic raised button */}
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 z-10 rounded-full p-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Remove image"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Filename */}
      <div className={`mt-2 rounded-lg px-3 py-2 text-center ${
        isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'
      }`}>
        <p className={`text-sm truncate ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {file.name}
        </p>
        <p className={`text-xs ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {formatBytes(file.size)}
        </p>
      </div>
    </div>
  );
}
