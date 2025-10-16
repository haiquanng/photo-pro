'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: 'Total Revenue', value: '485,000,000 ₫' },
    { label: 'Active Projects', value: '18' },
    { label: 'Avg Project Value', value: '12,500,000 ₫' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Business performance overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-600" /> {m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{m.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


