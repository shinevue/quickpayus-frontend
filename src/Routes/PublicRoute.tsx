import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const RoleBasedRedirect: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken: { role: string } = jwtDecode<{ role: string }>(token);
          if (decodedToken.role) {
            setRole(decodedToken.role);
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem("token");
          navigate("/signin");
        }
      }
    }, [navigate]);
  
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "user") {
      // return <Navigate to="/user/dashboard" replace />;
    } else {
      return null; // or a loading spinner
    }
  };

const PublicRoute: React.FC = () => {
  return (
    <>
        <RoleBasedRedirect />
    </>
  );
};

export default PublicRoute;
