import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toastify } from "@/utils/toastify";
import { updateProfileField } from "@/app/profileSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const AutoSignOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const tokenExpiryTime = jwtDecode(token || "").exp?.toString(); // Assume this is set when token is acquired
    const currentTime = Date.now();
    if (
      location.pathname.indexOf("/signin") >= 0 ||
      location.pathname.indexOf("/signup") >= 0 ||
      location.pathname.indexOf("/404") >= 0
    )
      return;
    if (new Date() >= new Date(Number(tokenExpiryTime) * 1000)) {
      // Token has expired
      localStorage.removeItem("token");
      toastify("Token Expired!");
      navigate("/signin");
      dispatch(updateProfileField({ field: "username", value: null }));
    } else {
      // Set a timeout to automatically sign out the user when token expires
      const timeUntilExpiry = Number(tokenExpiryTime)* 1000 - currentTime;
      const key = setTimeout(() => {
        localStorage.removeItem('token');
        toastify("Token Expired!");
        navigate("/signin");
        dispatch(updateProfileField({ field: "username", value: null }));
      }, timeUntilExpiry);
      return () => clearTimeout(key);
    }
  }, [location]);

  return <></>;
};

export default AutoSignOut;
