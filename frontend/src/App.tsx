import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard";
import ProductManagement from "./pages/dashboard/ProductManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/new" element={<ProductManagement />} />
        <Route path="dashboard/:id" element={<ProductManagement />} />
        <Route path="*" element={<h3>The page not found</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
