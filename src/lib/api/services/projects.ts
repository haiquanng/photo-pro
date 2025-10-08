import { api } from '../client';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest, 
  ProjectFilters,
  PaginatedResponse 
} from '@/types';

export const projectService = {
  // Get all projects with filters
  getProjects: async (filters?: ProjectFilters): Promise<PaginatedResponse<Project>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const url = queryString ? `/projects?${queryString}` : '/projects';
    
    const response = await api.get<PaginatedResponse<Project>>(url);
    return response.data;
  },

  // Get project by ID
  getProject: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  // Create new project
  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  },

  // Update project
  updateProject: async (data: UpdateProjectRequest): Promise<Project> => {
    const { id, ...updateData } = data;
    const response = await api.put<Project>(`/projects/${id}`, updateData);
    return response.data;
  },

  // Delete project
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // Update project status
  updateProjectStatus: async (id: string, status: string): Promise<Project> => {
    const response = await api.patch<Project>(`/projects/${id}/status`, { status });
    return response.data;
  },

  // Get project timeline
  getProjectTimeline: async (id: string) => {
    const response = await api.get(`/projects/${id}/timeline`);
    return response.data;
  },

  // Add project milestone
  addMilestone: async (projectId: string, milestone: unknown) => {
    const response = await api.post(`/projects/${projectId}/milestones`, milestone);
    return response.data;
  },

  // Update milestone
  updateMilestone: async (projectId: string, milestoneId: string, data: unknown) => {
    const response = await api.put(`/projects/${projectId}/milestones/${milestoneId}`, data);
    return response.data;
  },

  // Delete milestone
  deleteMilestone: async (projectId: string, milestoneId: string) => {
    await api.delete(`/projects/${projectId}/milestones/${milestoneId}`);
  },

  // Upload project files
  uploadFiles: async (projectId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await api.post(`/projects/${projectId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete project file
  deleteFile: async (projectId: string, fileId: string) => {
    await api.delete(`/projects/${projectId}/files/${fileId}`);
  },

  // Get project analytics
  getProjectAnalytics: async (filters?: { startDate?: string; endDate?: string }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const url = queryString ? `/projects/analytics?${queryString}` : '/projects/analytics';
    
    return api.get(url);
  },
};
