import { Analytics, DashboardStats } from '@/types';

export const mockAnalytics: Analytics = {
  totalRevenue: 485000000,
  monthlyRevenue: [45000000, 52000000, 48000000, 55000000, 62000000, 58000000],
  totalProjects: 45,
  activeProjects: 8,
  totalClients: 8,
  vipClients: 3,
  photographerUtilization: 78,
  averageProjectValue: 10777778,
  revenueGrowth: 15.2,
  projectCompletionRate: 92
};

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 485000000,
  monthlyRevenue: 58000000,
  totalProjects: 45,
  activeProjects: 8,
  totalClients: 8,
  vipClients: 3,
  photographerUtilization: 78,
  averageProjectValue: 10777778,
  revenueGrowth: 15.2,
  projectCompletionRate: 92
};

export const monthlyRevenueData = [
  { month: 'Aug 2023', revenue: 45000000 },
  { month: 'Sep 2023', revenue: 52000000 },
  { month: 'Oct 2023', revenue: 48000000 },
  { month: 'Nov 2023', revenue: 55000000 },
  { month: 'Dec 2023', revenue: 62000000 },
  { month: 'Jan 2024', revenue: 58000000 }
];

export const projectTypeDistribution = [
  { type: 'Wedding', count: 18, percentage: 40 },
  { type: 'Fashion', count: 12, percentage: 27 },
  { type: 'Event', count: 8, percentage: 18 },
  { type: 'Portrait', count: 4, percentage: 9 },
  { type: 'Real Estate', count: 3, percentage: 6 }
];

export const clientTierDistribution = [
  { tier: 'VIP', count: 3, percentage: 37.5 },
  { tier: 'Premium', count: 3, percentage: 37.5 },
  { tier: 'Standard', count: 2, percentage: 25 }
];

export const photographerPerformance = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    projects: 15,
    revenue: 180000000,
    rating: 4.9,
    utilization: 85
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    projects: 12,
    revenue: 150000000,
    rating: 4.7,
    utilization: 75
  },
  {
    id: '3',
    name: 'Lê Văn Cường',
    projects: 13,
    revenue: 165000000,
    rating: 4.8,
    utilization: 80
  },
  {
    id: '4',
    name: 'Phạm Thị Dung',
    projects: 5,
    revenue: 70000000,
    rating: 4.9,
    utilization: 60
  }
];
