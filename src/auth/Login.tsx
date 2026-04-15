import { useNavigate } from "react-router-dom";

import { userLogin } from './services';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { user, setNewUser } = useAuth();
  const navigate = useNavigate();

  async function onclick() {
    try {
      const response = await userLogin("admin", "pwd123");
      if (response.success) {
        if(response.user) setNewUser(response.user);
        navigate('/dashboard');
        console.log("Welcome", response.user?.username);
      } else {
        console.log("Login failed:", response.error);
      }
    } catch (err: unknown) {
      console.error("Network issue:", err);
    }
  }

  return (
    <>
      <h1>Login</h1>
      {user ? <p>{`Hello ${user.username}`}</p> : <button onClick={onclick}>Login</button>}
    </>
  )
}

export default Login
