import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { updateProfileField } from "@/app/profileSlice";
import * as Styled from "./settings.styled.js";
import {
  DeleteOutlined,
  LogoutOutlined,
  RightOutlined,
} from "@ant-design/icons";

const AccountDeactivation = () => {
  const dispatch = useDispatch();

  const signout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(updateProfileField({ field: "username", value: null }));
  }, []);

  return (
    <Styled.SettingsBox>
      <Styled.SettingsBoxH2>Account</Styled.SettingsBoxH2>
      <div>
        <Styled.CustomLink to="/settings/deactivate-account">
          <Styled.SettingsBoxP>Deactivate Account</Styled.SettingsBoxP>
          <RightOutlined />
        </Styled.CustomLink>
        <Styled.CustomLink to="/settings/account-deletion">
          <Styled.deletebtn>Delete Account</Styled.deletebtn>
          <DeleteOutlined style={{ color: "red" }} />
        </Styled.CustomLink>
        <Styled.CustomButton onClick={signout}>
          <Styled.SettingsBoxP>Sign Out</Styled.SettingsBoxP>
          <LogoutOutlined />
        </Styled.CustomButton>
      </div>
    </Styled.SettingsBox>
  );
};

export default AccountDeactivation;
