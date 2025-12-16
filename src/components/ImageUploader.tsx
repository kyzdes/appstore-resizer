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
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : isDarkMode
              ? 'border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
        <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        <p className={isDarkMode ? 'text-gray-100 mb-2' : 'text-gray-700 mb-2'}>
          {texts.dropTitle}
        </p>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          {texts.dropSubtitle}
        </p>
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
      <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        {preview ? (
          <img
            src={preview}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
        aria-label="Remove image"
      >
        <X className="w-4 h-4" />
      </button>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2 truncate text-center`}>
        {file.name}
      </p>
    </div>
  );
}
