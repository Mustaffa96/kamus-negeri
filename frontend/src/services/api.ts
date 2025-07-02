import axios from 'axios';
import { 
  Kamus, 
  Negeri, 
  CreateKamusDto, 
  UpdateKamusDto, 
  CreateNegeriDto, 
  UpdateNegeriDto 
} from '@/types';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Kamus API services
export const kamusApi = {
  // Get all kamus entries or search by dialek
  getAll: async (dialek?: string) => {
    const response = await api.get<Kamus[]>('/kamus', {
      params: dialek ? { dialek } : undefined,
    });
    return response.data;
  },

  // Get kamus by ID
  getById: async (id: number) => {
    const response = await api.get<Kamus>(`/kamus/${id}`);
    return response.data;
  },

  // Get kamus entries by negeri ID
  getByNegeriId: async (negeriId: number) => {
    const response = await api.get<Kamus[]>(`/kamus/negeri/${negeriId}`);
    return response.data;
  },

  // Create new kamus entry
  create: async (kamusData: CreateKamusDto) => {
    const response = await api.post<Kamus>('/kamus', kamusData);
    return response.data;
  },

  // Update kamus entry
  update: async (id: number, kamusData: UpdateKamusDto) => {
    const response = await api.patch<Kamus>(`/kamus/${id}`, kamusData);
    return response.data;
  },

  // Delete kamus entry
  delete: async (id: number) => {
    const response = await api.delete<void>(`/kamus/${id}`);
    return response.data;
  },
};

// Negeri API services
export const negeriApi = {
  // Get all negeri entries or search by name
  getAll: async (name?: string) => {
    const response = await api.get<Negeri[]>('/negeri', {
      params: name ? { name } : undefined,
    });
    return response.data;
  },

  // Get negeri by ID
  getById: async (id: number) => {
    const response = await api.get<Negeri>(`/negeri/${id}`);
    return response.data;
  },

  // Create new negeri entry
  create: async (negeriData: CreateNegeriDto) => {
    const response = await api.post<Negeri>('/negeri', negeriData);
    return response.data;
  },

  // Update negeri entry
  update: async (id: number, negeriData: UpdateNegeriDto) => {
    const response = await api.patch<Negeri>(`/negeri/${id}`, negeriData);
    return response.data;
  },

  // Delete negeri entry
  delete: async (id: number) => {
    const response = await api.delete<void>(`/negeri/${id}`);
    return response.data;
  },
};
