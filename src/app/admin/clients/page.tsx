import { ClientsTable } from '@/components/clients/clients-table';
import { ClientFilters } from '@/components/clients/client-filters';
import { mockClients } from '@/data/mock/clients';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ClientsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-2">Manage your photography clients</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Client</span>
        </Button>
      </div>

      {/* Filters */}
      <ClientFilters />

      {/* Clients table */}
      <ClientsTable clients={mockClients} />
    </div>
  );
}
