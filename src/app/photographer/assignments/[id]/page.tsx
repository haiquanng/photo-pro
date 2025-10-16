'use client';

import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Camera, FileDown, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const assignments = [
  {
    id: 'p1',
    title: 'Fashion Collection Spring 2024',
    date: '2024-01-15',
    time: '09:00 - 13:00',
    location: 'Quận 1, HCMC',
    status: 'In Progress',
    team: ['Nguyễn Văn An', 'Lê Văn Cường'],
    equipment: ['Canon R5', 'Sony A7R IV', 'Profoto B10']
  },
  {
    id: 'p2',
    title: 'Corporate Event - Annual Meeting',
    date: '2024-01-10',
    time: '14:00 - 20:00',
    location: 'Quận 7, HCMC',
    status: 'Delivered',
    team: ['Trần Quốc Dũng'],
    equipment: ['Canon R6', 'Sigma 24-70mm f/2.8']
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

export default function PhotographerAssignmentDetailPage() {
  // useParams is only for Client Components in App Router
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  const id = (params?.id as string) ?? '';
  const data = assignments.find(a => a.id === id);
  if (!data) return notFound();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{data.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{data.time}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{data.location}</span>
          </div>
        </div>
        <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-purple-600" /> Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700">
              {data.team.map((m) => (<li key={m}>{m}</li>))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Camera className="w-5 h-5 text-purple-600" /> Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700">
              {data.equipment.map((e) => (<li key={e}>{e}</li>))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="inline-flex items-center gap-2"><FileDown className="w-4 h-4" /> Download Brief</Button>
            <Button className="inline-flex items-center gap-2"><Upload className="w-4 h-4" /> Upload RAW</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


