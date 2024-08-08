import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// antd
import { Menu, Layout } from "antd";

// hooks
import useThemeMode from "@/utils/Hooks/useThemeMode";

// icons
import DashboardIconLight from "@/assets/images/dashboard-icon-light.svg";
import DashboardIconFilledLight from "@/assets/images/dashboard-icon-filled-light.svg";
import DashboardIconDark from "@/assets/images/dashboard-icon-dark.svg";
import DashboardIconFilledDark from "@/assets/images/dashboard-icon-filled-dark.svg";
import TransactionsIconLight from "@/assets/images/transactions-icon-light.svg";
import TransactionsIconFilledLight from "@/assets/images/transactions-icon-filled-light.svg";
import TransactionsIconDark from "@/assets/images/transactions-icon-dark.svg";
import TransactionsIconFilledDark from "@/assets/images/transactions-icon-filled-dark.svg";
import DepositIconLight from "@/assets/images/deposit-icon-light.svg";
import DepositIconFilledLight from "@/assets/images/deposit-icon-filled-light.svg";
import DepositIconDark from "@/assets/images/deposit-icon-dark.svg";
import DepositIconFilledDark from "@/assets/images/deposit-icon-filled-dark.svg";
import WithdrawalIconLight from "@/assets/images/withdrawal-icon.svg";
import WithdrawalIconFilledLight from "@/assets/images/withdrawal-icon-filled-light.svg";
import WithdrawalIconDark from "@/assets/images/withdrawal-icon-dark.svg";
import WithdrawalIconFilledDark from "@/assets/images/withdrawal-icon-filled-dark.svg";
import ReferralsIconLight from "@/assets/images/referrals-icon-light.svg";
import ReferralsIconFilledLight from "@/assets/images/referrals-icon-filled-light.svg";
import ReferralsIconDark from "@/assets/images/referrals-icon-dark.svg";
import ReferralsIconFilledDark from "@/assets/images/referrals-icon-filled-dark.svg";
import RankIconLight from "@/assets/images/rank-icon-light.svg";
import RankIconFilledLight from "@/assets/images/rank-icon-filled-light.svg";
import RankIconDark from "@/assets/images/rank-icon-dark.svg";
import RankIconFilledDark from "@/assets/images/rank-icon-filled-dark.svg";
import { useDevice } from "@/utils/Hooks/useDevice";

// components
import SiderMenuItem from "./SiderMenuItem";

// breakpoints
import { breakpoint } from "@/breakpoints";

const { Sider: UiSider } = Layout;

const UiSiderCustom = styled(UiSider)`
  padding: 10px 15px;
  position: fixed !important;
  top: 44px;
  left: 0px;
  width: 25% !important;
  line-height: 120px;
  min-height: 100vh;
  color: #fff;
  background: var(--color-bg-container) !important;
  border-right: 1px solid var(--color-border-primary) !important;
  overflow: hidden;
  display: none;
  transition: all 0.2s, background var(--transition-time-when-switch-theme-mode),
    border var(--transition-time-when-switch-theme-mode) !important;
  ${breakpoint.md} {
    display: block;
  }
`;

const MenuCustom = styled(Menu)`
  border-inline-end: 0 !important;
  transition: background var(--transition-time-when-switch-theme-mode),
    border var(--transition-time-when-switch-theme-mode);
  .sider-menu-item.active {
    background: var(--color-bg-list-item-actived) !important;
    color: var(--color-text);
  }
  a {
    transition: color 0s;
  }
`;

export const Sider: React.FC = () => {
  const location = useLocation();
  const device = useDevice();

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { themeMode } = useThemeMode();

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("/dashboard")) {
      setSelectedOption("dashboard");
    } else if (pathname.includes("/referrals")) {
      setSelectedOption("referrals");
    } else if (pathname.includes("/transaction")) {
      setSelectedOption("transaction");
    } else if (pathname.includes("/support")) {
      setSelectedOption("support");
    } else if (pathname.includes("/withdrawal")) {
      setSelectedOption("withdrawal");
    } else if (pathname.includes("/deposit")) {
      setSelectedOption("deposit");
    } else if (pathname.includes("/announcements")) {
      setSelectedOption("announcements");
    } else if (pathname.includes("/settings")) {
      setSelectedOption("settings");
    } else if (pathname.includes("/rank")) {
      setSelectedOption("rank");
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);

  return (
    <>
      <UiSiderCustom
        // theme="light"
        width={!device?.isBreakpoint("MD") ? "0" : "250"}
      >
        <div className="logo" />
        <MenuCustom
          // theme="light"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          selectedKeys={[selectedOption]}
        >
          <SiderMenuItem
            icon={
              selectedOption == "dashboard"
                ? themeMode === "dark"
                  ? DashboardIconFilledDark
                  : DashboardIconFilledLight
                : themeMode === "dark"
                ? DashboardIconDark
                : DashboardIconLight
            }
            selectedOption={selectedOption}
            keyValue="dashboard"
            label="Dashboard"
          />
          <SiderMenuItem
            icon={
              selectedOption == "transaction"
                ? themeMode === "dark"
                  ? TransactionsIconFilledDark
                  : TransactionsIconFilledLight
                : themeMode === "dark"
                ? TransactionsIconDark
                : TransactionsIconLight
            }
            selectedOption={selectedOption}
            keyValue="transaction"
            label="Transactions"
          />
          <SiderMenuItem
            icon={
              selectedOption == "deposit"
                ? themeMode === "dark"
                  ? DepositIconFilledDark
                  : DepositIconFilledLight
                : themeMode === "dark"
                ? DepositIconDark
                : DepositIconLight
            }
            selectedOption={selectedOption}
            keyValue="deposit"
            label="Deposit"
          />
          <SiderMenuItem
            icon={
              selectedOption == "withdrawal"
                ? themeMode === "dark"
                  ? WithdrawalIconFilledDark
                  : WithdrawalIconFilledLight
                : themeMode === "dark"
                ? WithdrawalIconDark
                : WithdrawalIconLight
            }
            selectedOption={selectedOption}
            keyValue="withdrawal"
            label="Withdraw"
          />
          <SiderMenuItem
            icon={
              selectedOption == "referrals"
                ? themeMode === "dark"
                  ? ReferralsIconFilledDark
                  : ReferralsIconFilledLight
                : themeMode === "dark"
                ? ReferralsIconDark
                : ReferralsIconLight
            }
            selectedOption={selectedOption}
            keyValue="referrals"
            label="Referrals"
          />
          <SiderMenuItem
            icon={
              selectedOption == "rank"
                ? themeMode === "dark"
                  ? RankIconFilledDark
                  : RankIconFilledLight
                : themeMode === "dark"
                ? RankIconDark
                : RankIconLight
            }
            selectedOption={selectedOption}
            keyValue="rank"
            label="Rank"
          />
        </MenuCustom>
      </UiSiderCustom>
    </>
  );
};
