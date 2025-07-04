import { Link } from "react-router-dom";
import { type Product } from "../store/useProductStore";
import { ImageIcon, PlusIcon } from "lucide-react";

function ProductCard({ product }: { product: Product }) {
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
          <Link
            to={`/`}
            className="btn btn-sm btn-success btn-outline tooltip"
            data-tip="Add to Cart">
            <PlusIcon className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
