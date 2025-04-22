
// User types
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  lastLogin: string;
  createdAt: string;
}

// Report/Feature types
export interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  urlPath: string;
  isActive: boolean;
  createdAt: string;
}

// User-Report association
export interface UserReport {
  id: string;
  userId: string;
  reportId: string;
  grantedAt: string;
  grantedBy: string;
}

// Access request
export interface AccessRequest {
  id: string;
  userId: string;
  reportId: string;
  justification: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewerComments?: string;
  user?: User;
  report?: Report;
}

// Auth context types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
