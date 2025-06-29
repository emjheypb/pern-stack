import { create } from "zustand";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  tags?: string;
  expires_at?: string;
  best_before?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data as Product[], error: null });
    } catch (error: any) {
      set({ products: [], error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },
}));
