import { Link } from "react-router-dom";
import rightArrow from "@/assets/images/red-right-arrow.svg";
import { Switch, Tooltip, message } from "antd";
import * as Styled from "./settings.styled.js";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import support from "@/assets/images/question.svg";
import { API } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "@/app/selectors";
import { updateProfileField } from "@/app/profileSlice";
import { toastify, toastify_success } from "@/utils/toastify";

const GeneralSettings = () => {
  const [iskycDone, setiskycDone] = useState(false);
  const [enableMFA, setEnableMFA] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const { isEnableMFA } = useSelector(selectProfile);
  const res = useSelector(selectProfile);

  useEffect(() => {
    setEnableMFA(isEnableMFA);
  }, [isEnableMFA]);

  const onChange = (checked: boolean) => {
    setEnableMFA(!enableMFA);
    handleChangeEmail(!enableMFA);
  };
  const handleChangeEmail = async (checked: boolean) => {
    if (checked == undefined) return;
    try {
      const { data } = await API.put("user/update/enable2FA", { checked });
      if (data.success) {
        dispatch(updateProfileField({ field: "isEnableMFA", value: checked }));
        messageApi.open({
          type: "success",
          content: data.message,
        });
      }
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
    }
  };
  return (
    <Styled.SettingsBox>
      {contextHolder}
      <Styled.SettingsBoxH2>Profile</Styled.SettingsBoxH2>
      <div>
        {iskycDone ? (
          <Styled.CustomLink to={""}>
            <Styled.SettingsBoxPdisable>Change Name</Styled.SettingsBoxPdisable>
            <Tooltip title="Unable to Change Name,as you have Done with your kyc Verification">
              <Styled.TooltipImg src={support} alt="help" />
            </Tooltip>
          </Styled.CustomLink>
        ) : (
          <Styled.CustomLink to="/settings/change-name">
            <Styled.SettingsBoxP>Change Name</Styled.SettingsBoxP>
            <RightOutlined />
          </Styled.CustomLink>
        )}

        <Styled.CustomLink to="/settings/change-email">
          <Styled.SettingsBoxP>Change Email</Styled.SettingsBoxP>
          <RightOutlined />
        </Styled.CustomLink>
        <Styled.CustomLink to="/change-password">
          <Styled.SettingsBoxP>Change Password</Styled.SettingsBoxP>
          <RightOutlined />
        </Styled.CustomLink>
        <Styled.CustomLink to="#">
          <Styled.SettingsBoxP>2FA</Styled.SettingsBoxP>
          <Switch value={enableMFA} onChange={onChange} />
        </Styled.CustomLink>
      </div>
    </Styled.SettingsBox>
  );
};

export default GeneralSettings;
