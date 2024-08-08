import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Drawer from "@/components/UserComponents/Drawer/Drawer";
import { useCheckUserQuery } from "@/app/slice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useIsSignin from "@/utils/Hooks/useIsSignin";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "@/app/selectors";
import { updateProfileField } from "@/app/profileSlice";
const authPaths = ["/signin", "/signup", "/forgot-password"];
export default function AllRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const { isLoading } = useCheckUserQuery({});

  const isSignin = useIsSignin();

  const isAuthPath = useMemo(
    () => authPaths.includes(location.pathname),
    [location.pathname]
  );

  useEffect(() => {
    if (!isLoading)
      if (isSignin && profile.role === 'user') {
        const lastPath = sessionStorage.getItem("lastPath");
        if (isAuthPath) {
          navigate(lastPath || "/dashboard");
        }
      } else if (!isAuthPath) {
        localStorage.removeItem("token");
        dispatch(updateProfileField({ field: "username", value: null }));
        navigate("/signin");
      }
  }, [isSignin, location]);

  const spinner = (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />}
      fullscreen
    />
  );

  if (isLoading) {
    return spinner;
  }

  if (isAuthPath) {
    if (!isSignin) return <Drawer />;
    else return spinner;
  }
  
  return <Drawer />;
}
