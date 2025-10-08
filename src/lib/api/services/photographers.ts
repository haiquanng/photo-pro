import { api } from '../client';
import { 
  Photographer, 
  CreatePhotographerRequest, 
  UpdatePhotographerRequest, 
  PhotographerFilters,
  PaginatedResponse 
} from '@/types';

export const photographerService = {
  // Get all photographers with filters
  getPhotographers: async (filters?: PhotographerFilters): Promise<PaginatedResponse<Photographer>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const url = queryString ? `/photographers?${queryString}` : '/photographers';
    
    return api.get<PaginatedResponse<Photographer>>(url);
  },

  // Get photographer by ID
  getPhotographer: async (id: string): Promise<Photographer> => {
    const response = await api.get<Photographer>(`/photographers/${id}`);
    return response.data;
  },

  // Create new photographer
  createPhotographer: async (data: CreatePhotographerRequest): Promise<Photographer> => {
    const response = await api.post<Photographer>('/photographers', data);
    return response.data;
  },

  // Update photographer
  updatePhotographer: async (data: UpdatePhotographerRequest): Promise<Photographer> => {
    const { id, ...updateData } = data;
    const response = await api.put<Photographer>(`/photographers/${id}`, updateData);
    return response.data;
  },

  // Delete photographer
  deletePhotographer: async (id: string): Promise<void> => {
    await api.delete(`/photographers/${id}`);
  },

  // Get photographer projects
  getPhotographerProjects: async (photographerId: string) => {
    const response = await api.get(`/photographers/${photographerId}/projects`);
    return response.data;
  },

  // Get photographer schedule
  getPhotographerSchedule: async (photographerId: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const queryString = params.toString();
    const url = queryString ? `/photographers/${photographerId}/schedule?${queryString}` : `/photographers/${photographerId}/schedule`;
    
    const response = await api.get(url);
    return response.data;
  },

  // Update photographer availability
  updateAvailability: async (id: string, availability: any): Promise<Photographer> => {
    const response = await api.patch<Photographer>(`/photographers/${id}/availability`, availability);
    return response.data;
  },

  // Get photographer analytics
  getPhotographerAnalytics: async (photographerId: string) => {
    const response = await api.get(`/photographers/${photographerId}/analytics`);
    return response.data;
  },

  // Get photographer portfolio
  getPhotographerPortfolio: async (photographerId: string) => {
    const response = await api.get(`/photographers/${photographerId}/portfolio`);
    return response.data;
  },

  // Upload portfolio images
  uploadPortfolioImages: async (photographerId: string, images: File[]) => {
    const formData = new FormData();
    images.forEach(image => {
      formData.append('images', image);
    });
    
    const response = await api.post(`/photographers/${photographerId}/portfolio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update photographer rating
  updateRating: async (photographerId: string, rating: number, review?: string) => {
    const response = await api.post(`/photographers/${photographerId}/rating`, {
      rating,
      review,
    });
    return response.data;
  },

  // Get photographer equipment
  getPhotographerEquipment: async (photographerId: string) => {
    const response = await api.get(`/photographers/${photographerId}/equipment`);
    return response.data;
  },

  // Update photographer equipment
  updateEquipment: async (photographerId: string, equipment: string[]) => {
    const response = await api.patch(`/photographers/${photographerId}/equipment`, { equipment });
    return response.data;
  },
};
