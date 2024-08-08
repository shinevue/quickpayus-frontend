import styled from "styled-components";
import { SolutionOutlined } from "@ant-design/icons";

export const Heading = styled.div`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 20px;
  font-weight: 600;
  padding: 16px 0px;
  padding-top: 0;
  // color: #0a0a0a;
  @media screen and (max-width: 1200px) {
    font-size: 16px;
  }
`;

export const FieldTitle = styled.div`
  width: 200px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 8px;
  border-radius: 8px;
  color: var(--color-text);
  text-align: left;
`;

export const FieldTitleRight = styled.div`
  width: 500px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  padding-bottom: 8px;
  border-radius: 8px;
  color: var(--color-text);
  text-align: left;
`;

export const FieldValue = styled.div`
  width: 200px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid var(--color-border-primary);
  color: #999;
  padding: 8px;
  border-radius: var(--border-radius-input);
  transition: border var(--transition-time-when-switch-theme-mode);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  @media screen and (max-width: 1500px) {
    flex-direction: column;
  }
  color: #0a0a0a;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImgGrp = styled.div`
  display: flex;
  gap: 16px;
`;

export const UploadImg = styled(SolutionOutlined)`
  font-size: 80px;
  padding: 10px 2px;
`;
