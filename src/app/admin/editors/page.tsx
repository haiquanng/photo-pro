'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { mockEditors } from '@/data/mock/editors';
import { EditorsTable } from '@/components/editors/editors-table';

export default function AdminEditorsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editors</h1>
          <p className="text-gray-600 mt-1">Manage your editing team</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search editor by name or email..." className="pl-9" />
      </div>

      <EditorsTable editors={mockEditors} />
    </div>
  );
}


