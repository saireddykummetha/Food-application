import axios from 'axios';
import type{ Restaurant, FilterOptions } from '../types/restaurant';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  getRestaurants: async (filters: FilterOptions): Promise<Restaurant[]> => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.cuisine) params.append('cuisine', filters.cuisine);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    if (filters.minRating) params.append('minRating', filters.minRating);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.isOpen) params.append('isOpen', filters.isOpen);
    
    const response = await axios.get(`${API_BASE_URL}/restaurants?${params.toString()}`);
    return response.data;
  },

  getCuisines: async (): Promise<string[]> => {
    const response = await axios.get(`${API_BASE_URL}/restaurants/cuisines`);
    return response.data;
  },

  seedData: async (): Promise<void> => {
    await axios.post(`${API_BASE_URL}/restaurants/seed`);
  }
};

