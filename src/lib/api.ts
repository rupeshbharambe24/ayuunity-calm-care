const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('ayuunity-token');
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
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

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
