'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter, FileEdit } from 'lucide-react';

const revisions = [
  { id: 'r1', project: 'Fashion Collection', client: 'Nguyễn Thị Minh Châu', date: '2024-01-16', reason: 'Color too warm' },
  { id: 'r2', project: 'Wedding Photography', client: 'Trần Văn Hùng', date: '2024-01-18', reason: 'Remove background objects' },
];

export default function EditorRevisionsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revisions</h1>
          <p className="text-gray-600 mt-1">Handle client revision requests</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">Filter by project/date (stub)</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revisions.map(r => (
              <div key={r.id} className="border rounded-lg p-4">
                <div className="font-medium text-gray-900">{r.project}</div>
                <div className="text-sm text-gray-600">Client: {r.client}</div>
                <div className="text-sm text-gray-500">Requested on {r.date}</div>
                <div className="text-sm text-gray-700 mt-1">Reason: {r.reason}</div>
                <div className="mt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="inline-flex items-center gap-2"><FileEdit className="w-4 h-4" /> Open Revision</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Revision Detail - {r.project}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 text-sm">
                        <div className="text-gray-700">Client comments and previews (placeholder)</div>
                        <Button variant="outline">Upload New Revision</Button>
                        <Button>Submit Revision</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


