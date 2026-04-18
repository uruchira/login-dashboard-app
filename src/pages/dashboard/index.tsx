import { useState } from "react";
import DeleteIcon from "../../assets/delete-icon.svg";
import type { Product } from "../../types";

function Dashboard() {
  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (confirmation) {
      console.log("Deletion is done");
    } else {
      console.log("Deletion cancelled or wrong input");
    }
  };

  const [products] = useState<Omit<Product, "id">[]>([
    {
      sku: "SKU001",
      productName: "Product 1",
      price: 100,
      quantity: 10,
      category: "Category 1",
      description: "Description 1, Description 1",
      status: true,
    },
    {
      sku: "SKU002",
      productName: "Product 2",
      price: 200,
      quantity: 20,
      category: "Category 2",
      description: "",
      status: false,
    },
  ]);

  return (
    <div className="p-4 w-[70%]">
      <h4 className="block text-xl font-medium text-slate-800 mb-2">
        Products
        <span className="ml-2 rounded-md bg-slate-800 pb-0.5 px-2.5 border border-transparent text-sm text-white">
          Logout
        </span>
      </h4>
      <p className="text-slate-500 font-light mb-6">
        These are the products that we currently have in our database.
      </p>
      <div className="relative flex flex-col w-full h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  SKU
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-[20%]">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Product Name
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Price ($)
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Quantity
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Category
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-[25%]">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Description
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Status
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 flex items-center justify-center">
                  Actions
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.sku}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {product.sku}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {product.productName}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {product.price}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {product.quantity}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {product.category}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {product.description || "-"}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p
                    className={`block font-sans text-sm antialiased font-normal leading-normal ${product.status ? "text-green-500" : "text-red-500"}`}
                  >
                    {product.status ? "Active" : "Inactive"}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <span
                    onClick={handleDelete}
                    className="block font-sans text-sm antialiased font-medium text-blue-gray-900 flex items-center justify-center cursor-pointer"
                  >
                    <img src={DeleteIcon} alt="Delete" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
