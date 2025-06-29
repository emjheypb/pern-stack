import {
  DollarSignIcon,
  ImageIcon,
  PlusCircleIcon,
  CaseSensitiveIcon,
  BoxesIcon,
  InfoIcon,
  TagIcon,
  CalendarClockIcon,
  XIcon,
} from "lucide-react";
import { useProductStore, type ProductZustand } from "../store/useProductStore";
import { useEffect, useState } from "react";

function AddProductModal() {
  const { loading, addProduct, formData, setFormData, resetForm, products } =
    useProductStore() as ProductZustand;
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(today.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const todayMin = getTodayDate();

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
    setTags([]);
  }, [products]);

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <dialog id="add_product_modal" className="modal">
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-xl mb-8">Add Product</h3>

        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
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
                  placeholder="e.g. category, brand, etc. then press Enter"
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
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button
              type="reset"
              className="btn btn-ghost"
              onClick={() => {
                resetForm();
                setTags([]);
                setTag("");
              }}>
              Reset
            </button>

            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
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
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default AddProductModal;
