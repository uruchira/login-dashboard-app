import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoutLink from "./LogoutLink";
import { useProducts } from "../contexts/ProductContext";
import { getProducts } from "./services";
import type { Product } from "../types";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { updateProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await getProducts();
        setProducts(response);
        updateProducts(response);
      } catch (err: unknown) {
        console.error(err);
      }
    }
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="left-right">
        <h1>Products</h1>
        <LogoutLink />
      </div>
      <br />
      <button onClick={() => navigate("/dashboard/new")}>Add New</button>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.sku}
              onClick={() => navigate(`/dashboard/${p.sku}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{p.sku}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>{p.description || "-"}</td>
              <td>{p.status ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
