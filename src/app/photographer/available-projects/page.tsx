"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import { AvailableProjectsCard } from '@/components/photographer/available-projects-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPendingProjects } from '@/data/mock/projects';
import { Project, ProjectType } from '@/types';
import { toast } from 'sonner';

export default function AvailableProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(getPendingProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ProjectType | 'all'>('all');
  const [acceptingProjectId, setAcceptingProjectId] = useState<string | null>(null);

  const handleAcceptProject = async (projectId: string) => {
    setAcceptingProjectId(projectId);

    // Simulate API call
    setTimeout(() => {
      // Update project status
      setProjects(prev => prev.filter(p => p.id !== projectId));

      toast.success('Đã nhận dự án thành công!', {
        description: 'Dự án đã được thêm vào danh sách công việc của bạn.'
      });

      setAcceptingProjectId(null);

      // Navigate to assignments after a short delay
      setTimeout(() => {
        router.push('/photographer/assignments');
      }, 1500);
    }, 1000);
  };

  const handleViewDetails = (projectId: string) => {
    router.push(`/photographer/available-projects/${projectId}`);
  };

  // Filter and search logic
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery
      ? project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesType = filterType === 'all' || project.type === filterType;

    return matchesSearch && matchesType;
  });

  // Sort by scheduled date (soonest first)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dự án đang tìm Photographer
          </h1>
          <p className="text-gray-600 mt-2">
            Có <span className="font-semibold text-blue-600">{projects.length}</span> dự án
            đang chờ bạn nhận việc
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Search */}
            <div className="md:col-span-2 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên dự án, địa điểm, khách hàng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="w-full">
              <Select value={filterType} onValueChange={(value) => setFilterType(value as ProjectType | 'all')}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại dịch vụ</SelectItem>
                  <SelectItem value="Interior-Design">Nội thất hoàn thiện</SelectItem>
                  <SelectItem value="Construction-Progress">Tiến độ thi công</SelectItem>
                  <SelectItem value="Architecture-Exterior">Kiến trúc bên ngoài</SelectItem>
                  <SelectItem value="Before-After">Before-After</SelectItem>
                  <SelectItem value="Detail-Shots">Chi tiết nội thất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {sortedProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Không tìm thấy dự án phù hợp
              </h3>
              <p className="text-gray-600">
                {searchQuery || filterType !== 'all'
                  ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                  : 'Hiện tại chưa có dự án mới nào. Vui lòng quay lại sau.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <AvailableProjectsCard
                key={project.id}
                project={project}
                onAccept={handleAcceptProject}
                onViewDetails={handleViewDetails}
                isAccepting={acceptingProjectId === project.id}
              />
            ))}
          </div>
        )}

        {/* Info Box */}
        {sortedProjects.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Lưu ý khi nhận dự án
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Kiểm tra kỹ lịch trình và địa điểm trước khi nhận việc</li>
              <li>• Đọc kỹ mô tả và yêu cầu của khách hàng</li>
              <li>• Chuẩn bị thiết bị phù hợp với loại hình chụp</li>
              <li>• Liên hệ khách hàng để xác nhận chi tiết trước ngày chụp</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
