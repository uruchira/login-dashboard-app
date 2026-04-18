import { useState, type ChangeEvent } from "react";
import validator from "validator";

export const PRODUCT_NAME = "productName";
export const PRICE = "price";
export const QUANTITY = "quantity";
export const CATEGORY = "category";
export const DESCRIPTION = "description";
export const STATUS = "status";

export const PRODUCT_NAME_REQUIRED_ERROR = "Product name is required";
export const PRODUCT_NAME_LENGTH_ERROR =
  "Product name must be at least 10 characters long";
export const PRICE_REQUIRED_ERROR = "Price is required";
export const PRICE_INVALID_ERROR = "Invalid price format";
export const QUANTITY_REQUIRED_ERROR = "Quantity is required";
export const QUANTITY_INVALID_ERROR = "Invalid quantity format";
export const DESCRIPTION_TOO_LONG_ERROR =
  "Description should have at most 10 characters";

export type Product = {
  sku: string;
  productName: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  status: boolean;
};

export type FormValues = Omit<Product, "sku">;

export type FormErrors = {
  productName?: string;
  price?: string;
  quantity?: string;
  category?: string;
  description?: string;
};

const initialState: FormValues = {
  productName: "",
  price: 0,
  quantity: 0,
  category: "",
  description: "",
  status: false,
};

function ProductManagement() {
  const [productData, setProductData] = useState<FormValues>(initialState);
  const [productErrors, setProductErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newValue =
      name === STATUS ? (e.target as HTMLInputElement).checked : value;
    setProductData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let errorMsg = name === STATUS ? false : "";

    if (name === PRODUCT_NAME) {
      if (validator.isEmpty(value)) errorMsg = PRODUCT_NAME_REQUIRED_ERROR;
      else if (!validator.isLength(value, { min: 10 }))
        errorMsg = PRODUCT_NAME_LENGTH_ERROR;
    }

    if (name === PRICE) {
      if (validator.isEmpty(value)) errorMsg = PRICE_REQUIRED_ERROR;
      else if (!validator.isNumeric(value)) errorMsg = PRICE_INVALID_ERROR;
    }

    if (name === QUANTITY) {
      if (validator.isEmpty(value)) errorMsg = QUANTITY_REQUIRED_ERROR;
      else if (!validator.isNumeric(value)) errorMsg = QUANTITY_INVALID_ERROR;
    }

    if (name === DESCRIPTION) {
      if (value && validator.isLength(value, { max: 10 }))
        errorMsg = DESCRIPTION_TOO_LONG_ERROR;
    }

    setProductErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isValid =
    Object.values(productErrors).every((error) => !error) &&
    productData.productName &&
    productData.price &&
    productData.quantity;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isValid) {
      setIsSubmitting(true);
      console.log("Form Submitted:", productData);
      console.log("Redirected to dashboard");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 w-[70%]">
      <div className="relative flex flex-col rounded-xl bg-transparent">
        <h4 className="block text-xl font-medium text-slate-800">
          Add New Product
          <span className="ml-2 rounded-md bg-slate-800 pb-0.5 px-2.5 border border-transparent text-sm text-white">
            Logout
          </span>
        </h4>
        <p className="text-slate-500 font-light">
          Please fill in the form below to create a new account.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Product Name"
                value={productData.productName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {productErrors.productName && (
                <p className="text-red-500 mt-1 text-xs font-small">
                  {productErrors.productName}
                </p>
              )}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Price</label>
              <input
                type="text"
                name="price"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Price"
                value={productData.price || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {productErrors.price && (
                <p className="text-red-500 mt-1 text-xs font-small">
                  {productErrors.price}
                </p>
              )}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Quantity"
                value={productData.quantity || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {productErrors.quantity && (
                <p className="text-red-500 mt-1 text-xs font-small">
                  {productErrors.quantity}
                </p>
              )}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Category
              </label>
              <input
                type="text"
                name="category"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Category"
                value={productData.category}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Type description here"
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
              />
              {productErrors.description && (
                <p className="text-red-500 mt-1 text-xs font-small">
                  {productErrors.description}
                </p>
              )}
            </div>
          </div>
          <div className="inline-flex items-center mt-2">
            <label
              className="flex items-center cursor-pointer relative"
              htmlFor="status"
            >
              <input
                id="status"
                type="checkbox"
                name="status"
                checked={productData.status}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <label
              className="cursor-pointer ml-2 text-slate-600 text-sm"
              htmlFor="status"
            >
              Is Active
            </label>
          </div>
          <button
            className="uppercase mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductManagement;
