import { BrowserRouter } from "react-router";
import { Routes, Route } from 'react-router';

import Login from './auth/Login';
import Dashboard from './dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<p>The page not found</p>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;