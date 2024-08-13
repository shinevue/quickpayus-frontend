import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "antd";
// hooks
import { useDevice } from "@/utils/Hooks/useDevice";
// components
import UserDashboard from "../Dashboard/UserDashboard";
import Settings from "../Settings/Settings";
import Support from "../Support/Support";
import Rank from "../Rank/Rank";
import Deposit from "../Deposit/Deposit";
import Withdrawal from "../Withdraw";
import ChangePassword from "../Auth/Changepassword";
import { Notifications } from "../Notifications";
import Profile from "../Profile/Profile";
import { Announcements } from "../Announcements";
import Banner from "../Banner/Banner";
import TransactionsList from "../TransactionsList/TransactionsList";
import ReferralsList from "../ReferralsList/ReferralsList";
import { Sider } from "./Sider";
import { KycVerification } from "../KycVerification";
import CustomTicket from "../Support/CustomTicket";
import Feedback from "../Support/Feedback";
import DeleteAccount from "../DeleteAccount/Password";
import ChangeName from "../Settings/ChangeName";
import ChangeEmail from "../Settings/ChangeEmail";
import DeactivateAccount from "../Settings/DeactivateAccount";
import SignIn from "../Auth/SignIn";
import SignupForm from "../Auth/Signup";
import ForgotPassword from "../Auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFoundPage } from "../Auth/NotFoundPage";
import { ForbiddenPage } from "../Auth/ForbiddenPage";
import { MethodNotAllowedPage } from "../Auth/MethodNotAllowedPage";
import AutoSignOut from "../Auth/AutoSignOut";

const { Content } = Layout;

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("lastPath", window.location.pathname);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const location = useLocation();
  const device = useDevice();

  const isSignInRoute = useMemo(() => {
    const signInRoutes = [
      "/signin",
      "/signup",
      "/forgot-password",
      "/404",
      "/403",
      "/500",
    ];
    return (
      signInRoutes.includes(location.pathname) ||
      location.pathname.includes("/refer/")
    );
  }, [location.pathname]);

  const contentStyle = {
    marginLeft: device?.isBreakpoint("MD") && !isSignInRoute ? "250px" : "0px",
    minHeight: "calc(100vh - 44px)",
    marginTop: "44px",
    padding: "var(--padding-content)",
  };

  const layoutStyle = {
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  };

  const routes = [
    { path: "/", element: <Navigate to={"/signin"} /> },
    { path: "/dashboard", element: <UserDashboard /> },
    { path: "/referrals", element: <ReferralsList /> },
    { path: "/transaction", element: <TransactionsList /> },
    { path: "/settings", element: <Settings /> },
    { path: "/settings/change-name", element: <ChangeName /> },
    { path: "/settings/change-email", element: <ChangeEmail /> },
    { path: "/settings/deactivate-account", element: <DeactivateAccount /> },
    { path: "/support", element: <Support /> },
    { path: "/rank", element: <Rank /> },
    { path: "/deposit", element: <Deposit /> },
    { path: "/withdrawal", element: <Withdrawal /> },
    { path: "/change-password", element: <ChangePassword /> },
    { path: "/notifications", element: <Notifications /> },
    { path: "/profile", element: <Profile /> },
    { path: "/announcements", element: <Announcements /> },
    { path: "/verification", element: <KycVerification /> },
    { path: "/support/ticket", element: <CustomTicket /> },
    { path: "/support/feedback", element: <Feedback /> },
    { path: "/settings/account-deletion", element: <DeleteAccount /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignupForm /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/refer/:username", element: <SignupForm /> },
    { path: "403", element: <ForbiddenPage /> },
    { path: "404", element: <NotFoundPage /> },
    { path: "500", element: <MethodNotAllowedPage /> },
    // { path: "*", element: <Navigate to="/404" /> },
  ];

  return (
    <>
      <AutoSignOut />
      <Layout style={layoutStyle}>
        <Banner />
        <ToastContainer />
        <Layout
          style={{
            transition: "background 0.2s",
          }}
        >
          {!isSignInRoute && <Sider />}
          <Content style={contentStyle}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
