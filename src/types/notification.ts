// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

export interface NotificationRequest {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  userId?: string;
  data?: Record<string, unknown>;
}

export interface NotificationFilters {
  read?: boolean;
  type?: string;
  page?: number;
  limit?: number;
}

// Real-time Events
export interface RealtimeEvent {
  type: 'project_updated' | 'client_updated' | 'photographer_updated' | 'notification';
  data: unknown;
  timestamp: string;
}

export interface WebSocketMessage {
  event: string;
  data: unknown;
  timestamp: string;
}
