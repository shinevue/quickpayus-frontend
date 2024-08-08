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
      const lastPath = sessionStorage.getItem("lastPath");
      if (authPaths.indexOf(location.pathname) > -1) {
        navigate(lastPath || "/dashboard", {
          state: { from: location },
          replace: true,
        });
        // navigate("/signin");
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
