const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || import.meta.env.DEV;

interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private mockMode: boolean = USE_MOCKS;
  private healthCheckDone: boolean = false;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('ayuunity-token');
  }

  async checkHealth(): Promise<boolean> {
    if (this.healthCheckDone) return !this.mockMode;
    
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000),
      });
      this.mockMode = !response.ok;
      this.healthCheckDone = true;
      return response.ok;
    } catch {
      this.mockMode = true;
      this.healthCheckDone = true;
      return false;
    }
  }

  isMockMode(): boolean {
    return this.mockMode;
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('ayuunity-token', token);
    } else {
      localStorage.removeItem('ayuunity-token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Mock responses in demo mode
    if (this.mockMode) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));
      return this.getMockResponse<T>(endpoint, options.method || 'GET');
    }

    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          error: {
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred',
          },
        }));
        throw new Error(error.error.message);
      }

      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // Network error - enable mock mode and retry
        this.mockMode = true;
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.getMockResponse<T>(endpoint, options.method || 'GET');
      }
      throw error;
    }
  }

  private getMockResponse<T>(endpoint: string, method: string): T {
    // Mock OTP request
    if (endpoint === '/auth/otp/request' && method === 'POST') {
      return { request_id: 'demo-req-' + Date.now() } as T;
    }

    // Mock OTP verify
    if (endpoint === '/auth/otp/verify' && method === 'POST') {
      // Check if this is a professional login (will have role in state)
      const isPro = Math.random() > 0.5; // In real demo, read from request
      
      if (isPro) {
        // Professional login - return pending status by default
        const demoProStatus = import.meta.env.VITE_DEMO_PRO_STATUS || 'pending';
        return {
          token: 'demo-token-pro-' + Date.now(),
          user: {
            id: 'demo-user-pro-1',
            name: 'Demo Professional',
            email: 'pro@ayuunity.health',
            roles: ['doctor'],
            status: demoProStatus,
          },
          roles: ['doctor'],
          status: demoProStatus,
        } as T;
      }
      
      // Patient login
      return {
        token: 'demo-token-' + Date.now(),
        user: {
          id: 'demo-user-1',
          name: 'Demo User',
          email: 'demo@ayuunity.health',
          roles: ['patient'],
          status: 'active',
        },
        roles: ['patient'],
        status: 'active',
      } as T;
    }

    // Mock session
    if (endpoint === '/auth/session' && method === 'GET') {
      if (this.token && this.token.startsWith('demo-token')) {
        return {
          user: {
            id: 'demo-user-1',
            name: 'Demo User',
            email: 'demo@ayuunity.health',
            roles: ['patient'],
            status: 'active',
          },
          roles: ['patient'],
          status: 'active',
        } as T;
      }
      throw new Error('Not authenticated');
    }

    // Mock logout
    if (endpoint === '/auth/logout' && method === 'POST') {
      return {} as T;
    }

    // Mock patient signup
    if (endpoint === '/auth/signup/patient' && method === 'POST') {
      const token = 'demo-token-patient-' + Date.now();
      this.setToken(token);
      return {
        user_id: 'demo-user-' + Date.now(),
        token: token,
      } as T;
    }
    
    // Mock professional signup
    if (endpoint.includes('/auth/signup/') && method === 'POST') {
      return {
        ticket_id: `demo-ticket-${Date.now()}`,
        status: 'pending',
      } as T;
    }
    
    // Mock draft endpoints
    if (endpoint.includes('/draft')) {
      return {} as T;
    }

    // Default empty response
    return {} as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async uploadFile(file: File): Promise<{ id: string; url: string; type: string; size: number }> {
    const formData = new FormData();
    formData.append('file', file);

    const headers: { [key: string]: string } = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}/files`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Helper function for simple API requests
export async function apiRequest<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const method = options?.method || 'GET';
  const body = options?.body ? JSON.parse(options.body as string) : undefined;
  
  switch (method) {
    case 'GET':
      return apiClient.get<T>(endpoint);
    case 'POST':
      return apiClient.post<T>(endpoint, body);
    case 'PATCH':
      return apiClient.patch<T>(endpoint, body);
    case 'DELETE':
      return apiClient.delete<T>(endpoint);
    default:
      return apiClient.get<T>(endpoint);
  }
}

// Type definitions for API responses
export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  avatar?: string;
  roles?: string[];
  status?: 'active' | 'pending' | 'rejected';
}

export interface Record {
  id: string;
  title: string;
  type: 'lab' | 'imaging' | 'prescription' | 'other';
  fileId: string;
  fileUrl: string;
  takenAt: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  scheduledAt: string;
  mode: 'in-person' | 'teleconsult';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  location: string;
  rating: number;
  verified: boolean;
  avatar?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
