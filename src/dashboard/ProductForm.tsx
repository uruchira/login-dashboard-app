import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { addProduct, updateProduct } from "./services";
import { useProducts } from "../contexts/ProductContext";
import type { Product } from "../types";

const initialState = {
  sku: "",
  name: "",
  price: 0,
  quantity: 0,
  category: "",
  description: "",
  status: false,
};

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProducts } = useProducts();

  const existingProduct = allProducts.find((p) => p.sku === id);

  const [form, setForm] = useState<Product>(existingProduct || initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (existingProduct) {
      try {
        await updateProduct(existingProduct);
      } catch (err: unknown) {
        console.error("Error occured:", err);
      }
    } else {
      try {
        await addProduct(form);
      } catch (err: unknown) {
        console.error("Error occured:", err);
      }
    }

    navigate("/dashboard");
  };

  return (
    <div>
      <Link to="/dashboard">Back to Dashboard</Link>
      <h1>{existingProduct ? "Edit Product" : "Add Product"}</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="text"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          id="status"
          type="checkbox"
          name="status"
          checked={form.status}
          onChange={handleChange}
        />
        <label htmlFor="status">Is Active</label>
        <br />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
