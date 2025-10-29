// Main Types Export
export * from './api';
export * from './auth';
export * from './notification';

// User Roles
export type UserRole = 'Admin' | 'QC' | 'Photographer' | 'Editor' | 'Client-Regular' | 'Client-VIP';

// Core Business Types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'VIP' | 'Regular';
  avatar?: string;
  company?: string;
  address?: string;
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
  specialties: string[]; // e.g., "Interior", "Architecture", "Construction Site"
  equipment: string[];
  hourlyRate: number;
  availability: PhotographerAvailability;
  avatar?: string;
  rating: number;
  totalProjects: number;
  completedProjects: number;
  joinDate: string;
  bio?: string;
  portfolio?: string[];
}

export interface PhotographerAvailability {
  // Weekly availability
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  // Specific unavailable dates (for vacation, booked shoots, etc.)
  unavailableDates?: string[]; // ISO date strings
}

export interface Editor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[]; // e.g., "Color Grading", "Retouching", "Architecture"
  skills: string[]; // e.g., "Photoshop", "Lightroom", "Capture One"
  hourlyRate: number;
  availability: EditorAvailability;
  avatar?: string;
  rating: number;
  totalProjects: number;
  completedProjects: number;
  joinDate: string;
  bio?: string;
  portfolio?: string[];
  currentWorkload: number; // Current number of active projects
  maxWorkload: number; // Maximum concurrent projects
}

export interface EditorAvailability {
  // Weekly availability
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  // Working hours per day
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "18:00"
  // Specific unavailable dates
  unavailableDates?: string[]; // ISO date strings
}

// Project workflow: Pending -> Accepted -> In Progress -> Under Review -> Revision Requested -> Completed -> Delivered
export type ProjectStatus =
  | 'Pending'           // Client created, waiting for photographer
  | 'Accepted'          // Photographer accepted the project
  | 'In Progress'       // Photographer is shooting
  | 'Photos Uploaded'   // Photographer uploaded RAW files
  | 'Under Review'      // Client/Editor reviewing photos
  | 'Revision Requested'// Client requested changes
  | 'Editing'           // Editor is working on photos
  | 'Completed'         // All work done
  | 'Delivered';        // Files delivered to client

export type ProjectType =
  | 'Interior-Design'        // Chụp nội thất đã hoàn thiện
  | 'Construction-Progress'  // Chụp tiến độ thi công
  | 'Architecture-Exterior'  // Chụp kiến trúc bên ngoài
  | 'Before-After'           // Chụp trước và sau thi công
  | 'Detail-Shots';          // Chụp chi tiết nội thất

export interface Project {
  id: string;
  hashId: string; // Unique hash ID for the project (used for NAS folder structure)
  title: string;
  clientId: string;
  clientName: string;
  photographerId?: string; // Optional until photographer accepts
  photographerName?: string;
  editorId?: string; // Optional until editor is assigned
  editorName?: string;
  status: ProjectStatus;
  type: ProjectType;

  // Schedule & Location
  scheduledDate: string; // ISO datetime when shoot is scheduled
  location: string;
  locationAddress: string;
  locationNotes?: string; // Access instructions, parking info, etc.

  // Project details
  description: string;
  budget: number;
  paidAmount: number;

  // Files & Media
  files: ProjectFile[];
  coverImage?: string;

  // Collaboration
  comments: ProjectComment[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  completedAt?: string;
  deliveredAt?: string;
}

export type FileType = 'raw' | 'preview' | 'final' | 'document';
export type FileCategory = 'photo' | 'video' | 'document';

export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  originalName: string;
  fileType: FileType; // raw, preview, final, document
  category: FileCategory; // photo, video, document
  mimeType: string;
  size: number; // in bytes
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  uploadedAt: string;
  uploadedBy: string; // User ID
  uploadedByName: string; // User name
  version?: number; // For revision tracking
  nasPath?: string; // Path in NAS storage
  metadata?: {
    camera?: string;
    lens?: string;
    iso?: number;
    aperture?: string;
    shutterSpeed?: string;
    focalLength?: string;
  };
}

export interface ProjectComment {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;
  content: string;
  attachments?: CommentAttachment[];
  parentId?: string; // For threaded replies
  mentions?: string[]; // User IDs mentioned in comment
  createdAt: string;
  updatedAt?: string;
  isEdited: boolean;
  // New fields for enhanced comment system
  isInternal?: boolean; // Internal comment only visible to photographer/editor/admin
  isResolved?: boolean; // For marking comments as resolved
  priority?: 'low' | 'medium' | 'high'; // Comment priority
  tags?: string[]; // Tags for categorizing comments
}

export interface CommentAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
  stripeInvoiceId?: string;
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// DTO Types for creating/updating
export interface CreateProjectDTO {
  title: string;
  type: ProjectType;
  scheduledDate: string;
  location: string;
  locationAddress: string;
  locationNotes?: string;
  description: string;
  budget: number;
}

export interface UpdateProjectDTO {
  title?: string;
  type?: ProjectType;
  scheduledDate?: string;
  location?: string;
  locationAddress?: string;
  locationNotes?: string;
  description?: string;
  budget?: number;
  status?: ProjectStatus;
}

// Time slot for schedule picker
export interface TimeSlot {
  date: string; // ISO date
  time: string; // e.g., "09:00", "14:00"
  available: boolean;
  photographerId?: string;
  photographerName?: string;
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
  start: string; // ISO datetime
  end: string; // ISO datetime
  type: 'photoshoot' | 'site-visit' | 'meeting' | 'delivery';
  projectId?: string;
  photographerId?: string;
  clientId?: string;
  location?: string;
  locationAddress?: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  googleCalendarEventId?: string;
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