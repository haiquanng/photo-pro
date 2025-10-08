import { StatsCards } from '@/components/dashboard/stats-cards';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { RecentProjects } from '@/components/dashboard/recent-projects';
import { mockDashboardStats, monthlyRevenueData } from '@/data/mock/analytics';
import { mockProjects } from '@/data/mock/projects';

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your photography management system</p>
      </div>

      {/* Stats cards */}
      <StatsCards {...mockDashboardStats} />

      {/* Charts and recent projects */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart data={monthlyRevenueData} />
        </div>
        <div className="xl:col-span-1">
          <RecentProjects projects={mockProjects} />
        </div>
      </div>
    </div>
  );
}