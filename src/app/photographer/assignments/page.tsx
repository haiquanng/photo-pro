'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Camera } from 'lucide-react';

const assignments = [
  {
    id: 'p1',
    title: 'Fashion Collection Spring 2024',
    date: '2024-01-15',
    time: '09:00 - 13:00',
    location: 'Quận 1, HCMC',
    status: 'In Progress',
  },
  {
    id: 'p2',
    title: 'Corporate Event - Annual Meeting',
    date: '2024-01-10',
    time: '14:00 - 20:00',
    location: 'Quận 7, HCMC',
    status: 'Delivered',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-purple-100 text-purple-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function PhotographerAssignmentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-600 mt-1">Your current and recent shoots</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-purple-600" />
                <span>{item.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{item.date}</span>
                  <span className="text-gray-400">•</span>
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{item.location}</span>
                </div>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </div>
              <div className="mt-4">
                <Link href={`/photographer/assignments/${item.id}`} className="text-sm font-medium text-purple-700 hover:underline">
                  View details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


