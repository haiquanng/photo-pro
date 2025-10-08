// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Request Types
export interface CreateProjectRequest {
  title: string;
  clientId: string;
  photographerId: string;
  type: string;
  startDate: string;
  endDate: string;
  budget: number;
  location: string;
  description: string;
  deliverables: string[];
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  id: string;
  status?: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
  phone: string;
  tier: 'VIP' | 'Premium' | 'Standard';
  notes?: string;
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {
  id: string;
}

export interface CreatePhotographerRequest {
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  equipment: string[];
  hourlyRate: number;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

export interface UpdatePhotographerRequest extends Partial<CreatePhotographerRequest> {
  id: string;
}

// Filter and Search Types
export interface ProjectFilters {
  search?: string;
  status?: string;
  type?: string;
  photographerId?: string;
  clientId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface ClientFilters {
  search?: string;
  tier?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PhotographerFilters {
  search?: string;
  specialty?: string;
  availability?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Analytics Types
export interface AnalyticsRequest {
  startDate: string;
  endDate: string;
  groupBy?: 'day' | 'week' | 'month';
}

export interface RevenueAnalytics {
  totalRevenue: number;
  monthlyRevenue: number[];
  revenueGrowth: number;
  averageProjectValue: number;
}

export interface ProjectAnalytics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  projectCompletionRate: number;
}

export interface ClientAnalytics {
  totalClients: number;
  vipClients: number;
  newClients: number;
  clientRetentionRate: number;
}

export interface PhotographerAnalytics {
  totalPhotographers: number;
  averageUtilization: number;
  topPerformers: Array<{
    id: string;
    name: string;
    projects: number;
    revenue: number;
    rating: number;
  }>;
}
