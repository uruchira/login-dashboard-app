import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard";
import ProductManagement from "./pages/dashboard/ProductManagement";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/new"
          element={
            <ProtectedRoute user={user}>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/:id"
          element={
            <ProtectedRoute user={user}>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h3>The page not found</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
