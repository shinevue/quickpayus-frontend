import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// antd
import { Menu, Popover, Radio, MenuProps } from "antd";

// styles
import * as Styled from "./Banner.styled";
import { useDevice } from "@/utils/Hooks/useDevice";
import { updateProfileField } from "@/app/profileSlice";
import { selectProfile, selectSetting } from "@/app/selectors";
import { updateSettingField } from "@/app/settingSlice";
import logo from "@/assets/Logo.svg";
import { API } from "@/utils/api";
import sidebarItems from "@/textContent/sidebarContent.json";
import { isAccessible } from "@/utils/utils";
import { selectPermission } from "../Auth/authSlice";

function getItem(label: any, key: any, icon: any, children: any, type: any) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const Banner = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [sMenuOpenKeys, setMenuOpenKeys] = useState<Array<string>>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const setting = useSelector(selectSetting);
  const isSignin = profile.username ? true : false;
  const navbarheight = 50;

  const navigate = useNavigate();

  const permissions = useSelector(selectPermission);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
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
    dispatch(updateProfileField({ field: "username", value: null }));
    localStorage.removeItem("token");
    API.defaults.headers.token = "";
    navigate("/signin");
  }, []);

  useEffect(() => {
    // setSelectedKey(themeMode);
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

  const handleClick = (key: string) => {
    if (key === "dark" || key === "light" || key === "auto") {
      setSelectedKey(key);
      dispatch(updateSettingField({ field: "themeMode", value: key }));
      localStorage.setItem("themeMode", key);
    } else {
      setCollapsed(false);
    }
  };

  const menuItems: MenuProps["items"] = [
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

  const adminmenuitems: MenuProps["items"] = [
    getItem(
      <Link to="/admin/userprofile">Profile</Link>,
      "1",
      null,
      null,
      null
    ),
    getItem(
      "Settings",
      "sub3",
      null,
      [
        getItem(
          <Link to="/admin/two-factor-authentication">2FA</Link>,
          "1",
          null,
          null,
          null
        ),
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
      ],
      null
    ),

    {
      type: "divider",
      key: "10",
    },
    getItem(<a onClick={signout}>Sign Out</a>, "4", null, null, null),
  ];

  const adminMenu = (
    <Menu
      onClick={(e) => handleClick(e.key)}
      selectedKeys={[selectedKey]}
      style={{
        borderInlineEnd: 0,
        width: 130,
      }}
      openKeys={sMenuOpenKeys}
      onOpenChange={setMenuOpenKeys}
      mode="inline"
      items={adminmenuitems}
    />
  );

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

  const [counter, setCounter] = useState(0);
  //   const {
  //     data: notifications,
  //     isError,
  //     isFetching,
  //     isLoading,
  //     isSuccess,
  //   } = useGetUnreadNotificationsCountQuery(null);

  //   useEffect(() => {
  //     if (isFetching || isLoading) {
  //       return;
  //     }
  //     if (isError) {
  //       return;
  //     }

  //     if (isSuccess) {
  //       setCounter(notifications?.total);
  //     }
  //   }, [isError, isFetching, isLoading, isSuccess, notifications]);

  return (
    <Styled.StyledHeader className="header" height={navbarheight}>
      <Styled.HeaderContainer>
        <div className={`md:hidden`} onClick={toggleMenu}>
          <div className="admin-menu-icon-container">
            <div className="admin-menu-icon">
              <span className={`line-1 ${isOpen ? "active" : ""}`}></span>
              <span className={`line-2 ${isOpen ? "active" : ""}`}></span>
            </div>
          </div>
        </div>
        <div className={`${isOpen ? "menu-opened active" : ""} md:hidden`}>
          <ul className="admin-desktop-nav ps-0 max-h-[calc(100vh-40px)] overflow-y-auto">
            {sidebarItems.map(
              (section: any, index) =>
                isAccessible(permissions || [], section.require) && (
                  <li key={index}>
                    {section.items.map(
                      (item: any, idx: number) =>
                        isAccessible(permissions || [], item.require) && (
                          <Link to={item.path} key={idx} className="mb-4" onClick={toggleMenu}>
                            {item.title}
                          </Link>
                        )
                    )}
                  </li>
                )
            )}
          </ul>
        </div>
        <Styled.PcLogoWrapper className={`max-md:hidden`}>
          <Link to="/dashboard">
            <Styled.PcLogo src={logo} alt="QUICKPAYUS" />
          </Link>
        </Styled.PcLogoWrapper>
        <Styled.PcLogoWrapper className={`md:hidden banner-item ${isOpen ? 'banner-hidden' : ""}`}>
          <Link to="/dashboard">
            <Styled.PcLogo src={logo} alt="QUICKPAYUS" />
          </Link>
        </Styled.PcLogoWrapper>
        {isSignin && (
          <Styled.CtaContainer className={`banner-item ${isOpen ? 'banner-hidden' : ""}`}>
            <Popover
              trigger="click"
              open={collapsed}
              onOpenChange={setCollapsed}
              overlayClassName="popover-menu"
              overlayInnerStyle={{
                padding: 0,
                background: "var(--color-bg-container)",
              }}
              content={<>{profile.role !== "user" ? adminMenu : userMenu}</>}
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
                  </Styled.AvatarInfoP1>
                </Styled.AvatarInfo>
              </Styled.AvatarWrapper>
            </Popover>
          </Styled.CtaContainer>
        )}
      </Styled.HeaderContainer>
    </Styled.StyledHeader>
  );
};

export default Banner;
