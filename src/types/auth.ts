// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'photographer' | 'client';
  avatar?: string;
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

// Session Types
export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}
