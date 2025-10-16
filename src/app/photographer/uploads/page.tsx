'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PhotographerUploadsPage() {
  const [isUploading, setIsUploading] = useState(false);
  const recent = [
    { id: 'u1', project: 'Fashion Collection Spring 2024', files: 10, status: 'Completed' },
    { id: 'u2', project: 'Wedding Photography - Hùng & Lan', files: 6, status: 'In Progress' },
  ];

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Upload completed', { description: '10 files uploaded successfully.' });
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Uploads</h1>
        <p className="text-gray-600 mt-1">Upload your RAW/preview files</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-purple-600" />
            <span>Quick Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Drop files here or use the button</div>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {recent.map(r => (
              <div key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{r.project}</div>
                  <div className="text-sm text-gray-600">{r.files} files • {r.status}</div>
                </div>
                <Link href={`/photographer/uploads/${r.id}`} className="text-sm font-medium text-purple-700 hover:underline">
                  View details
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


