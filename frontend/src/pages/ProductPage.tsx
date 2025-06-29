import { useNavigate, useParams } from "react-router-dom";
import { useProductStore, type ProductZustand } from "../store/useProductStore";
import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  BoxesIcon,
  CalendarClockIcon,
  CaseSensitiveIcon,
  DollarSignIcon,
  ImageIcon,
  InfoIcon,
  SaveIcon,
  TagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

function ProductPage() {
  const {
    loading,
    error,
    currentProduct,
    formData,
    setFormData,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore() as ProductZustand;
  const navigate = useNavigate();
  const { id } = useParams();

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(today.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const todayMin = getTodayDate();

  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const addTag = (
    ele: HTMLInputElement,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && ele.value.trim()) {
      e.preventDefault();
      setTags((prev) => [...prev, ele.value]);
      setTag("");
      setFormData({ ...formData, tags: [...tags, ele.value].join(",") });
    }
  };

  useEffect(() => {
    fetchProduct(Number.parseInt(id || "0"));
  }, [fetchProduct, id]);

  useEffect(() => {
    setTags(
      currentProduct && currentProduct.tags
        ? currentProduct.tags.split(",")
        : []
    );
  }, [currentProduct]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(Number.parseInt(id || "0"));
      navigate("/");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          {currentProduct && currentProduct.image ? (
            <img
              src={currentProduct && currentProduct.image}
              alt={currentProduct && currentProduct.name}
              className="size-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="size-10" />
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl">Edit Product #{id}</h2>
            <p className="text-xs">Created on: {currentProduct && new Date(currentProduct.created_at).toLocaleString()}</p>
            <p className="text-xs mb-2">Last update: {currentProduct && new Date(currentProduct.updated_at).toLocaleString()}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(Number.parseInt(id || "0"));
              }}
              className="space-y-6">
              {/* NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Name <sup className="text-error">*</sup>
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <CaseSensitiveIcon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="New Product"
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Price <sup className="text-error">*</sup>
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <DollarSignIcon className="size-5" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* QUANTITY */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Quantity <sup className="text-error">*</sup>
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <BoxesIcon className="size-5" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    placeholder="0"
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Description
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <InfoIcon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. brand, weight, size, flavour, etc."
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* TAGS */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Tags</span>
                </label>
                <div className="flex flex-wrap gap-2 text-sm pb-1">
                  {tags.map((currTag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className="bg-primary text-primary-content rounded-full py-1 px-2 flex">
                      {currTag}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            tags: tags
                              .filter((_val, index) => index !== tagIndex)
                              .join(","),
                          });
                          setTags((prev) =>
                            prev.filter((_val, index) => index !== tagIndex)
                          );
                        }}>
                        <XIcon className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <TagIcon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Press ↵ to add tag (e.g. category, brand, etc.)"
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={(event) => addTag(event.currentTarget, event)}
                  />
                </div>
              </div>

              {/* EXPIRES AT */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Expiration Date
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <CalendarClockIcon className="size-5" />
                  </div>
                  <input
                    type="date"
                    min={todayMin}
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={formData.expires_at}
                    onChange={(e) =>
                      setFormData({ ...formData, expires_at: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* BEST BEFORE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Best Before
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <CalendarClockIcon className="size-5" />
                  </div>
                  <input
                    type="date"
                    min={todayMin}
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={formData.best_before}
                    onChange={(e) =>
                      setFormData({ ...formData, best_before: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Image URL
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                    <ImageIcon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* FORM ACTIONS */}
              <div className="flex flex-col gap-2 lg:flex-row justify-between mt-8">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    !formData.name ||
                    isNaN(formData.price) ||
                    !formData.quantity ||
                    loading
                  }>
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
