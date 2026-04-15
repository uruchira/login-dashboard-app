import { useNavigate } from "react-router-dom";

import { userLogout } from '../auth/services';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { setNewUser } = useAuth();
  const navigate = useNavigate();

  async function onclick() {
    try {
      const response = await userLogout();
      if (response) {
        setNewUser(null);
        navigate('/login');
        console.log("You're logged out");
      } else {
        console.log("Logout failed: ");
      }
    } catch (err: unknown) {
      console.error("Network issue: ", err);
    }
  }

  return (
    <>
     <h1>Dashboard</h1>
     <button onClick={onclick}>Logout</button>
    </>
  )
}

export default Dashboard