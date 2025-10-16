'use client';

import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, XCircle } from 'lucide-react';

const uploads = [
  { id: 'u1', project: 'Fashion Collection Spring 2024', files: 10, status: 'Completed' },
  { id: 'u2', project: 'Wedding Photography - Hùng & Lan', files: 6, status: 'In Progress' },
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

export default function PhotographerUploadDetailPage() {
  const params = useParams();
  const id = (params?.id as string) ?? '';
  const data = uploads.find(u => u.id === id);
  if (!data) return notFound();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload: {data.project}</h1>
          <p className="text-gray-600 mt-1">{data.files} files</p>
        </div>
        <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="inline-flex items-center gap-2"><Upload className="w-4 h-4" /> Resume Upload</Button>
            <Button variant="outline" className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Validate</Button>
            <Button variant="destructive" className="inline-flex items-center gap-2"><XCircle className="w-4 h-4" /> Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


