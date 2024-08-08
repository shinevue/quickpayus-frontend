import React, { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// hooks
import useIsSignin from "@/utils/Hooks/useIsSignin";

interface PrivateRouteProps {
  children: ReactNode;
}

const authPaths = ["/signin", "/signup", "/forgot-password"];

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignin = useIsSignin();

  useEffect(() => {
    if (isSignin) {
      if (authPaths.indexOf(location.pathname) > -1) {
        navigate("/dashboard");
      }
    } else {
      if (authPaths.indexOf(location.pathname) < 0) {
        navigate("/signin");
      }
    }
  }, [isSignin, location]);

  return children;
};

export default PrivateRoute;
