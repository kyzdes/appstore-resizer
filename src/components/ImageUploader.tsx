import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  uploadedFiles: File[];
  onRemoveFile: (index: number) => void;
}

export function ImageUploader({ onFilesSelected, uploadedFiles, onRemoveFile }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: FileList | null): File[] => {
    if (!files) return [];

    const validFiles: File[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    Array.from(files).forEach(file => {
      if (allowedTypes.includes(file.type)) {
        validFiles.push(file);
      } else {
        alert(`Файл "${file.name}" имеет неподдерживаемый формат. Разрешены только JPEG и PNG.`);
      }
    });

    return validFiles;
  };

  const handleFileSelect = (files: FileList | null) => {
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      const totalFiles = uploadedFiles.length + validFiles.length;
      if (totalFiles > 10) {
        alert(`Можно загрузить максимум 10 файлов. У вас уже загружено ${uploadedFiles.length} файлов.`);
        const allowedCount = 10 - uploadedFiles.length;
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
        <p className="text-gray-700 mb-2">
          Перетащите файлы сюда или нажмите для выбора
        </p>
        <p className="text-gray-500">
          JPEG или PNG, до 10 файлов
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
}

function FilePreview({ file, onRemove }: FilePreviewProps) {
  const [preview, setPreview] = useState<string>('');

  // Generate preview
  const reader = new FileReader();
  reader.onloadend = () => {
    setPreview(reader.result as string);
  };
  reader.readAsDataURL(file);

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
      <p className="text-gray-600 mt-2 truncate text-center">
        {file.name}
      </p>
    </div>
  );
}
