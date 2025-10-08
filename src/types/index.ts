// Main Types Export
export * from './api';
export * from './auth';
export * from './notification';

// Core Business Types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'VIP' | 'Premium' | 'Standard';
  avatar?: string;
  totalProjects: number;
  totalSpent: number;
  joinDate: string;
  notes?: string;
}

export interface Photographer {
  id: string;
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
  avatar?: string;
  rating: number;
  totalProjects: number;
  joinDate: string;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  photographerId: string;
  photographerName: string;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'Delivered';
  type: 'Wedding' | 'Fashion' | 'Portrait' | 'Event' | 'Commercial' | 'Real Estate';
  startDate: string;
  endDate: string;
  budget: number;
  actualCost: number;
  location: string;
  description: string;
  deliverables: string[];
  files: ProjectFile[];
  timeline: ProjectMilestone[];
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface Invoice {
  id: string;
  projectId: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Analytics {
  totalRevenue: number;
  monthlyRevenue: number[];
  totalProjects: number;
  activeProjects: number;
  totalClients: number;
  vipClients: number;
  photographerUtilization: number;
  averageProjectValue: number;
  revenueGrowth: number;
  projectCompletionRate: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'shoot' | 'meeting' | 'delivery' | 'review';
  projectId?: string;
  photographerId?: string;
  clientId?: string;
  location?: string;
  description?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalProjects: number;
  activeProjects: number;
  totalClients: number;
  vipClients: number;
  photographerUtilization: number;
  averageProjectValue: number;
  revenueGrowth: number;
  projectCompletionRate: number;
}