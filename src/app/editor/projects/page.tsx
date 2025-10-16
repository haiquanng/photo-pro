'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Filter, Search } from 'lucide-react';

const projects = [
  { id: 'ep1', name: 'Fashion Collection Spring 2024', photographer: 'Nguyễn Văn An', status: 'In Progress', dueDate: '2024-02-15' },
  { id: 'ep2', name: 'Wedding Photography - Hùng & Lan', photographer: 'Lê Văn Cường', status: 'Waiting Review', dueDate: '2024-01-22' },
  { id: 'ep3', name: 'Corporate Event - Annual Meeting', photographer: 'Trần Quốc Dũng', status: 'Assigned', dueDate: '2024-02-02' },
];

export default function EditorProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage assigned editing projects</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search project or client..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="waiting">Waiting Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {projects.map(p => (
              <div key={p.id} className="py-3 grid grid-cols-1 md:grid-cols-5 items-center">
                <div className="md:col-span-2 font-medium text-gray-900">{p.name}</div>
                <div className="text-sm text-gray-600">{p.photographer}</div>
                <div className="text-sm">
                  <span className={
                    p.status === 'Completed' ? 'text-green-700' : p.status === 'In Progress' ? 'text-blue-700' : 'text-yellow-700'
                  }>{p.status}</span>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-4 text-sm">
                  <span className="text-gray-500">{p.dueDate}</span>
                  <Link href={`/editor/projects/${p.id}`} className="text-green-700 hover:underline inline-flex items-center gap-1"><Edit className="w-4 h-4" /> View</Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


