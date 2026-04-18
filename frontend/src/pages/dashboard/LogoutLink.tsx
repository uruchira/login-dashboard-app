import { useNavigate } from "react-router-dom";

import { userLogout } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

function LogoutLink() {
  const { setNewUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      const response = await userLogout();
      if (response) {
        setNewUser(null);
        navigate("/login");
      } else {
        console.log("Logout failed: ");
      }
    } catch (err: unknown) {
      console.error("Network issue: ", err);
    }
  }

  return (
    <span
      onClick={handleLogout}
      className="ml-2 rounded-md bg-slate-800 pb-0.5 px-2.5 border border-transparent text-sm text-white cursor-pointer"
    >
      Logout
    </span>
  );
}

export default LogoutLink;
