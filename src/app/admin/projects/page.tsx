import { ProjectsTable } from '@/components/projects/projects-table';
import { ProjectFilters } from '@/components/projects/project-filters';
import { mockProjects } from '@/data/mock/projects';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your photography projects</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

      {/* Filters */}
      <ProjectFilters />

      {/* Projects table */}
      <ProjectsTable projects={mockProjects} />
    </div>
  );
}
