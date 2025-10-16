'use client';

import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, MessageCircle, CheckCircle } from 'lucide-react';

const mock = {
  id: 'ep1',
  client: 'Nguyễn Thị Minh Châu',
  status: 'In Progress',
  files: {
    raw: ['DSC_001.RAW', 'DSC_002.RAW'],
    edited: ['IMG_001_EDITED.jpg'],
    preview: ['PREVIEW_001.jpg']
  },
  versions: [
    { id: 'v1', ts: '2024-01-10 10:00', note: 'Initial edit batch' },
    { id: 'v2', ts: '2024-01-12 15:32', note: 'Color grading update' }
  ],
  feedback: [
    { id: 'f1', author: 'Client', ts: '2024-01-13 09:10', text: 'Please soften skin tones.' }
  ]
};

export default function EditorProjectDetailPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  const id = (params?.id as string) ?? '';
  if (!id) return notFound();

  const statusClass = mock.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project {id}</h1>
          <p className="text-gray-600">Client: {mock.client}</p>
        </div>
        <Badge className={statusClass}>{mock.status}</Badge>
      </div>

      <Tabs defaultValue="files" className="space-y-4">
        <TabsList>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['raw','edited','preview'] as const).map(type => (
                  <div key={type}>
                    <div className="font-medium text-gray-900 mb-2 uppercase">{type}</div>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {mock.files[type].map(f => (<li key={f}>{f}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <Button className="inline-flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Upload Edited Files</Button>
                <Button variant="outline" className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Mark as Completed</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Client Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mock.feedback.map(f => (
                  <div key={f.id} className="border rounded p-3">
                    <div className="flex justify-between text-sm text-gray-600"><span>{f.author}</span><span>{f.ts}</span></div>
                    <div className="mt-1 text-gray-800">{f.text}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">Chat UI placeholder (realtime WS ready)</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions">
          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {mock.versions.map(v => (
                  <div key={v.id} className="py-3 flex items-center justify-between text-sm">
                    <div className="font-medium text-gray-900">{v.id}</div>
                    <div className="text-gray-600">{v.ts}</div>
                    <div className="text-gray-700">{v.note}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


