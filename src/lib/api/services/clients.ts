import { api } from '../client';
import { 
  Client, 
  CreateClientRequest, 
  UpdateClientRequest, 
  ClientFilters,
  PaginatedResponse 
} from '@/types';

export const clientService = {
  // Get all clients with filters
  getClients: async (filters?: ClientFilters): Promise<PaginatedResponse<Client>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const url = queryString ? `/clients?${queryString}` : '/clients';
    
    return api.get<PaginatedResponse<Client>>(url);
  },

  // Get client by ID
  getClient: async (id: string): Promise<Client> => {
    const response = await api.get<Client>(`/clients/${id}`);
    return response.data;
  },

  // Create new client
  createClient: async (data: CreateClientRequest): Promise<Client> => {
    const response = await api.post<Client>('/clients', data);
    return response.data;
  },

  // Update client
  updateClient: async (data: UpdateClientRequest): Promise<Client> => {
    const { id, ...updateData } = data;
    const response = await api.put<Client>(`/clients/${id}`, updateData);
    return response.data;
  },

  // Delete client
  deleteClient: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },

  // Get client projects
  getClientProjects: async (clientId: string) => {
    const response = await api.get(`/clients/${clientId}/projects`);
    return response.data;
  },

  // Get client analytics
  getClientAnalytics: async (clientId: string) => {
    const response = await api.get(`/clients/${clientId}/analytics`);
    return response.data;
  },

  // Update client tier
  updateClientTier: async (id: string, tier: string): Promise<Client> => {
    const response = await api.patch<Client>(`/clients/${id}/tier`, { tier });
    return response.data;
  },

  // Get client invoices
  getClientInvoices: async (clientId: string) => {
    const response = await api.get(`/clients/${clientId}/invoices`);
    return response.data;
  },

  // Send email to client
  sendEmail: async (clientId: string, subject: string, message: string) => {
    const response = await api.post(`/clients/${clientId}/send-email`, {
      subject,
      message,
    });
    return response.data;
  },

  // Get client communication history
  getCommunicationHistory: async (clientId: string) => {
    const response = await api.get(`/clients/${clientId}/communications`);
    return response.data;
  },
};
