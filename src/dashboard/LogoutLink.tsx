import { useNavigate } from "react-router-dom";

import { userLogout } from '../auth/services';
import { useAuth } from '../contexts/AuthContext';

function LogoutLink() {
  const { setNewUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
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
     <a href="#" onClick={handleLogout}>Logout</a>
  )
}

export default LogoutLink
