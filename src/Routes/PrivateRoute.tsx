import React, { ReactNode, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// @redux
import { selectPermission } from "@/components/AdminComponents/Auth/authSlice";
import { isAccessible } from "@/utils/utils";
import { selectProfile } from "@/app/selectors";
import { updateSettingField } from "@/app/settingSlice";

// @types
import type { AppDispatch } from "@/app/store";
import type { Path, PathItem } from "@/types/SidebarType";

// @constants
import { authPaths } from "@/constants";
import { PATH } from "./path";


const paths: Path = PATH;

export const PrivateRoute: React.FC<{ children?: ReactNode }> = ({
  children,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const isAuthPath = authPaths.indexOf(location.pathname) > -1;
  const permission = useSelector(selectPermission);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (!profile.username) {
      if (!isAuthPath) {
        navigate("/signin", { state: { from: location }, replace: true });
      }
      return;
    }
    if (profile.role === "user") {
      navigate("/user/dashboard");
    } else if (!profile.role || permission?.length === 0) {
      if (!isAuthPath) {
        navigate("/signin", { state: { from: location }, replace: true });
      }
      return;
    } else {
      adminPermissionCheck();
    }
    // set theme mode
    const themeMode = localStorage.getItem("themeMode");
    dispatch(
      updateSettingField({
        field: "themeMode",
        value: themeMode ? themeMode : "light",
      })
    );
  }, [permission, location.pathname, profile]);

  const adminPermissionCheck = () => {
    let path = "";
    let isvalidUrl = true;
    let isContainedUrl = false;

    Object.keys(paths.ADMIN).forEach((key: string) => {
      const item: PathItem = paths.ADMIN[key];
      if (
        item.PATH === location.pathname &&
        !isAccessible(permission || [], item.REQUIREDROLE || "")
      ) {
        isvalidUrl = false;
      }
      if (!path && isAccessible(permission || [], item.REQUIREDROLE || "")) {
        path = item.PATH;
      }
      if (item.PATH === location.pathname) isContainedUrl = true;
    });

    if (!isContainedUrl || !isvalidUrl || isAuthPath)
      navigate(location.state || path);
  };

  return <>{children || <Outlet />}</>;
};
