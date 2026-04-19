import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import LogoutLink from "./LogoutLink";

import type {
  ProductFormValues,
  ProductFormErrors,
  Product,
} from "../../types";
import {
  DEFAULT_PRODUCT_DATA,
  SKU,
  PRODUCT_NAME,
  PRICE,
  QUANTITY,
  DESCRIPTION,
  STATUS,
  SKU_REQUIRED_ERROR,
  PRODUCT_NAME_REQUIRED_ERROR,
  PRODUCT_NAME_LENGTH_ERROR,
  PRICE_REQUIRED_ERROR,
  PRICE_INVALID_ERROR,
  QUANTITY_REQUIRED_ERROR,
  QUANTITY_INVALID_ERROR,
  DESCRIPTION_TOO_LONG_ERROR,
} from "../../constants";
import { useParams } from "react-router-dom";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../../services/dashboardService";

function ProductManagement() {
  const [productData, setProductData] =
    useState<ProductFormValues>(DEFAULT_PRODUCT_DATA);
  const [productErrors, setProductErrors] = useState<ProductFormErrors>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      try {
        setLoading(true);
        const response: Product = await getProductById(`/api/products/${id}`);
        setProductData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    if (id) {
      fetchCurrentProduct();
    }
  }, [id]);

  const validate = (name: string, value: string) => {
    let errorMsg = "";
    if (name === SKU) {
      if (validator.isEmpty(value)) errorMsg = SKU_REQUIRED_ERROR;
    }

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
    return errorMsg;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newValue =
      name === STATUS ? (e.target as HTMLInputElement).checked : value;
    setProductData((prev) => ({ ...prev, [name]: newValue }));

    const errorMessage = validate(name, value);
    setProductErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const errorMessage = validate(name, value);

    setProductErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const isValid =
    Object.values(productErrors).every((error) => !error) && productData.sku;
  productData.productName && productData.price && productData.quantity;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isValid) {
      const newProduct = {
        ...productData,
        price: Number(productData.price),
        quantity: Number(productData.quantity),
      };

      setIsSubmitting(true);
      try {
        setLoading(true);
        if (id) {
          await updateProduct(`/api/products/${id}`, newProduct);
        } else {
          await addProduct("/api/products", newProduct);
        }
        navigate("/dashboard");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setError(null);
      }
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 w-[70%]">
      <div className="relative flex flex-col rounded-xl bg-transparent">
        <h4 className="block text-xl font-medium text-slate-800">
          {id ? "Edit Product" : "Add New Product"}
          <LogoutLink />
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
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="sku"
              >
                SKU
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="SKU"
                value={productData.sku}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {productErrors.sku && (
                <p className="text-red-500 mt-1 text-xs font-small">
                  {productErrors.sku}
                </p>
              )}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="productName"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
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
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
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
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="text"
                id="quantity"
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
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Category"
                value={productData.category}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
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
