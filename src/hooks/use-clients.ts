'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientService } from '@/lib/api/services/clients';
import { Client, CreateClientRequest, UpdateClientRequest, ClientFilters } from '@/types';
import { toast } from 'sonner';

// Query keys
export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (filters: ClientFilters) => [...clientKeys.lists(), filters] as const,
  details: () => [...clientKeys.all, 'detail'] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
  projects: (id: string) => [...clientKeys.detail(id), 'projects'] as const,
  analytics: (id: string) => [...clientKeys.detail(id), 'analytics'] as const,
};

// Get clients with filters
export function useClients(filters?: ClientFilters) {
  return useQuery({
    queryKey: clientKeys.list(filters || {}),
    queryFn: () => clientService.getClients(filters),
    select: (data) => data.data,
  });
}

// Get single client
export function useClient(id: string) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientService.getClient(id),
    enabled: !!id,
  });
}

// Get client projects
export function useClientProjects(clientId: string) {
  return useQuery({
    queryKey: clientKeys.projects(clientId),
    queryFn: () => clientService.getClientProjects(clientId),
    enabled: !!clientId,
  });
}

// Get client analytics
export function useClientAnalytics(clientId: string) {
  return useQuery({
    queryKey: clientKeys.analytics(clientId),
    queryFn: () => clientService.getClientAnalytics(clientId),
    enabled: !!clientId,
  });
}

// Create client mutation
export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientRequest) => clientService.createClient(data),
    onSuccess: (newClient) => {
      // Invalidate and refetch clients list
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      
      toast.success('Client created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create client');
    },
  });
}

// Update client mutation
export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateClientRequest) => clientService.updateClient(data),
    onSuccess: (updatedClient) => {
      // Update the client in cache
      queryClient.setQueryData(clientKeys.detail(updatedClient.id), updatedClient);
      
      // Invalidate clients list
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      
      toast.success('Client updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update client');
    },
  });
}

// Delete client mutation
export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientService.deleteClient(id),
    onSuccess: (_, deletedId) => {
      // Remove client from cache
      queryClient.removeQueries({ queryKey: clientKeys.detail(deletedId) });
      
      // Invalidate clients list
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      
      toast.success('Client deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete client');
    },
  });
}

// Update client tier mutation
export function useUpdateClientTier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, tier }: { id: string; tier: string }) => 
      clientService.updateClientTier(id, tier),
    onSuccess: (updatedClient) => {
      // Update the client in cache
      queryClient.setQueryData(clientKeys.detail(updatedClient.id), updatedClient);
      
      // Invalidate clients list
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      
      toast.success('Client tier updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update client tier');
    },
  });
}

// Send email to client mutation
export function useSendClientEmail() {
  return useMutation({
    mutationFn: ({ clientId, subject, message }: { 
      clientId: string; 
      subject: string; 
      message: string; 
    }) => clientService.sendEmail(clientId, subject, message),
    onSuccess: () => {
      toast.success('Email sent successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send email');
    },
  });
}
