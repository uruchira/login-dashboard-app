import  { useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const initialProducts: Product[] = [
  { id: "1", name: "Laptop", price: 1200, description: "High performance laptop" },
  { id: "2", name: "Phone", price: 800, description: "Latest smartphone" }
];

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  if(initialProducts.length !== products.length) {
    setProducts(initialProducts)
  }

  return (
    <div>
      <h1>Products</h1>

      <button
        onClick={() => navigate("/dashboard/new")}
      >
        Add New
      </button>

      <ul>
        {products.map((p) => (
          <li
            key={p.id}
            onClick={() => navigate(`/dashboard/${p.id}`)}
          >
            <h2>{p.name}</h2>
            <p>Price: ${p.price}</p>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard