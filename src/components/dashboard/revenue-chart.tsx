'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Revenue Trend</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart bars */}
          <div className="flex items-end space-x-2 h-48">
            {data.map((item, index) => {
              const height = (item.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t-lg relative">
                    <div 
                      className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {item.month.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Revenue values */}
          <div className="flex justify-between text-sm text-gray-600">
            {data.map((item, index) => (
              <div key={index} className="flex-1 text-center">
                {formatCurrency(item.revenue)}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
