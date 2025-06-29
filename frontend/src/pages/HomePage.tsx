import { useEffect } from "react";
import { type Product, useProductStore } from "../store/useProductStore";
import {
  PackageIcon,
  PlusCircleIcon,
  RefreshCwIcon,
  SmileIcon,
} from "lucide-react";
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
        <div className="flex flex-col items-center justify-center h-96 gap-2">
          <div className="">
            <PackageIcon className="size-12 text-base-content" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl text-base-content font-extrabold">
              Out of Stock
            </p>
            <p className="text-xs text-base-content/55 flex items-center gap-1">
              It's our turn to buy more stuff! <SmileIcon className="size-3" />
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default HomePage;
