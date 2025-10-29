import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Camera, 
  Clock, 
  MapPin, 
  User, 
  Upload,
  TrendingUp,
  Eye,
  MessageSquare
} from 'lucide-react';
import { mockProjects } from '@/data/mock/projects';

export default function PhotographerDashboard() {
  // Get projects assigned to photographer-1 (Trần Văn Hùng)
  const photographerProjects = mockProjects.filter(p => p.photographerId === 'photographer-1');
  
  const upcomingShoots = photographerProjects
    .filter(p => ['Accepted', 'In Progress'].includes(p.status))
    .map(project => ({
      id: project.id,
      client: project.clientName,
      type: project.type,
      date: new Date(project.scheduledDate).toLocaleDateString('vi-VN'),
      time: new Date(project.scheduledDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      location: project.location,
      status: project.status === 'Accepted' ? 'Confirmed' : 'In Progress',
      priority: 'High',
      hashId: project.hashId
    }));

  const recentProjects = photographerProjects.map(project => ({
    id: project.id,
    title: project.title,
    client: project.clientName,
    status: project.status,
    progress: project.status === 'Completed' ? 100 : 
             project.status === 'Photos Uploaded' ? 80 :
             project.status === 'In Progress' ? 60 : 0,
    dueDate: new Date(project.scheduledDate).toLocaleDateString('vi-VN'),
    photos: project.files.length,
    hashId: project.hashId,
    comments: project.comments.length
  }));

  const stats = [
    { label: 'Dự án tháng này', value: photographerProjects.length.toString(), change: '+2', trend: 'up' },
    { label: 'Dự án hoàn thành', value: photographerProjects.filter(p => p.status === 'Completed').length.toString(), change: '+1', trend: 'up' },
    { label: 'Đánh giá trung bình', value: '4.9', change: '+0.1', trend: 'up' },
    { label: 'Tổng thu nhập', value: '45M VND', change: '+5M', trend: 'up' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Photographer Dashboard</h1>
        <p className="text-gray-600">Quản lý dự án chụp ảnh và portfolio của bạn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Shoots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Dự án sắp tới</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingShoots.map((shoot) => (
                <div key={shoot.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{shoot.client}</h4>
                        <Badge variant={shoot.priority === 'High' ? 'destructive' : 'secondary'}>
                          {shoot.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{shoot.type.replace('-', ' ')} Photography</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{shoot.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{shoot.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{shoot.location}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Hash: {shoot.hashId}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={
                        shoot.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }>
                        {shoot.status === 'Confirmed' ? 'Xác nhận' : 'Đang xử lý'}
                      </Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/photographer/projects/${shoot.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Xem chi tiết
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-purple-600" />
              <span>Dự án gần đây</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <Badge className={
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      project.status === 'Photos Uploaded' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {project.status === 'Completed' ? 'Hoàn thành' :
                       project.status === 'Photos Uploaded' ? 'Đã upload' :
                       project.status === 'In Progress' ? 'Đang xử lý' : project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Client: {project.client}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tiến độ</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Hạn: {project.dueDate}</span>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <Camera className="h-3 w-3 mr-1" />
                        {project.photos} ảnh
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {project.comments} comments
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/photographer/projects/${project.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Xem chi tiết
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/photographer/projects/${project.id}`}>
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Forum
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="flex flex-col items-center space-y-2 h-auto py-6">
              <Upload className="w-6 h-6" />
              <span>Upload ảnh</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Calendar className="w-6 h-6" />
              <span>Xem lịch</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Camera className="w-6 h-6" />
              <span>Portfolio</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <User className="w-6 h-6" />
              <span>Hồ sơ</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
