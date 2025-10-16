'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Edit, User, Clock } from 'lucide-react';

const queue = [
  {
    id: '1',
    project: 'Fashion Collection Spring 2024',
    client: 'Nguyễn Thị Minh Châu',
    totalPhotos: 150,
    editedPhotos: 45,
    priority: 'High',
    dueDate: '2024-02-15',
    status: 'In Progress',
  },
  {
    id: '2',
    project: 'Wedding Photography - Hùng & Lan',
    client: 'Trần Văn Hùng',
    totalPhotos: 300,
    editedPhotos: 300,
    priority: 'Medium',
    dueDate: '2024-01-20',
    status: 'Completed',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
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

export default function EditorQueuePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editing Queue</h1>
        <p className="text-gray-600 mt-1">Your assigned editing tasks</p>
      </div>

      <div className="space-y-4">
        {queue.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5 text-green-600" />
                <span>{item.project}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{item.client}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Due: {item.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{item.editedPhotos}/{item.totalPhotos} photos</span>
                  </div>
                  <Progress value={(item.editedPhotos / item.totalPhotos) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


