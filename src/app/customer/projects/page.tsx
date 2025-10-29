"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderView, FolderItem } from '@/components/file-explorer/folder-view';
import { getClientProjects } from '@/data/mock/projects';
import { ProjectStatus } from '@/types';

export default function CustomerProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');

  // Get projects for client
  const projects = getClientProjects('client-1');

  // Convert projects to folder items
  const folderItems: FolderItem[] = projects.map(project => ({
    id: project.id,
    name: project.title,
    type: 'folder',
    thumbnail: project.coverImage,
    fileCount: project.files.length,
    modifiedAt: project.updatedAt,
    status:
      project.status === 'Pending' ? 'pending' :
      project.status === 'Completed' || project.status === 'Delivered' ? 'completed' :
      project.status === 'Photos Uploaded' ? 'new' :
      project.files.length > 0 ? 'updated' : undefined
  }));

  // Filter items
  const filteredItems = folderItems.filter(item => {
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus = statusFilter === 'all' || (() => {
      const project = projects.find(p => p.id === item.id);
      return project?.status === statusFilter;
    })();

    return matchesSearch && matchesStatus;
  });

  const handleItemClick = (item: FolderItem) => {
    router.push(`/customer/projects/${item.id}`);
  };

  const handleItemAction = (action: string, item: FolderItem) => {
    if (action === 'open') {
      router.push(`/customer/projects/${item.id}`);
    } else if (action === 'download') {
      console.log('Download project:', item.id);
      // Implement download logic
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dự án của tôi
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý {projects.length} dự án chụp ảnh
          </p>
        </div>
        <Button asChild>
          <Link href="/customer/projects/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tạo dự án mới
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm dự án..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-64">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="Pending">Đang chờ</SelectItem>
              <SelectItem value="Accepted">Đã nhận</SelectItem>
              <SelectItem value="In Progress">Đang thực hiện</SelectItem>
              <SelectItem value="Photos Uploaded">Đã upload ảnh</SelectItem>
              <SelectItem value="Under Review">Đang review</SelectItem>
              <SelectItem value="Completed">Hoàn thành</SelectItem>
              <SelectItem value="Delivered">Đã giao</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Tổng dự án</p>
          <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Đang chờ</p>
          <p className="text-2xl font-bold text-orange-600">
            {projects.filter(p => p.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Đang thực hiện</p>
          <p className="text-2xl font-bold text-blue-600">
            {projects.filter(p => ['Accepted', 'In Progress', 'Photos Uploaded'].includes(p.status)).length}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Hoàn thành</p>
          <p className="text-2xl font-bold text-green-600">
            {projects.filter(p => p.status === 'Completed' || p.status === 'Delivered').length}
          </p>
        </div>
      </div>

      {/* Folder View */}
      <div className="bg-white border rounded-lg p-6">
        <FolderView
          items={filteredItems}
          onItemClick={handleItemClick}
          onItemAction={handleItemAction}
          viewMode="grid"
          sortBy="date"
        />
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          💡 Mẹo sử dụng
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click vào dự án để xem chi tiết và ảnh</li>
          <li>• Dự án có badge Mới có ảnh mới được upload</li>
          <li>• Bạn có thể review và comment trực tiếp trên ảnh</li>
          <li>• Tải xuống tất cả ảnh sau khi thanh toán (Client Regular) hoặc ngay lập tức (Client VIP)</li>
        </ul>
      </div>
    </div>
  );
}
