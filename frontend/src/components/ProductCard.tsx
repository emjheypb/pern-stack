import { Link } from "react-router-dom";
import {
  useProductStore,
  type Product,
  type ProductZustand,
} from "../store/useProductStore";
import { EditIcon, ImageIcon, PlusIcon, TrashIcon } from "lucide-react";

function ProductCard({ product }: { product: Product }) {
  const { deleteProduct } = useProductStore() as ProductZustand;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-2xl transition-shadow duration-100">
      {/* IMAGE */}
      <Link to={`/product/${product.id}`} className="relative pt-[56.25%]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-primary/20">
            <ImageIcon className="size-10" />
          </div>
        )}
      </Link>

      <div className="card-body">
        {/* INFO */}
        <Link to={`/product/${product.id}`}>
          <h2 className="card-title text-lg font-semibold">{product.name}</h2>
          <p className="text-2xl font-bold text-primary">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-xs text-primary">
            {Number(product.quantity)} stock left
          </p>
        </Link>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <Link to={`/`} className="btn btn-sm btn-success btn-outline">
            <PlusIcon className="size-4" />
          </Link>
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-info btn-outline">
            <EditIcon className="size-4" />
          </Link>
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deleteProduct(product.id)}>
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
