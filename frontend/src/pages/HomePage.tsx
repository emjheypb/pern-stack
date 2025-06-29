import { useEffect } from "react";
import { type Product, useProductStore } from "../store/useProductStore";
import { PlusCircleIcon, RefreshCwIcon, SmileIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore() as {
    products: Product[];
    loading: boolean;
    error: string;
    fetchProducts: () => void;
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary">
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="loading loading-spinner loading-lg" />
        </div>
      )}
      {error && <div className="alert alert-error mb-8">{error}</div>}

      {!loading && !error && products && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {!loading && !error && products.length === 0 && (
        <div className="bg-primary/50 p-8 rounded-2xl flex flex-col items-center shadow-2xl">
          <p className="text-xl text-primary-content font-extrabold">
            Out of Stock
          </p>
          <p className="text-xs text-secondary-content flex items-center gap-1">
            We're working on it! <SmileIcon className="size-3" />
          </p>
        </div>
      )}
    </main>
  );
}

export default HomePage;
