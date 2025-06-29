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

interface CreateProduct {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  tags?: string;
  expires_at?: string;
  best_before?: string;
  image?: string;
}

export interface ProductZustand {
  products: Product[];
  loading: boolean;
  error: string;
  currentProduct: Product;
  formData: CreateProduct;

  setFormData: (formData: CreateProduct) => void;
  resetForm: () => void;
  addProduct: () => void;
  fetchProducts: () => void;
  fetchProduct: (id: Number) => void;
  deleteProduct: (id: Number) => void;
  updateProduct: (id: Number) => void;
}

const BASE_URL = "http://localhost:3000/api/products";

export const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

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

  fetchProduct: async (id: number) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      const product = response.data.data as Product;
      const expiryDate = new Date(product.expires_at ? product.expires_at : "");
      const bbDate = new Date(product.best_before ? product.best_before : "");

      set({
        currentProduct: product,
        formData: {
          ...product,
          expires_at: formatDate(expiryDate),
          best_before: formatDate(bbDate),
        },
        error: null,
      });
    } catch (error: any) {
      set({ currentProduct: null, error: error.response.data.message });
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

  updateProduct: async (id: number) => {
    set({ loading: true });
    try {
      const { formData } = get() as { formData: CreateProduct };
      if (formData.expires_at === "" || isNaN(Date.parse(formData.expires_at || ""))) formData.expires_at = undefined;
      if (formData.best_before === "" || isNaN(Date.parse(formData.best_before || ""))) formData.best_before = undefined;

      const response = await axios.put(`${BASE_URL}/${id}`, formData);
      const updatedProduct: Product = response.data.data;
      const expiryDate = new Date(
        updatedProduct.expires_at ? updatedProduct.expires_at : ""
      );
      const bbDate = new Date(
        updatedProduct.best_before ? updatedProduct.best_before : ""
      );

      set({
        currentProduct: updatedProduct,
        formData: {
          ...updatedProduct,
          expires_at: expiryDate && formatDate(expiryDate),
          best_before: bbDate && formatDate(bbDate),
        },
        error: null,
      });
      toast.success(`#${updatedProduct.id} ${updatedProduct.name} Updated`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
