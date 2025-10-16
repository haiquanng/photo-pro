'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';

const versions = [
  { id: 'v1', project: 'Fashion Collection', version: 'v1', notes: 'Initial edit batch', date: '2024-01-15' },
  { id: 'v2', project: 'Fashion Collection', version: 'v2', notes: 'Color grading update', date: '2024-01-16' },
  { id: 'v3', project: 'Wedding Photography', version: 'v1', notes: 'Skin retouch', date: '2024-01-18' },
];

export default function EditorVersionsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Versions</h1>
        <p className="text-gray-600 mt-1">Track project editing versions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-green-600" />
            <span>Recent Versions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {versions.map(v => (
              <div key={v.id} className="py-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{v.project} - {v.version}</div>
                  <div className="text-sm text-gray-600">{v.notes}</div>
                </div>
                <div className="text-sm text-gray-500">{v.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


