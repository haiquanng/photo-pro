"use client";

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, MessageSquare, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectFile } from '@/types';

interface ImageGalleryProps {
  images: ProjectFile[];
  onCommentClick?: (image: ProjectFile) => void;
  onDownload?: (image: ProjectFile) => void;
}

export function ImageGallery({ images, onCommentClick, onDownload }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setZoom(1);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setZoom(1);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setZoom(1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setZoom(1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  // Add keyboard listener
  if (typeof window !== 'undefined' && selectedIndex !== null) {
    window.addEventListener('keydown', handleKeyDown);
  }

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const formatFileSize = (bytes: number) => {
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.thumbnailUrl || image.url}
              alt={image.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white text-center">
                <p className="text-sm font-medium truncate px-2">{image.name}</p>
                <p className="text-xs mt-1">{formatFileSize(image.size)}</p>
              </div>
            </div>

            {/* File type badge */}
            {image.fileType && (
              <Badge className="absolute top-2 left-2" variant={
                image.fileType === 'raw' ? 'destructive' :
                image.fileType === 'final' ? 'default' : 'secondary'
              }>
                {image.fileType.toUpperCase()}
              </Badge>
            )}

            {/* Version badge */}
            {image.version && image.version > 1 && (
              <Badge className="absolute top-2 right-2" variant="outline">
                v{image.version}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Image info header */}
          <div className="absolute top-4 left-4 text-white z-10">
            <h3 className="text-lg font-semibold">{selectedImage.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
              <span>{formatFileSize(selectedImage.size)}</span>
              {selectedImage.width && selectedImage.height && (
                <span>{selectedImage.width} × {selectedImage.height}</span>
              )}
              <span>{new Date(selectedImage.uploadedAt).toLocaleDateString('vi-VN')}</span>
              <span>Bởi: {selectedImage.uploadedByName}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setZoom(1)}
            >
              {Math.round(zoom * 100)}%
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
              disabled={zoom >= 3}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            {onCommentClick && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onCommentClick(selectedImage)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment
              </Button>
            )}

            {onDownload && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDownload(selectedImage)}
              >
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </Button>
            )}
          </div>

          {/* Navigation arrows */}
          {selectedIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
          )}
          {selectedIndex < images.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-12 w-12" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-7xl max-h-[80vh] overflow-auto">
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-w-full max-h-full object-contain transition-transform"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-16 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Chưa có ảnh nào được upload</p>
        </div>
      )}
    </div>
  );
}
