'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const invoices = [
  { id: 'inv_001', client: 'Nguyễn Thị Minh Châu', amount: 25000000, status: 'Paid' },
  { id: 'inv_002', client: 'Trần Văn Hùng', amount: 15000000, status: 'Pending' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(amount);
const statusClass = (s: string) => s === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

export default function AdminInvoicesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <p className="text-gray-600 mt-1">Billing and payments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {invoices.map(i => (
              <div key={i.id} className="py-3 grid grid-cols-1 md:grid-cols-4 items-center">
                <div className="font-medium text-gray-900">{i.id}</div>
                <div className="text-sm text-gray-700">{i.client}</div>
                <div className="font-medium text-gray-900">{formatCurrency(i.amount)}</div>
                <div>
                  <Badge className={statusClass(i.status)}>{i.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


