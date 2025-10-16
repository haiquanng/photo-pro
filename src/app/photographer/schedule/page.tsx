'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

const items = [
  { id: 's1', date: '2024-02-01', time: '09:00 - 11:00', title: 'Product Shoot', location: 'Thủ Đức' },
  { id: 's2', date: '2024-02-03', time: '13:00 - 17:00', title: 'Lookbook Fashion', location: 'Quận 1' },
  { id: 's3', date: '2024-02-05', time: '08:00 - 12:00', title: 'Real Estate Villa', location: 'Quận 7' },
];

export default function PhotographerSchedulePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-600 mt-1">Your upcoming sessions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-purple-600" />
            <span>Next 7 days</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {items.map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1"><CalendarDays className="w-4 h-4" />{item.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{item.time}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


