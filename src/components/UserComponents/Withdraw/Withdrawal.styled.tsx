import styled from "styled-components";

// antd
import { Select, Card, Alert } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const Balance = styled.div`
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-input);
  color: var(--color-text);
  width: 200px;
  height: 32px;
  margin-bottom: 10px;
  padding: 4px 8px;
  transition: border var(--transition-time-when-switch-theme-mode);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
  margin-top: 16px;
  gap: 16px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const AlertMessage = styled(Alert)`
  margin-bottom: 10px;
`;

export const StyledH2 = styled.h2`
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  text-align: center;
  ${breakpoint.md} {
    text-align: left;
  }
`;
export const StyledForm = styled.form`
  text-align: left;
`;
export const InputWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  outline-style: none;
`;
export const StyledSelect = styled(Select)`
  margin-bottom: 10px;
  width: 100%;
  min-width: 190px;
`;
export const StyledCard = styled(Card)`
  border: none;
  // margin-top: -10px;
  margin-bottom: 20px;
`;
