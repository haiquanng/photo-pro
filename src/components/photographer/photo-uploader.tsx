"use client";

import { useState, useCallback } from 'react';
import { Upload, X, Check, AlertCircle, Image as ImageIcon, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PhotoFile {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

interface PhotoUploaderProps {
  projectId: string;
  onUploadComplete?: (files: PhotoFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export function PhotoUploader({
  onUploadComplete,
  maxFiles = 100,
  maxSizeMB = 50
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<PhotoFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = (fileList: FileList) => {
    const newFiles: PhotoFile[] = [];

    Array.from(fileList).forEach((file) => {
      // Validate file type
      const isImage = file.type.startsWith('image/') || file.name.match(/\.(raw|cr2|nef|arw|dng)$/i);

      if (!isImage) {
        return;
      }

      // Validate file size
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        return;
      }

      // Create preview for regular images
      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        progress: 0,
        status: 'pending'
      });
    });

    setFiles(prev => [...prev, ...newFiles].slice(0, maxFiles));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const { files: droppedFiles } = e.dataTransfer;
    if (droppedFiles) {
      processFiles(droppedFiles);
    }
  }, [maxFiles, maxSizeMB]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target;
    if (selectedFiles) {
      processFiles(selectedFiles);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + 10, 100);
          const newStatus = newProgress === 100 ? 'completed' : 'uploading';
          return { ...file, progress: newProgress, status: newStatus };
        }
        return file;
      }));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
    }, 3000);
  };

  const uploadAll = () => {
    files.forEach(file => {
      if (file.status === 'pending') {
        simulateUpload(file.id);
      }
    });

    // Simulate completion callback
    setTimeout(() => {
      const completedFiles = files.filter(f => f.status === 'completed');
      onUploadComplete?.(completedFiles);
    }, 4000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const totalSize = files.reduce((sum, file) => sum + file.file.size, 0);
  const uploadedCount = files.filter(f => f.status === 'completed').length;
  const uploadingCount = files.filter(f => f.status === 'uploading').length;

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        )}
      >
        <Upload className={cn(
          "h-16 w-16 mx-auto mb-4",
          isDragging ? "text-blue-500" : "text-gray-400"
        )} />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Kéo thả ảnh vào đây hoặc click để chọn
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Hỗ trợ: JPG, PNG, RAW, CR2, NEF (Tối đa {maxSizeMB}MB/file)
        </p>
        <input
          type="file"
          multiple
          accept="image/*,.raw,.cr2,.nef,.arw,.dng"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button type="button" onClick={() => document.getElementById('file-upload')?.click()}>
            Chọn ảnh từ máy
          </Button>
        </label>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                Đã chọn {files.length} file ({formatFileSize(totalSize)})
              </h3>
              <p className="text-sm text-gray-600">
                {uploadedCount} đã upload, {uploadingCount} đang upload
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiles([])}
                disabled={uploadingCount > 0}
              >
                Xóa tất cả
              </Button>
              <Button
                size="sm"
                onClick={uploadAll}
                disabled={files.every(f => f.status !== 'pending')}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload tất cả
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((file) => (
              <div key={file.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <File className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Status Overlay */}
                  {file.status !== 'pending' && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      {file.status === 'uploading' && (
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-white text-xs font-medium">{file.progress}%</p>
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="h-6 w-6 text-white" />
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Remove Button */}
                  {file.status === 'pending' && (
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>

                {/* File Info */}
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.file.size)}
                  </p>
                </div>

                {/* Progress Bar */}
                {file.status === 'uploading' && (
                  <Progress value={file.progress} className="mt-2 h-1" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">Lưu ý khi upload:</p>
            <ul className="text-blue-800 space-y-1">
              <li>• File RAW sẽ được lưu để backup, file preview sẽ tự động tạo</li>
              <li>• Đặt tên file rõ ràng để dễ quản lý (VD: living-room-001.jpg)</li>
              <li>• Kiểm tra kỹ ảnh trước khi upload để tránh upload nhầm</li>
              <li>• Sau khi upload xong, hãy thông báo cho khách hàng review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
