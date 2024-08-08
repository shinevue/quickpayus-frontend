import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  SystemNotifications,
  AdminProfile,
  Announcement,
  ClaimedRewards,
  CreditPercentage,
  DataBackup,
  EmailSendingMechanism,
  KycDetails,
  ReceiverAddressManagement,
  UserDetails,
  UserNotifications,
  UserPermissionAndRoles,
} from "@/components/AdminComponents/index";

import UserDashboard from "@/components/AdminComponents/Users/Dashboard/UserDashboard.tsx";
import AdminDashboard from "@/components/AdminComponents/Admin/Dashboard/components/AdminDashboard.tsx";
import ProfitConfig from "@/components/AdminComponents/Admin/ProfitConfig/ProfitConfig.tsx";
import TwoFactor from "@/components/AdminComponents/Admin/TwoFactor/components/TwoFactor.tsx";
import ReferralProgram from "@/components/AdminComponents/Admin/ReferralProgram/ReferralProgram.tsx";
import Transactions from "@/components/AdminComponents/Admin/Transactions/Transactions.tsx";
import App from "@/App.tsx";
import ProfileAbout from "@/components/AdminComponents/Profile/ProfileAbout.tsx";
import RankManagement from "@/components/AdminComponents/Admin/RankManagement/RankManagement.tsx";
import ReferralsList from "@/components/UserComponents/ReferralsList/ReferralsList.tsx";
import TransactionsList from "@/components/UserComponents/TransactionsList/TransactionsList.tsx";
import Settings from "@/components/UserComponents/Settings/Settings.tsx";
import ChangeName from "@/components/UserComponents/Settings/ChangeName.tsx";
import ChangeEmail from "@/components/UserComponents/Settings/ChangeEmail.tsx";
import DeactivateAccount from "@/components/UserComponents/Settings/DeactivateAccount.tsx";
import Support from "@/components/UserComponents/Support/Support.tsx";
import Rank from "@/components/UserComponents/Rank/Rank.tsx";
import Deposit from "@/components/UserComponents/Deposit/Deposit.tsx";
import Withdrawal from "@/components/UserComponents/Withdraw/index.tsx";
import ChangePassword from "@/components/UserComponents/Auth/Changepassword.tsx";
import { Notifications } from "@/components/UserComponents/Notifications/Notifications.tsx";
import Profile from "@/components/UserComponents/Profile/Profile.tsx";
import { Announcements } from "@/components/UserComponents/Announcements/Announcements.tsx";
import { KycVerification } from "@/components/UserComponents/KycVerification/KycVerification.tsx";
import CustomTicket from "@/components/UserComponents/Support/CustomTicket.tsx";
import Feedback from "@/components/UserComponents/Support/Feedback.tsx";
import DeleteAccount from "@/components/UserComponents/DeleteAccount/Password";
import { ForbiddenPage } from "@/components/AdminComponents/Auth/ForbiddenPage.tsx";
import { NotFoundPage } from "@/components/AdminComponents/Auth/NotFoundPage.tsx";
import { MethodNotAllowedPage } from "@/components/AdminComponents/Auth/MethodNotAllowedPage.tsx";
import UserProblems from "@/components/AdminComponents/Admin/UserProblem/components/UserProblems";
import FeedbackMechanism from "@/components/AdminComponents/Admin/FeedbackMechanism/components/FeedbackMechanism";
import SignIn from "@/components/UserComponents/Auth/SignIn";
import ForgotPassword from "@/components/UserComponents/Auth/ForgotPassword";
import SignupForm from "@/components/UserComponents/Auth/Signup";

const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <>
            <AdminDashboard />
            <SystemNotifications />
          </>
        ),
      },
      {
        path: "announcement",
        element: <Announcement />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "userprofile",
        element: <ProfileAbout />,
      },
      {
        path: "user-details",
        element: <UserDetails />,
      },
      {
        path: "kyc",
        element: <KycDetails />,
      },
      {
        path: "user-problems",
        element: <UserProblems />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "credit-percentage",
        element: <CreditPercentage />,
      },
      {
        path: "claimed-rewards",
        element: <ClaimedRewards />,
      },
      {
        path: "profit-configuration",
        element: <ProfitConfig />,
      },
      {
        path: "referral-program",
        element: <ReferralProgram />,
      },
      {
        path: "rank-management",
        element: <RankManagement />,
      },
      {
        path: "receiver-address-management",
        element: <ReceiverAddressManagement />,
      },
      {
        path: "two-factor-authentication",
        element: <TwoFactor />,
      },
      {
        path: "user-permission",
        element: <UserPermissionAndRoles />,
      },
      {
        path: "feedbacks",
        element: <FeedbackMechanism />,
      },
      {
        path: "email-sending",
        element: <EmailSendingMechanism />,
      },
      {
        path: "user-notifications",
        element: <UserNotifications />,
      },
      {
        path: "data-backup",
        element: <DataBackup />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to={"/signin"} /> },
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "referrals",
        element: <ReferralsList />,
      },
      {
        path: "transaction",
        element: <TransactionsList />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "settings/change-name",
        element: <ChangeName />,
      },
      {
        path: "settings/change-email",
        element: <ChangeEmail />,
      },
      {
        path: "settings/deactivate-account",
        element: <DeactivateAccount />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "rank",
        element: <Rank />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "withdrawal",
        element: <Withdrawal />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path: "verification",
        element: <KycVerification />,
      },
      {
        path: "support/ticket",
        element: <CustomTicket />,
      },
      {
        path: "support/feedback",
        element: <Feedback />,
      },
      {
        path: "settings/account-deletion",
        element: <DeleteAccount />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignupForm />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
      {
        path: "403",
        element: <ForbiddenPage />,
      },
      {
        path: "404",
        element: <NotFoundPage />,
      },
      {
        path: "500",
        element: <MethodNotAllowedPage />,
      },
    ],
  },
]);

export { router };
