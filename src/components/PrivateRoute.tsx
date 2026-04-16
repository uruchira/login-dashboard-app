import { Navigate } from "react-router-dom";
import type { User } from "../types";

type ProtectedRouteProps = {
  user: User | null;
  children: React.ReactNode;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
