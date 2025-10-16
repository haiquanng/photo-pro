'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Search } from 'lucide-react';

const assets = [
  { id: 'a1', filename: 'IMG_001.jpg', project: 'Fashion Collection', size: '12.4MB' },
  { id: 'a2', filename: 'IMG_045.jpg', project: 'Wedding Photography', size: '8.7MB' },
  { id: 'a3', filename: 'DSC_1203.RAW', project: 'Corporate Event', size: '34.2MB' },
];

export default function EditorAssetsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
        <p className="text-gray-600 mt-1">Search and manage editing assets</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search assets..." className="pl-9" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-green-600" />
            <span>Recent Assets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {assets.map(a => (
              <div key={a.id} className="py-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{a.filename}</div>
                  <div className="text-sm text-gray-600">{a.project}</div>
                </div>
                <div className="text-sm text-gray-500">{a.size}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


