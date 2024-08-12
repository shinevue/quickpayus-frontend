import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Layout } from "antd";
import AdminBanner from "./components/AdminComponents/Banner/Banner";
import UserBanner from "./components/UserComponents/Banner/Banner";

// @redux
import {
  GetPermissionAsync,
  checkAuthAsync,
  selectPermission,
} from "./components/AdminComponents/Auth/authSlice";
import { selectProfile } from "@/app/selectors";

// @types
import type { AppDispatch } from "@/app/store";
import { authPaths } from "./constants";

// @components
import Sidebar from "./components/AdminComponents/Sidebar";
import AutoSignOut from "./components/AdminComponents/Auth/AutoSignOut";
import { ToastContainer } from "react-toastify";
import { Sider } from "./components/UserComponents/Drawer/Sider";
import { useDevice } from "./utils/Hooks/useDevice";
import { getRequirementForPath, isAccessible } from "./utils/utils";
import { PrivateRouter } from "./Routes/PrivateRouter";


const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const isAuthPath = authPaths.indexOf(location.pathname) > -1;
  const profile = useSelector(selectProfile);
  const device = useDevice();
  const navigate = useNavigate();
  const permissions = useSelector(selectPermission);

  useEffect(() => {
    dispatch(GetPermissionAsync());
    dispatch(checkAuthAsync());
    
  }, [location.pathname, profile.role]);

  const layoutStyle = {
    // borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  };

  const contentStyle = {
    marginLeft: device?.isBreakpoint("MD") && !isAuthPath ? "250px" : "0px",
    minHeight: "calc(100vh - 44px)",
    marginTop: "44px",
    padding: "var(--padding-content)",
  };

  const { Content } = Layout;

  return (
    <div>
      <PrivateRouter>
        {profile.role === "" || profile.role === "user" || isAuthPath ? (
          <>
            <AutoSignOut />
            <Layout style={layoutStyle}>
              <UserBanner />
              <ToastContainer />
              <Layout
                style={{
                  transition: "background 0.2s",
                }}
              >
                <Content style={contentStyle}>
                 {!isAuthPath && <Sider />}
                  <Outlet />
                </Content>
              </Layout>
            </Layout>
          </>
        ) : (
          <div className="w-full min-h-screen flex-col overflow-hidden">
            <AdminBanner />
            <div className=" flex flex-row">
              {!isAuthPath && <Sidebar />}
              <AutoSignOut />
              <div id="content" className="grow flex flex-col justify-stretch">
                <Layout className="admin-content-layout">
                  <Outlet />
                </Layout>
              </div>
            </div>
          </div>
        )}
      </PrivateRouter>
    </div>
  );
};

export default App;
