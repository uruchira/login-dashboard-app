import { Link, useNavigate } from "react-router-dom";
import LogoutLink from "./LogoutLink";
import { useProducts } from "../../hooks/useProducts";
import DeleteIcon from "../../assets/delete-icon.svg";

function Dashboard() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Occured: {error}</p>;

  return (
    <div className="p-4 w-[70%]">
      <div className="flex items-center justify-between mb-2">
        <h4 className="block text-xl font-medium text-slate-800 mb-2">
          Products
          <LogoutLink />
        </h4>
        <Link
          to={"/dashboard/new"}
          className="text-sm text-slate-800 hover:underline"
        >
          Add New Product
        </Link>
      </div>

      <p className="text-slate-500 font-light mb-6">
        These are the products that we currently have in our database.
      </p>
      {products.length === 0 ? (
        <p className="text-slate-500 font-light">No products found.</p>
      ) : (
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
                <tr key={product.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {product.sku}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p
                      onClick={() => navigate(`/dashboard/${product.id}`)}
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 cursor-pointer underline hover:no-underline"
                    >
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
      )}
    </div>
  );
}

export default Dashboard;
