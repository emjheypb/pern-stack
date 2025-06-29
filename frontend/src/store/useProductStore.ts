import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

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

const BASE_URL = "http://localhost:3000/api/products";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}`);
      set({ products: response.data.data as Product[], error: null });
    } catch (error: any) {
      set({ products: [], error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true });
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      const product = response.data.data as Product;
      set((prev: { products: Product[] }) => ({
        products: prev.products.filter((product) => product.id !== id),
        error: null,
      }));
      toast.success(`Product #${id} - ${product.name} Deleted`, {
        duration: 5000
      });
    } catch (error: any) {
      set({ products: [], error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },
}));
