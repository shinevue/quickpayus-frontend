import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";

// antd
import { Card, Input, Button, Checkbox, Select, Steps as UiSteps } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

interface StyledWrapperProps {
  navbarheight?: number;
}

export const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${({ navbarheight }) => `calc(100vh - ${navbarheight || 0}px)`};
  margin: calc(var(--padding-content) * -1);
  background: var(--color-bg-container);
  transition: background var(--transition-time-when-switch-theme-mode);
  ${breakpoint.md} {
    background: var(--color-bg-layout);
  }
`;
export const InputBox = styled.div`
  margin-top: 20px;
`;
export const InputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  display: block;
`;
export const InputWrapper = styled.div`
  // margin-bottom: 20px;
`;
export const BtnGrp = styled.div`
  margin-top: 30px;
  .ant-btn {
    font-size: 16px;
    padding: 6px 20px;
    height: 42px;
  }
`;
export const SignInWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0 10px;
`;
export const MainCard = styled(Card)`
  max-width: 500px;
  border: none;
  .ant-card-head {
    padding-top: 50px;
  }
`;
export const InputField = styled(Input)`
  font-size: 16px;
  border: 1px solid #1e1e1e;
  border-radius: 5px;
  padding: 7px 15px;
`;

export const InputFieldPassword = styled(Input.Password)`
  font-size: 16px;
  border-radius: var(--border-radius-input);
  padding: 7px 15px;
  .ant-input {
    border-radius: unset !important;
  }
`;
export const NextBtn = styled(Button)`
  margin-top: 10px;
`;
export const SignInBtn = styled.span`
  padding: 0 5px 0 0;
`;
export const StyleLink = styled(Link)`
  color: #007aff;
  &:hover {
    color: #007aff;
  }
`;
export const PrivacyTxt = styled.p`
  font-size: 12px;
  // color: #121212;
  padding: 0 10px;
`;
export const PrivacyTxt2 = styled.p`
  font-size: 12px;
  // color: #121212;
  opacity: 0;
  transition: height 0.2s ease, opacity 0.2s ease;
  visibility: hidden;
  padding: 0 10px;
`;
export const LearnMoreButton = styled.a`
  cursor: pointer;
  padding-left: 5px;
  color: #007aff;
  &:hover {
    color: #007aff;
  }
`;
export const StyledCheckbox = styled(Checkbox)`
  margin-top: 10px;
`;
export const CountrySelect = styled(ReactFlagsSelect)`
  button {
    border-radius: 8px !important;
  }
`;
export const Steps = styled(UiSteps)`
  max-width: 100%;
  padding: 0px;
  padding-left: 1px;

  .ant-steps-item {
    width: 50px !important;
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 16px);
    padding: 0px;
    .ant-steps-item-title {
      font-size: 14px;
    }
    .ant-steps {
      width: 30px !important;
    }
    .ant-steps-item {
      width: 30px !important;
    }

    .ant-steps-item .ant-steps-item-process .ant-steps-item-active {
      width: 30px !important;
    }
    .ant-steps-item-process {
      width: 30px !important;
    }

    .ant-steps-item-active {
      width: 30px !important;
    }
    .ant-steps-item-container {
      width: 30px;
    }

    .ant-steps-item-wait {
      width: 30px !important;
    }
    /* .ant-steps-item .ant-steps-item-process {
      width: 30px !important;
    }
    .ant-steps-item-container {
      width: 30px;
    } */
  }
`;
export const CountDownTimer = styled.div`
  text-align: center;
  margin-top: 20px;
`;
