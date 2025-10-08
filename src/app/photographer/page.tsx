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
} from 'lucide-react';

export default function PhotographerDashboard() {
  const upcomingShoots = [
    {
      id: '1',
      client: 'Nguyễn Thị Minh Châu',
      type: 'Fashion',
      date: '2024-02-15',
      time: '09:00 - 17:00',
      location: 'Studio Hồ Chí Minh',
      status: 'Confirmed',
      priority: 'High'
    },
    {
      id: '2',
      client: 'Trần Văn Hùng',
      type: 'Wedding',
      date: '2024-02-20',
      time: '06:00 - 22:00',
      location: 'Khách sạn Sheraton',
      status: 'Confirmed',
      priority: 'High'
    }
  ];

  const recentProjects = [
    {
      id: '1',
      title: 'Fashion Collection Spring 2024',
      client: 'Nguyễn Thị Minh Châu',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-02-15',
      photos: 45
    }
  ];

  const stats = [
    { label: 'This Month Shoots', value: '8', change: '+2', trend: 'up' },
    { label: 'Completed Projects', value: '12', change: '+3', trend: 'up' },
    { label: 'Average Rating', value: '4.9', change: '+0.1', trend: 'up' },
    { label: 'Total Earnings', value: '45M VND', change: '+5M', trend: 'up' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Photographer Dashboard</h1>
        <p className="text-gray-600">Manage your shoots, projects, and portfolio</p>
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
              <span>Upcoming Shoots</span>
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
                      <p className="text-sm text-gray-600 mb-2">{shoot.type} Photography</p>
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
                    </div>
                    <Badge className={
                      shoot.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }>
                      {shoot.status}
                    </Badge>
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
              <span>Recent Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <Badge className={
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Client: {project.client}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
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
                    <span>Due: {project.dueDate}</span>
                    <span>{project.photos} photos</span>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="flex flex-col items-center space-y-2 h-auto py-6">
              <Upload className="w-6 h-6" />
              <span>Upload Photos</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Calendar className="w-6 h-6" />
              <span>View Schedule</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <Camera className="w-6 h-6" />
              <span>Portfolio</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-6">
              <User className="w-6 h-6" />
              <span>Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
