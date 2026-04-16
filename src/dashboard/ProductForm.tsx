import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const iProducts: Product[] = [
  { id: "1", name: "Laptop", price: 1200, description: "HP laptop" },
  { id: "2", name: "Phone", price: 800, description: "Smartphone" }
];

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingProduct = iProducts.find((p) => p.id === id);

  const [form, setForm] = useState<Product>(
    existingProduct || { id: "", name: "", price: 0, description: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (existingProduct) {
      // update
      console.log("update");
    } else {
      // create
     console.log("create");
    }

    navigate("/dashboard");
  };

  return (
    <div>
      <h1>
        {existingProduct ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;