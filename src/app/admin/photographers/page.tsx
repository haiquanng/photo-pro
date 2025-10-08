import { PhotographersTable } from '@/components/photographers/photographers-table';
import { PhotographerFilters } from '@/components/photographers/photographer-filters';
import { mockPhotographers } from '@/data/mock/photographers';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function PhotographersPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Photographers</h1>
          <p className="text-gray-600 mt-2">Manage your photography team</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Photographer</span>
        </Button>
      </div>

      {/* Filters */}
      <PhotographerFilters />

      {/* Photographers table */}
      <PhotographersTable photographers={mockPhotographers} />
    </div>
  );
}
