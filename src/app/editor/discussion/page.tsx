'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

const projects = [
  { id: 'ep1', name: 'Fashion Collection Spring 2024' },
  { id: 'ep2', name: 'Wedding Photography - Hùng & Lan' },
];

export default function EditorDiscussionPage() {
  const [messages, setMessages] = useState<Array<{ id: string; author: string; text: string }>>([
    { id: 'm1', author: 'QC', text: 'Please prioritize Fashion collection today.' },
    { id: 'm2', author: 'Editor', text: 'Acknowledged. Uploading v2 this afternoon.' },
  ]);
  const [text, setText] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discussion</h1>
        <p className="text-gray-600 mt-1">Collaborate with QC and Photographer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {projects.map(p => (<li key={p.id} className="text-gray-800">{p.name}</li>))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto border rounded p-3 space-y-3 bg-gray-50">
              {messages.map(m => (
                <div key={m.id} className="text-sm">
                  <span className="font-medium text-gray-900 mr-2">{m.author}:</span>
                  <span className="text-gray-800">{m.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button variant="outline" size="icon"><Paperclip className="w-4 h-4" /></Button>
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
              <Button size="icon" onClick={() => { if (text.trim()) { setMessages(prev => [...prev, { id: String(prev.length+1), author: 'Editor', text }]); setText(''); } }}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Project Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700">Status, due dates, and quick links (placeholder)</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


