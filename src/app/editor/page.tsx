import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Image as ImageIcon, 
  Upload,
  Download,
  Eye,
  Edit,
  TrendingUp,
  Clock,
  Settings,
  MessageSquare
} from 'lucide-react';

export default function EditorDashboard() {
  const editingQueue = [
    {
      id: '1',
      project: 'Chụp hoàn thiện nội thất Căn hộ 3PN Vinhomes Central Park',
      client: 'Nguyễn Minh Tuấn',
      photographer: 'Trần Văn Hùng',
      totalPhotos: 25,
      editedPhotos: 15,
      priority: 'High',
      dueDate: '2024-01-18',
      status: 'In Progress',
      type: 'Interior-Design',
      hashId: 'HASH001',
      comments: 8,
      lastActivity: '2024-01-16T14:30:00Z'
    },
    {
      id: '2',
      project: 'Chụp kiến trúc Biệt thự Thảo Điền',
      client: 'Lê Thị Hương',
      photographer: 'Nguyễn Thị Mai',
      totalPhotos: 18,
      editedPhotos: 18,
      priority: 'Medium',
      dueDate: '2024-01-20',
      status: 'Completed',
      type: 'Architecture-Exterior',
      hashId: 'HASH002',
      comments: 3,
      lastActivity: '2024-01-16T16:00:00Z'
    },
    {
      id: '3',
      project: 'Chụp nội thất Văn phòng Co-working Space',
      client: 'WorkHub Vietnam',
      photographer: 'Nguyễn Thị Mai',
      totalPhotos: 35,
      editedPhotos: 0,
      priority: 'Low',
      dueDate: '2024-01-25',
      status: 'Pending',
      type: 'Interior-Design',
      hashId: 'HASH007',
      comments: 0,
      lastActivity: '2024-01-17T14:00:00Z'
    }
  ];

  const recentEdits = [
    {
      id: '1',
      filename: 'living-room-001.jpg',
      project: 'Vinhomes Central Park',
      editType: 'Color Grading',
      timeSpent: '1h 45m',
      quality: 'Excellent',
      status: 'Completed',
      uploadedAt: '2024-01-16T14:30:00Z'
    },
    {
      id: '2',
      filename: 'kitchen-001.jpg',
      project: 'Vinhomes Central Park',
      editType: 'Retouching',
      timeSpent: '2h 15m',
      quality: 'Good',
      status: 'Completed',
      uploadedAt: '2024-01-16T12:15:00Z'
    },
    {
      id: '3',
      filename: 'exterior-front.jpg',
      project: 'Biệt thự Thảo Điền',
      editType: 'Architecture Enhancement',
      timeSpent: '3h 00m',
      quality: 'Excellent',
      status: 'Completed',
      uploadedAt: '2024-01-16T16:00:00Z'
    }
  ];

  // Notifications tab removed per UX simplification

  const stats = [
    { label: 'Số ảnh chỉnh sửa', value: '15', change: '+3', trend: 'up' },
    { label: 'Dự án đang tham gia', value: '3', change: '+1', trend: 'up' },
    { label: 'Thời gian trung bình', value: '2.1h', change: '-0.2h', trend: 'down' },
    { label: 'Dự án đã hoàn thành', value: '12', change: '+1', trend: 'up' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Quản lý dự án chỉnh sửa ảnh và workflow của bạn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-medium">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">Hàng đợi</TabsTrigger>
          <TabsTrigger value="recent">Gần đây</TabsTrigger>
          <TabsTrigger value="projects">Dự án</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        {/* Editing Queue Tab */}
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <span>Hàng đợi chỉnh sửa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editingQueue.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{project.project}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>Client: {project.client}</span>
                          <span>Photographer: {project.photographer}</span>
                          <span>Hash: {project.hashId}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {project.comments} comments
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(project.lastActivity).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status === 'In Progress' ? 'Đang xử lý' :
                           project.status === 'Completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority === 'High' ? 'Cao' :
                           project.priority === 'Medium' ? 'Trung bình' : 'Thấp'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tiến độ</span>
                        <span className="font-medium">
                          {project.editedPhotos}/{project.totalPhotos} ảnh
                        </span>
                      </div>
                      <Progress 
                        value={(project.editedPhotos / project.totalPhotos) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                      <span>Hạn: {new Date(project.dueDate).toLocaleDateString('vi-VN')}</span>
                      <span className="capitalize">{project.type.replace('-', ' ')}</span>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/editor/projects/${project.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Xem chi tiết
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/editor/projects/${project.id}`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Bắt đầu chỉnh sửa
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Edits Tab */}
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5 text-blue-600" />
                <span>Chỉnh sửa gần đây</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEdits.map((edit) => (
                  <div key={edit.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{edit.filename}</h4>
                      <Badge className={getStatusColor(edit.status)}>
                        {edit.status === 'Completed' ? 'Hoàn thành' : edit.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Dự án: {edit.project}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Loại: {edit.editType}</span>
                      <span>Thời gian: {edit.timeSpent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Chất lượng: {edit.quality}</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        

        {/* Projects Tab */}
        <TabsContent value="projects">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dự án đang xử lý</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {editingQueue.filter(p => p.status === 'In Progress').map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{project.project}</p>
                        <p className="text-xs text-gray-600">{project.client}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Đang xử lý</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dự án hoàn thành</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {editingQueue.filter(p => p.status === 'Completed').map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{project.project}</p>
                        <p className="text-xs text-gray-600">{project.client}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-600" />
                <span>Cài đặt Editor</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Thông tin cá nhân</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="Nguyễn Thị Hoa" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="hoa.nguyen@photo-pro.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Chuyên môn</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Color Grading', 'Retouching', 'Architecture', 'Interior Design'].map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Tải lên</h3>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Cập nhật portfolio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
