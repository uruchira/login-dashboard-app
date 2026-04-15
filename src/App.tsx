import { BrowserRouter } from "react-router";
import { Routes, Route } from 'react-router';
import ProtectedRoute from "./components/PrivateRoute"

import Login from './auth/Login';
import Dashboard from './dashboard';
import { useAuth } from './auth/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path="*" element={<h3>The page not found</h3>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;