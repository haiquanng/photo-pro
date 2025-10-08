import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Image, 
  Upload,
  Download,
  Eye,
  Edit,
  Filter,
  Palette,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function EditorDashboard() {
  const editingQueue = [
    {
      id: '1',
      project: 'Fashion Collection Spring 2024',
      client: 'Nguyễn Thị Minh Châu',
      photographer: 'Nguyễn Văn An',
      totalPhotos: 150,
      editedPhotos: 45,
      priority: 'High',
      dueDate: '2024-02-15',
      status: 'In Progress',
      type: 'Fashion'
    },
    {
      id: '2',
      project: 'Wedding Photography - Hùng & Lan',
      client: 'Trần Văn Hùng',
      photographer: 'Lê Văn Cường',
      totalPhotos: 300,
      editedPhotos: 300,
      priority: 'Medium',
      dueDate: '2024-01-20',
      status: 'Completed',
      type: 'Wedding'
    }
  ];

  const recentEdits = [
    {
      id: '1',
      filename: 'IMG_001.jpg',
      project: 'Fashion Collection',
      editType: 'Color Correction',
      timeSpent: '2h 15m',
      quality: 'Excellent',
      status: 'Completed'
    },
    {
      id: '2',
      filename: 'IMG_045.jpg',
      project: 'Wedding Photography',
      editType: 'Retouching',
      timeSpent: '1h 30m',
      quality: 'Good',
      status: 'Completed'
    }
  ];

  const stats = [
    { label: 'Photos Edited Today', value: '23', change: '+5', trend: 'up' },
    { label: 'Active Projects', value: '8', change: '+2', trend: 'up' },
    { label: 'Average Edit Time', value: '1.2h', change: '-0.3h', trend: 'down' },
    { label: 'Quality Score', value: '4.8/5', change: '+0.2', trend: 'up' }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor Dashboard</h1>
        <p className="text-gray-600">Manage your photo editing projects and workflow</p>
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
        {/* Editing Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="w-5 h-5 text-purple-600" />
              <span>Editing Queue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {editingQueue.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{project.project}</h4>
                      <p className="text-sm text-gray-600">Client: {project.client}</p>
                      <p className="text-sm text-gray-600">Photographer: {project.photographer}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {project.editedPhotos}/{project.totalPhotos} photos
                      </span>
                    </div>
                    <Progress 
                      value={(project.editedPhotos / project.totalPhotos) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Due: {project.dueDate}</span>
                    <span className="capitalize">{project.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Edits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5 text-blue-600" />
              <span>Recent Edits</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEdits.map((edit) => (
                <div key={edit.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{edit.filename}</h4>
                    <Badge className={getStatusColor(edit.status)}>
                      {edit.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Project: {edit.project}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>Type: {edit.editType}</span>
                    <span>Time: {edit.timeSpent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quality: {edit.quality}</span>
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
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Button className="flex flex-col items-center space-y-2 h-auto py-6">
              <Image className="w-6 h-6" />
              <span>Start Editing</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Filter className="w-6 h-6" />
              <span>Batch Process</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Palette className="w-6 h-6" />
              <span>Color Grading</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Zap className="w-6 h-6" />
              <span>Auto Enhance</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Upload className="w-6 h-6" />
              <span>Upload Raw</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Download className="w-6 h-6" />
              <span>Export All</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
