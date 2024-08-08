import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import sidebarItems from "@/textContent/sidebarContent.json";

import * as Styled from "./Style/Sidebar.styled";
import { isAccessible } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectPermission } from "./Auth/authSlice";
import { API } from "@/utils/api";
import { updateProfileField } from "@/app/profileSlice";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const permissions = useSelector(selectPermission);

  const dispatch = useDispatch();
  const location = useLocation();

  const signOut = () => {
    dispatch(updateProfileField({ field: "username", value: null }));
    localStorage.removeItem("token");
    API.defaults.headers.token = "";
  };

  return (
    <>
      <Styled.Nav id="main-sidebar" className={`max-md:hidden`}>
        <div className="text-2xl md:hidden block cursor-pointer fixed z-50 ">
          <div className="menu-icon-container">
            <div className="menu-icon">
              <span
                className="line-1"
                style={{ transform: "rotateZ(-45deg)", top: "0px" }}
              ></span>
              <span
                className="line-2"
                style={{ transform: "rotateZ(45deg)", top: "0px" }}
              ></span>
            </div>
          </div>
        </div>

        <div id="drawers">
          {sidebarItems.map(
            (section: any, index) =>
              isAccessible(permissions || [], section.require) && (
                <div key={index} className="">
                  {section?.title && (
                    <p className="text-xs text-[#0A84FF] font-bold my-2 uppercase">
                      {section.title}
                    </p>
                  )}
                  {section.items.map(
                    (item: any, idx: number) =>
                      isAccessible(permissions || [], item.require) && (
                        <Styled.StyledNavLink
                          to={item.path}
                          key={idx}
                          style={location.pathname.indexOf(item.path) >= 0 ? {backgroundColor: "var(--background-affix-hover)"} : {}}
                        >
                          {item.title}
                        </Styled.StyledNavLink>
                      )
                  )}
                </div>
              )
          )}
        </div>
        {/* <div
          id="setting"
          className="px-4"
          style={{ color: "var(--color-text)" }}
          onClick={signOut}
        >
          <h4
            className="cursor-pointer flex items-center justify-start gap-2"
          >
            Sign out <LogoutOutlined />
          </h4>
        </div> */}
      </Styled.Nav>
    </>
  );
};

export default Sidebar;
