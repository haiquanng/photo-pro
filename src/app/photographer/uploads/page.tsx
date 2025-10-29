"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhotoUploader } from '@/components/photographer/photo-uploader';
import { getPhotographerProjects } from '@/data/mock/projects';
import { toast } from 'sonner';

export default function UploadPhotosPage() {
  // Get accepted projects for photographer
  const allProjects = getPhotographerProjects('photographer-1');
  const acceptedProjects = allProjects.filter(p =>
    ['Accepted', 'In Progress'].includes(p.status)
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const selectedProject = acceptedProjects.find(p => p.id === selectedProjectId);

  const handleUploadComplete = () => {
    toast.success('Upload thành công!', {
      description: `Đã upload ảnh lên dự án "${selectedProject?.title}"`
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            asChild
          >
            <Link href="/photographer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Camera className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Upload ảnh dự án
              </h1>
              <p className="text-gray-600 mt-1">
                Upload ảnh RAW và preview cho khách hàng xem
              </p>
            </div>
          </div>
        </div>

        {/* Project Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Chọn dự án</CardTitle>
            <CardDescription>
              Chọn dự án bạn muốn upload ảnh
            </CardDescription>
          </CardHeader>
          <CardContent>
            {acceptedProjects.length === 0 ? (
              <div className="text-center py-8">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Bạn chưa có dự án nào được phân công
                </p>
                <Button asChild>
                  <Link href="/photographer/available-projects">
                    Xem dự án khả dụng
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn một dự án..." />
                  </SelectTrigger>
                  <SelectContent>
                    {acceptedProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{project.title}</span>
                          <span className="text-xs text-gray-500">
                            {project.clientName} • {new Date(project.scheduledDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selected Project Info */}
                {selectedProject && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                      <div>
                        <span className="font-medium">Khách hàng:</span> {selectedProject.clientName}
                      </div>
                      <div>
                        <span className="font-medium">Loại:</span> {selectedProject.type}
                      </div>
                      <div>
                        <span className="font-medium">Địa điểm:</span> {selectedProject.location}
                      </div>
                      <div>
                        <span className="font-medium">Ngày chụp:</span>{' '}
                        {new Date(selectedProject.scheduledDate).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Area */}
        {selectedProjectId && (
          <PhotoUploader
            projectId={selectedProjectId}
            onUploadComplete={handleUploadComplete}
            maxFiles={200}
            maxSizeMB={100}
          />
        )}
      </div>
    </div>
  );
}
