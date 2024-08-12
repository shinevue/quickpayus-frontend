import React, { ReactNode, useEffect, useCallback, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Spin } from "antd";
import {
  selectAuthStatus,
  selectPermission,
  checkAuthAsync,
} from "@/components/AdminComponents/Auth/authSlice";
import { getRequirementForPath, isAccessible } from "@/utils/utils";
import { selectProfile } from "@/app/selectors";
import { updateSettingField } from "@/app/settingSlice";
import type { AppDispatch } from "@/app/store";
import type { Path, PathItem } from "@/types/SidebarType";
import { authPaths } from "@/constants";
import { LoadingOutlined } from "@ant-design/icons";
import { API } from "@/utils/api";
import { updateKyc } from "@/app/slices/KycVerificationSlice";

interface PrivateRouteProps {
  children?: ReactNode;
}

export const PrivateRouter: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const isAuthPath = authPaths.includes(location.pathname);
  const permission = useSelector(selectPermission, shallowEqual);
  const profile = useSelector(selectProfile, shallowEqual);
  const authStatus = useSelector(selectAuthStatus, shallowEqual);
  const permissions = useSelector(selectPermission);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    const theme = localStorage.getItem("themeMode");
    setThemeMode(theme || "light");
    document.body.classList.add(
      theme === "black" ? "black-mode" : "light-mode"
    );
    document.body.classList.remove(
      theme === "black" ? "light-mode" : "black-mode"
    );
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("lastPath", window.location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      setCheckingAuth(true);
      await dispatch(checkAuthAsync());
      try {
        const response = await API.get(`/auth/check`);
        const data = await response.data;
        dispatch(updateKyc({ data: data?.kyc }));
      } catch (error) {}
      setCheckingAuth(false);
    };

    if (authStatus === "idle") {
      checkAuth();
    } else {
      setCheckingAuth(false);
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    if (checkingAuth || authStatus === "loading") return;

    if (!profile.username) {
      if (!isAuthPath) {
        navigate("/signin", { state: { from: location }, replace: true });
      }
      return;
    }
    //MARK: Important

    if (profile.role) {
      if (
        !isAuthPath &&
        profile.role !== "user" &&
        location.pathname.indexOf("admin") < 0
      ) {
        navigate("/404");
        return;
      }
      if (
        !isAuthPath &&
        profile.role === "user" &&
        location.pathname.indexOf("admin") >= 0
      ) {
        navigate("/404");
        return;
      }
      if (profile.role !== "user") {
        const require = getRequirementForPath(location.pathname);
        if (!isAuthPath && !isAccessible(permissions || [], require)) {
          navigate("/404");
        }
      }
    }

    const theme = localStorage.getItem("themeMode");
    setThemeMode(theme || "light");
    document.body.classList.add(
      theme === "black" ? "black-mode" : "light-mode"
    );
    document.body.classList.remove(
      theme === "black" ? "light-mode" : "black-mode"
    );
    dispatch(
      updateSettingField({
        field: "themeMode",
        value: theme || "light",
      })
    );
  }, [
    profile.username,
    profile.role,
    permission,
    location,
    navigate,
    isAuthPath,
    dispatch,
    checkingAuth,
    authStatus,
  ]);

  const backgroundColor = themeMode === "dark" ? "#000000" : "#ffffff";

  const isAuth = checkingAuth || authStatus === "loading";

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: isAuth ? "101" : "-1",
          left: 0,
          top: 0,
          transition: "0.5s",
          display: "flex",
          opacity: isAuth ? "1" : "0",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: backgroundColor,
        }}
      >
        <Spin
            style={{width: "120px"}}
          indicator={<LoadingOutlined style={{ fontSize: "48px" }} spin />}
        />
      </div>
      {children}
    </>
  );
};
