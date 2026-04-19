import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../types";

type ProtectedRouteProps = {
  user: User | null;
  redirectPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  user,
  redirectPath = "/login",
  children,
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
