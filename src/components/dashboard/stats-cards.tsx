'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FolderOpen, 
  Camera, 
  DollarSign,
  Target,
  Clock
} from 'lucide-react';

interface StatsCardsProps {
  totalRevenue: number;
  monthlyRevenue: number;
  totalProjects: number;
  activeProjects: number;
  totalClients: number;
  vipClients: number;
  photographerUtilization: number;
  averageProjectValue: number;
  revenueGrowth: number;
  projectCompletionRate: number;
}

export function StatsCards({
  totalRevenue,
  monthlyRevenue,
  totalProjects,
  activeProjects,
  totalClients,
  vipClients,
  photographerUtilization,
  averageProjectValue,
  revenueGrowth,
  projectCompletionRate
}: StatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      change: `${revenueGrowth}%`,
      changeType: revenueGrowth >= 0 ? 'positive' : 'negative',
      icon: DollarSign,
      description: 'All time revenue'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(monthlyRevenue),
      change: '+12.5%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'This month'
    },
    {
      title: 'Total Projects',
      value: totalProjects.toString(),
      change: `${activeProjects} active`,
      changeType: 'neutral',
      icon: FolderOpen,
      description: 'All time projects'
    },
    {
      title: 'Active Projects',
      value: activeProjects.toString(),
      change: `${projectCompletionRate}% completion rate`,
      changeType: 'positive',
      icon: Target,
      description: 'Currently in progress'
    },
    {
      title: 'Total Clients',
      value: totalClients.toString(),
      change: `${vipClients} VIP`,
      changeType: 'positive',
      icon: Users,
      description: 'Registered clients'
    },
    {
      title: 'Photographer Utilization',
      value: `${photographerUtilization}%`,
      change: 'High efficiency',
      changeType: 'positive',
      icon: Camera,
      description: 'Team utilization rate'
    },
    {
      title: 'Average Project Value',
      value: formatCurrency(averageProjectValue),
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'Per project average'
    },
    {
      title: 'Project Completion Rate',
      value: `${projectCompletionRate}%`,
      change: 'On time delivery',
      changeType: 'positive',
      icon: Clock,
      description: 'Timely completion rate'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge 
                variant={stat.changeType === 'positive' ? 'default' : 
                        stat.changeType === 'negative' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-gray-500">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
