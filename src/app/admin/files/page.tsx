'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, FileText } from 'lucide-react';

const files = [
  { id: 'f1', name: 'Contract_Template.pdf', size: '240KB' },
  { id: 'f2', name: 'Brand_Guide.pdf', size: '1.2MB' },
];

export default function AdminFilesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Files</h1>
        <p className="text-gray-600 mt-1">Manage shared files and templates</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search files..." className="pl-9" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {files.map(f => (
              <div key={f.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{f.name}</span>
                </div>
                <div className="text-sm text-gray-600">{f.size}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


