import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";

// antd
import { Badge, Menu, QRCode, Popover, Radio, MenuProps } from "antd";
import Icon, { CheckCircleOutlined, CopyOutlined } from "@ant-design/icons";

// hooks
import { useDevice } from "@/utils/Hooks/useDevice";
import useNavbarheight from "@/utils/Hooks/useNavbarheight";
import useThemeMode from "@/utils/Hooks/useThemeMode";
import useIsSignin from "@/utils/Hooks/useIsSignin";

// assets
import logoLight from "@/assets/images/logo-light.svg";
import logoDark from "@/assets/images/logo-dark.svg";
import VerifiedBadge from "@/assets/images/verified.svg";

// redux
import {
  useGetNotificationsQuery,
  useGetUnreadNotificationsCountQuery,
} from "@/app/slice";
import { updateSettingField } from "@/app/settingSlice";
import {
  selectSetting,
  selectProfile,
  selectIsNewNotification,
} from "@/app/selectors";
import { updateProfileField } from "@/app/profileSlice";
import { updateOtpStatus } from "@/app/slices/otpSlice";

// styles
import * as Styled from "./Banner.styled";
import { APP_BASE_URL } from "@/utils/constants";
import { setNotifications } from "@/app/slices/notificationsSlice";
import { authPaths } from "@/constants";

const AnnouncementIcon = () => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="1 1 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5,7.087a3,3,0,0,0-3,3v3.826a3,3,0,0,0,2,2.816V21a1,1,0,0,0,1,1H9a1,1,0,0,0,1-1V17.423l10.609,4.5A1,1,0,0,0,22,21V3a1,1,0,0,0-1.391-.921L8.8,7.087ZM8,20H6V16.913H8Zm0-5.087H5a1,1,0,0,1-1-1V10.087a1,1,0,0,1,1-1H8Zm2-6.164L20,4.51V19.49L10,15.251Z" />
  </svg>
);

function getItem(label: any, key: any, icon: any, children: any, type: any) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const CopyToClipBoard = ({
  copied,
  onCopy,
  name,
}: {
  copied: boolean;
  onCopy: () => void;
  name: string;
}) => {
  const { protocol, hostname, port } = window.location;

  const link =
    `${protocol}//${hostname}${port ? `:${port}` : ""}` + "/refer/" + name;
  return (
    <>
      <QRCode
        value={link}
        style={{
          marginTop: "0px",
        }}
      />
      <div className="d-flex">
        <CopyToClipboard text={link} onCopy={onCopy}>
          <Styled.CopyToClipboardContent>
            {copied ? (
              <>
                Copied! <CheckCircleOutlined />
              </>
            ) : (
              <>
                Copy <CopyOutlined />
              </>
            )}
          </Styled.CopyToClipboardContent>
        </CopyToClipboard>
      </div>
    </>
  );
};

export const Banner = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [sMenuOpenKeys, setMenuOpenKeys] = useState<Array<string>>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const setting = useSelector(selectSetting);
  const profile = useSelector(selectProfile);
  const { username: name } = profile;

  const navbarheight = useNavbarheight();
  const { themeMode } = useThemeMode();
  const isSignin = useIsSignin();

  const navigate = useNavigate();

  const location = useLocation();

  const isAuthPath = authPaths.indexOf(location.pathname) > -1;

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      if (event.target.parentNode.className.includes("avatarMenu0")) {
        return;
      }
      if (
        event.target.parentNode.id === "avatarMenu0" ||
        event.target.parentNode.id === "avatarMenu1"
      ) {
        return;
      }
      setCollapsed(false);
    }

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      if (event.target.parentNode.parentNode.id === "mobileAvatarMenu") {
        return;
      }
      setCollapsed(false);
    }
  };

  const signout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(updateProfileField({ field: "username", value: null }));
    dispatch(updateOtpStatus("failed"));
    navigate('/signin');
  }, []);

  useEffect(() => {
    setSelectedKey(themeMode);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedKey(setting.themeMode);
  }, [setting.themeMode]);

  useEffect(() => {
    if (!collapsed) {
      setMenuOpenKeys([]);
    }
  }, [collapsed]);

  const handleClick = (key) => {
    if (key === "dark" || key === "light" || key === "auto") {
      setSelectedKey(key);
      dispatch(updateSettingField({ field: "themeMode", value: key }));
      localStorage.setItem("themeMode", key);
    } else {
      setCollapsed(false);
    }
  };

  const menuItems: MenuProps["items"] = [
    getItem(<Link to="/profile">Profile</Link>, "1", null, null, null),
    getItem(<Link to="/settings">Settings</Link>, "2", null, null, null),
    getItem(<Link to="/support">Support</Link>, "3", null, null, null),
    getItem(
      "Mode",
      "sub2",
      null,
      [
        getItem(
          <Radio checked={selectedKey === "dark"}>Dark</Radio>,
          "dark",
          null,
          null,
          null
        ),
        getItem(
          <Radio checked={selectedKey === "light"}>Light</Radio>,
          "light",
          null,
          null,
          null
        ),
        getItem(
          <Radio checked={selectedKey === "auto"}>Auto</Radio>,
          "auto",
          null,
          null,
          null
        ),
      ],
      null
    ),
    {
      type: "divider",
      key: "10",
    },
    getItem(<a onClick={signout}>Sign Out</a>, "4", null, null, null),
  ];

  const userMenu = (
    <Menu
      onClick={(e) => handleClick(e.key)}
      selectedKeys={[selectedKey]}
      style={{
        borderInlineEnd: 0,
        width: 120,
      }}
      openKeys={sMenuOpenKeys}
      onOpenChange={setMenuOpenKeys}
      mode="inline"
      items={menuItems}
    />
  );

  const device = useDevice();
  const [openCloseNav, setOpenCloseNav] = useState(false);
  const handleNavigation = () => {
    setOpenCloseNav(!openCloseNav);
  };

  const {
    data: notificationsList,
    error,
    isError,
    isSuccess,
    isLoading: isNotificationsLoading,
    isFetching,
    refetch,
  } = useGetNotificationsQuery({ page: 1 });

  useEffect(() => {
    if (notificationsList) {
      if (notificationsList.success) {
        dispatch(setNotifications(notificationsList));
      } else {
        dispatch(setNotifications({ data: [], total: 0 }));
      }
    }
  }, [
    isFetching,
    isError,
    isSuccess,
    error,
    isNotificationsLoading,
    notificationsList?.data,
    dispatch,
    notificationsList,
  ]);

  useEffect(() => {
    refetch();
  }, []);
  const isUnReadNotification = useSelector(selectIsNewNotification);

  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Styled.StyledHeader className="header" height={navbarheight}>
      {device?.isBreakpoint("MD") && (
        <Styled.HeaderContainer>
          <Styled.PcLogoWrapper>
            <Link to="/dashboard">
              <Styled.PcLogo
                src={themeMode === "dark" ? logoDark : logoLight}
                alt="QUICKPAYUS"
              />
            </Link>
          </Styled.PcLogoWrapper>
          {isSignin&& !isAuthPath && (
            <Styled.CtaContainer>
              <Popover
                trigger="click"
                overlayClassName="popover-qrcode"
                overlayStyle={{
                  padding: 9,
                }}
                overlayInnerStyle={{
                  padding: 10,
                  background: "var(--color-bg-container)",
                }}
                content={
                  <div>
                    <Styled.ReferralTitle>Referral code</Styled.ReferralTitle>
                    <CopyToClipBoard
                      copied={copied}
                      onCopy={onCopy}
                      name={name}
                    />
                  </div>
                }
                style={{ background: "red" }}
              >
                <Styled.CustomQrCodeIcon />
              </Popover>
              <Link to="/announcements">
                <Icon
                  component={AnnouncementIcon}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                />
              </Link>
              <Link to="/notifications">
                <Badge dot={isUnReadNotification} size="default">
                  <Styled.BellOutlinedNew />
                </Badge>
              </Link>
              <Popover
                trigger="click"
                open={collapsed}
                onOpenChange={setCollapsed}
                overlayClassName="popover-menu"
                overlayInnerStyle={{
                  padding: 0,
                  background: "var(--color-bg-container)",
                }}
                content={<>{userMenu}</>}
              >
                <Styled.AvatarWrapper>
                  <Styled.StyledAvatar
                    className="avatarMenu0"
                    style={{ background: profile?.avatarBg }}
                  >
                    {profile?.firstName[0]?.toUpperCase()}
                  </Styled.StyledAvatar>
                  <Styled.AvatarInfo id="avatarMenu1">
                    <Styled.AvatarInfoP1>
                      {profile.firstName} {profile.lastName}
                      {profile.kyc.status === "APPROVED" ? (
                        <Styled.Verified src={VerifiedBadge} />
                      ) : (
                        <></>
                      )}
                    </Styled.AvatarInfoP1>
                    <Styled.AvatarInfoP2>
                      Level: {profile.investmentLevel || "A"}
                    </Styled.AvatarInfoP2>
                  </Styled.AvatarInfo>
                </Styled.AvatarWrapper>
              </Popover>
            </Styled.CtaContainer>
          )}
        </Styled.HeaderContainer>
      )}
      {!device?.isBreakpoint("MD") && (
        <div
          className={`nav-container container-xxl ${
            openCloseNav ? "active menu-opened" : ""
          }`}
        >
          <nav>
            {isSignin && !isAuthPath && (
              <ul className="mobile-nav ps-0 ">
                <li>
                  <div
                    className="menu-icon-container"
                    onClick={() => handleNavigation()}
                  >
                    <div className="menu-icon">
                      <span className="line-1"></span>
                      <span className="line-2"></span>
                    </div>
                  </div>
                </li>
                <li>
                  <Styled.CustomList>
                    <li
                      className={`banner-item ${
                        openCloseNav ? "banner-hidden" : ""
                      }`}
                    >
                      <Popover
                        trigger="click"
                        overlayClassName="popover-qrcode"
                        overlayStyle={{
                          padding: 9,
                        }}
                        overlayInnerStyle={{
                          padding: 10,
                          background: "var(--color-bg-container)",
                        }}
                        content={
                          <>
                            <div>
                              <Styled.CustomListContent
                                style={{
                                  paddingBottom: "10px",
                                  textAlign: "center",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                Referral code
                              </Styled.CustomListContent>
                              <CopyToClipBoard
                                copied={copied}
                                onCopy={onCopy}
                                name={name}
                              />
                            </div>
                          </>
                        }
                      >
                        <Styled.CustomQrCodeIcon />
                      </Popover>
                    </li>

                    <li
                      className={`banner-item ${
                        openCloseNav ? "banner-hidden" : ""
                      }`}
                    >
                      <Link to="/announcements">
                        <Icon
                          component={AnnouncementIcon}
                          style={{ fontSize: "14px", cursor: "pointer" }}
                        />
                      </Link>
                    </li>
                    <li
                      className={`banner-item ${
                        openCloseNav ? "banner-hidden" : ""
                      }`}
                    >
                      <Link to="/notifications">
                        <Badge dot={isUnReadNotification} size="default">
                          <Styled.BellOutlinedNew />
                        </Badge>
                      </Link>
                    </li>
                    <li
                      className={`banner-item ${
                        openCloseNav ? "banner-hidden" : ""
                      }`}
                    >
                      <Popover
                        trigger="click"
                        open={collapsed}
                        onOpenChange={setCollapsed}
                        overlayClassName="popover-menu"
                        overlayStyle={{
                          padding: "3px 5px",
                        }}
                        overlayInnerStyle={{
                          padding: 0,
                          background: "var(--color-bg-container)",
                        }}
                        content={<>{userMenu}</>}
                      >
                        <Styled.AvatarWrapper id="mobileAvatarMenu">
                          <Styled.StyledAvatar
                            style={{ background: profile?.avatarBg }}
                          >
                            {profile?.firstName[0]?.toUpperCase()}
                          </Styled.StyledAvatar>
                          {profile.kyc.status === "APPROVED" ? (
                            <Styled.Verified src={VerifiedBadge} />
                          ) : (
                            <></>
                          )}
                        </Styled.AvatarWrapper>
                      </Popover>
                    </li>
                  </Styled.CustomList>
                </li>
              </ul>
            )}

            <ul className="desktop-nav ps-0">
              <li>
                <Link
                  to="/#"
                  className="link-logo"
                  onClick={() => setOpenCloseNav(false)}
                ></Link>
              </li>
              <li>
                <Link to="/dashboard" onClick={() => setOpenCloseNav(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/transaction" onClick={() => setOpenCloseNav(false)}>
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/deposit" onClick={() => setOpenCloseNav(false)}>
                  Deposit
                </Link>
              </li>
              <li>
                <Link to="/withdrawal" onClick={() => setOpenCloseNav(false)}>
                  Withdraw
                </Link>
              </li>
              <li>
                <Link to="/referrals" onClick={() => setOpenCloseNav(false)}>
                  Referrals
                </Link>
              </li>
              <li>
                <Link
                  to="/rank"
                  className="nav-link me-0"
                  onClick={() => setOpenCloseNav(false)}
                >
                  Rank
                </Link>
              </li>
            </ul>
            <Styled.MobileLogoWrapper>
              <Styled.MobileLogoLink to="/dashboard">
                <Styled.MobileLogo
                  className={`banner-item ${
                    openCloseNav ? "banner-hidden" : ""
                  }`}
                  src={themeMode === "dark" ? logoDark : logoLight}
                  alt="QUICKPAYUS"
                />
              </Styled.MobileLogoLink>
            </Styled.MobileLogoWrapper>
          </nav>
        </div>
      )}
    </Styled.StyledHeader>
  );
};

export default Banner;
