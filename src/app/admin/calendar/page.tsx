'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

export default function AdminCalendarPage() {
  const events = [
    { id: 'c1', date: '2024-02-01', title: 'Fashion Shoot' },
    { id: 'c2', date: '2024-02-03', title: 'Wedding - Hùng & Lan' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">Company-wide schedule</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarDays className="w-5 h-5" /> Upcoming</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {events.map(e => (
              <div key={e.id} className="py-3 flex items-center justify-between">
                <div className="font-medium text-gray-900">{e.title}</div>
                <div className="text-sm text-gray-600">{e.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


