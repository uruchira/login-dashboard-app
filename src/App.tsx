import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
// import ProtectedRoute from "./components/PrivateRoute"

import Login from "./auth/Login";
import Dashboard from "./dashboard";
import ProductForm from "./dashboard/ProductForm";
// import { useAuth } from './contexts/AuthContext';

function App() {
  // const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/new" element={<ProductForm />} />
        <Route path="dashboard/:id" element={<ProductForm />} />
        <Route path="*" element={<h3>The page not found</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
<Route path="dashboard" element={
  <ProtectedRoute user={user}>
    <Dashboard />
  </ProtectedRoute>
}/>
*/
