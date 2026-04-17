function App2() {
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
                  Name
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Job
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Employed
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  John Michael fdgfgg dffdgg dgfgfg
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager fgfg fghghghg weqwe
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  23/04/18
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <a
                  href="#"
                  onClick={handleDelete}
                  className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Alexa Liras dfgfgfg hjyiui
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Developer hjkkyfrtet
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  23/04/18
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <a
                  href="#"
                  onClick={handleDelete}
                  className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Laurent Perrier uiuoiopp
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Executive iuodsfsfdgg
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  19/09/17
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <a
                  href="#"
                  onClick={handleDelete}
                  className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Michael Levi gyiiuyuoi gfjgj
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Developer yfusd gfhghghk
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  24/12/08
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <a
                  href="#"
                  onClick={handleDelete}
                  className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Richard Gran fyyigfhfsdf fghyj
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager fghfgj yjhj
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  04/10/21
                </p>
              </td>
              <td className="p-4">
                <a
                  href="#"
                  onClick={handleDelete}
                  className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                >
                  Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App2;
