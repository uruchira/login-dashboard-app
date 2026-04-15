import { login } from './services/auth';
import { useAuth } from './AuthContext';

function Login() {
  const { user, setNewUser } = useAuth();

  async function onclick() {
    try {
      const response = await login("admin", "pwd123");
      if (response.success) {
        if(response.user) setNewUser(response.user);
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
      <section id="center">
        {user ? `Hello ${user.username}` : <button onClick={onclick}>Login</button>}
      </section>
    </>
  )
}

export default Login
