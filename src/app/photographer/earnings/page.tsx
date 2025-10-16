'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Calendar } from 'lucide-react';

const payouts = [
  { id: 'e1', month: '01/2024', amount: 18500000, status: 'Paid' },
  { id: 'e2', month: '12/2023', amount: 15200000, status: 'Paid' },
  { id: 'e3', month: '11/2023', amount: 13200000, status: 'Pending' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(amount);

export default function PhotographerEarningsPage() {
  const total = payouts.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-600 mt-1">Monthly payouts and status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span>Total (last 3 months)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(total)}</div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Payouts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {payouts.map(p => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div className="text-sm text-gray-700">{p.month}</div>
                  <div className="font-medium text-gray-900">{formatCurrency(p.amount)}</div>
                  <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


