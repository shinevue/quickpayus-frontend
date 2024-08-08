import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Button, Layout, Result } from "antd";

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
import PrivateRoute from "../PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFoundPage } from "../Auth/NotFoundPage";
import { ForbiddenPage } from "../Auth/ForbiddenPage";
import { MethodNotAllowedPage } from "../Auth/MethodNotAllowedPage";
import AutoSignOut from "../Auth/AutoSignOut";

const { Content } = Layout;

const App = () => {
  const location = useLocation();
  const device = useDevice();

  const isSignInRoute =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/404" ||
    location.pathname === "/403" ||
    location.pathname === "/500";

  const contentStyle = {
    marginLeft: device?.isBreakpoint("MD") && !isSignInRoute ? "250px" : "0px",
    minHeight: "calc(100vh - 44px)",
    marginTop: "44px",
    padding: "var(--padding-content)",
  };
  const layoutStyle = {
    // borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  };

  return (
    <>
      <AutoSignOut />
      <Layout style={layoutStyle}>
        <Banner />
        <ToastContainer />
        <Layout
          style={{
            transition: "background 0.5s",
          }}
        >
          {!isSignInRoute && <Sider />}
          <Content style={contentStyle}>
            <Routes>
              <Route path="/" element={<Navigate to={"/signin"} />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/referrals"
                element={
                  <PrivateRoute>
                    <ReferralsList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transaction"
                element={
                  <PrivateRoute>
                    <TransactionsList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/change-name"
                element={
                  <PrivateRoute>
                    <ChangeName />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/change-email"
                element={
                  <PrivateRoute>
                    <ChangeEmail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/deactivate-account"
                element={
                  <PrivateRoute>
                    <DeactivateAccount />
                  </PrivateRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <PrivateRoute>
                    <Support />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rank"
                element={
                  <PrivateRoute>
                    <Rank />
                  </PrivateRoute>
                }
              />
              <Route
                path="/deposit"
                element={
                  <PrivateRoute>
                    <Deposit />
                  </PrivateRoute>
                }
              />
              <Route
                path="/withdrawal"
                element={
                  <PrivateRoute>
                    <Withdrawal />
                  </PrivateRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <PrivateRoute>
                    <ChangePassword />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/announcements"
                element={
                  <PrivateRoute>
                    <Announcements />
                  </PrivateRoute>
                }
              />
              <Route
                path="/verification"
                element={
                  <PrivateRoute>
                    <KycVerification />
                  </PrivateRoute>
                }
              />
              <Route
                path="/support/ticket"
                element={
                  <PrivateRoute>
                    <CustomTicket />
                  </PrivateRoute>
                }
              />
              <Route
                path="/support/feedback"
                element={
                  <PrivateRoute>
                    <Feedback />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/account-deletion"
                element={
                  <PrivateRoute>
                    <DeleteAccount />
                  </PrivateRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <PrivateRoute>
                    <SignIn />
                  </PrivateRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PrivateRoute>
                    <SignupForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PrivateRoute>
                    <ForgotPassword />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="403" element={<ForbiddenPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="500" element={<MethodNotAllowedPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
