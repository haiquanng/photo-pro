"use client";

import Link from 'next/link';
import { PlusCircle, FolderOpen, Clock, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getClientProjects } from '@/data/mock/projects';

export default function CustomerDashboard() {
  // Mock data - in real app would use actual user ID
  const projects = getClientProjects('client-1');

  const stats = {
    total: projects.length,
    pending: projects.filter(p => p.status === 'Pending').length,
    inProgress: projects.filter(p => ['Accepted', 'In Progress', 'Photos Uploaded'].includes(p.status)).length,
    completed: projects.filter(p => p.status === 'Completed' || p.status === 'Delivered').length,
  };

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Xin chào, Nguyễn Minh Tuấn! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Quản lý dự án chụp ảnh nội thất của bạn
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/customer/projects/new">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <PlusCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Tạo dự án mới</CardTitle>
                  <CardDescription>
                    Đặt lịch chụp ảnh nội thất
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/customer/projects">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Xem tất cả dự án</CardTitle>
                  <CardDescription>
                    Quản lý {stats.total} dự án của bạn
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Đang chờ</CardDescription>
            <CardTitle className="text-3xl">{stats.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              Chờ photographer nhận
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Đang thực hiện</CardDescription>
            <CardTitle className="text-3xl">{stats.inProgress}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-orange-600">
              <ImageIcon className="h-4 w-4 mr-1" />
              Đang chụp/chỉnh sửa
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Hoàn thành</CardDescription>
            <CardTitle className="text-3xl">{stats.completed}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Đã giao ảnh
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Dự án gần đây</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/customer/projects">
                Xem tất cả
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Chưa có dự án nào</p>
              <Button asChild>
                <Link href="/customer/projects/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tạo dự án đầu tiên
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/customer/projects/${project.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                        <Badge variant={
                          project.status === 'Completed' || project.status === 'Delivered'
                            ? 'default'
                            : project.status === 'Pending'
                            ? 'secondary'
                            : 'outline'
                        }>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{project.location}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(project.scheduledDate).toLocaleDateString('vi-VN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    {project.photographerName && (
                      <div className="text-right text-sm">
                        <p className="text-gray-600">Photographer:</p>
                        <p className="font-medium">{project.photographerName}</p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
