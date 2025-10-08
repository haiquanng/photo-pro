'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/lib/api/services/projects';
import { CreateProjectRequest, UpdateProjectRequest, ProjectFilters } from '@/types';
import { toast } from 'sonner';

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: ProjectFilters) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  analytics: () => [...projectKeys.all, 'analytics'] as const,
};

// Get projects with filters
export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: projectKeys.list(filters || {}),
    queryFn: () => projectService.getProjects(filters),
    select: (data) => data.data,
  });
}

// Get single project
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
  });
}

// Get project analytics
export function useProjectAnalytics(filters?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: [...projectKeys.analytics(), filters],
    queryFn: () => projectService.getProjectAnalytics(filters),
  });
}

// Create project mutation
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectService.createProject(data),
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      toast.success('Project created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create project');
    },
  });
}

// Update project mutation
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectRequest) => projectService.updateProject(data),
    onSuccess: (updatedProject) => {
      // Update the project in cache
      queryClient.setQueryData(projectKeys.detail(updatedProject.id), updatedProject);
      
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      toast.success('Project updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });
}

// Delete project mutation
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: (_, deletedId) => {
      // Remove project from cache
      queryClient.removeQueries({ queryKey: projectKeys.detail(deletedId) });
      
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      toast.success('Project deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete project');
    },
  });
}

// Update project status mutation
export function useUpdateProjectStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      projectService.updateProjectStatus(id, status),
    onSuccess: (updatedProject) => {
      // Update the project in cache
      queryClient.setQueryData(projectKeys.detail(updatedProject.id), updatedProject);
      
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      toast.success('Project status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project status');
    },
  });
}

// Upload files mutation
export function useUploadProjectFiles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, files }: { projectId: string; files: File[] }) => 
      projectService.uploadFiles(projectId, files),
    onSuccess: (_, { projectId }) => {
      // Invalidate project detail to refetch files
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      
      toast.success('Files uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload files');
    },
  });
}
