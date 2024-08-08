import styled from "styled-components";
import { Button, Steps as UiSteps, Divider as UiDivider } from "antd";

export const Header = styled.div`
  // font-family: IBM Plex Sans, sans-serif;
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  // padding: 1px 2px;
  // gap: 8px;
  // border-top-right-radius: 8px;
  // border-top-left-radius: 8px;
  /* border-bottom: 1px solid #f5f5f7; */
  @media screen and (max-width: 768px) {
    // padding: 16px;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  // color: #000;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const HeaderSubTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  color: #767678;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 2px;
  gap: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-family: IBM Plex Sans, sans-serif;
`;

export const Steps = styled(UiSteps)`
  max-width: 100%;
  padding: 0px;
  width: 6%;
  padding-left: 2%;
  @media screen and (max-width: 768px) {
    margin-left: -57px;
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
      width: 15px !important;
    }
    /* .ant-steps-item .ant-steps-item-process {
      width: 30px !important;
    }
    .ant-steps-item-container {
      width: 30px;
    } */
  }
`;

export const Divider = styled(UiDivider)`
  margin: 0px 0px;
`;
export const StyledDot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  margin-left: -8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f00000;
`;
export const StepsWrapper = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;
export const StepsContent = styled.div`
  width: 100%;
`;
export const BtnGroup = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;
export const PreviousBtn = styled(Button)`
  margin: 0 8px;
`;
