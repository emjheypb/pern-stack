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

export interface CreateProduct {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  tags?: string;
  expires_at?: string;
  best_before?: string;
  image?: string;
}

const BASE_URL = "http://localhost:3000/api/products";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  formData: {
    name: "",
    price: NaN,
    quantity: NaN,
  },

  setFormData: (formData: CreateProduct) => {
    set({ formData });
  },

  resetForm: () =>
    set({
      formData: {
        name: "",
        price: NaN,
        quantity: NaN,
        description: "",
        tags: "",
        expires_at: "",
        best_before: "",
        image: "",
      },
    }),

  addProduct: async (e: Event) => {
    e.preventDefault();

    set({ loading: true });
    try {
      const { formData } = get() as { formData: CreateProduct };
      if (formData.expires_at === "") formData.expires_at = undefined;
      if (formData.best_before === "") formData.best_before = undefined;

      const response = await axios.post(`${BASE_URL}`, formData);
      const newProduct: Product = response.data.data;
      const curr = get() as {
        fetchProducts: () => void;
        resetForm: () => void;
      };
      await curr.fetchProducts();
      curr.resetForm();
      toast.success(`${newProduct.quantity} ${newProduct.name} Added`);
      (
        document.getElementById("add_product_modal") as HTMLDialogElement | null
      )?.close();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}`);
      set({ products: response.data.data as Product[], error: null });
    } catch (error: any) {
      set({ products: [], error: error.response.data.message });
      toast.error(error.response.data.message);
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
        duration: 5000,
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
