import styled from "styled-components";

// antd
import { Alert, Card, Select, Input, Button } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const StyledLabel = styled.label`
  margin-bottom: 8px;
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

export const FieldCover = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const PageHeading = styled.h2`
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  text-align: center;
  ${breakpoint.md} {
    text-align: left;
  }
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  // width: 100%;
  // padding: 10px 24px;
  // margin: 0px !important;
`;

export const PageCover = styled.div`
  width: 100%;
`;

export const AlertMessage = styled(Alert)`
  margin-bottom: 10px;
`;

export const SelectOne = styled(Select)`
  flex: 1;
  box-shadow: none;
`;

export const GradientButton = styled(Button)`
  border: none;
  background: linear-gradient(120deg, rgb(255, 107, 0, 66%), rgb(223, 11, 11));
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;
export const InputBox = styled(Input)`
  flex: 1;
  outline: none;
`;
export const CopyToClipboardContent = styled.button`
  position: absolute;
  right: 11px;
  cursor: pointer;
  border: none;
  background: var(--color-bg-container);
  cursor: pointer;
  color: var(--color-text);
`;
