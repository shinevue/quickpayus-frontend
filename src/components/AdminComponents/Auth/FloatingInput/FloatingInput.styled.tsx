import styled from "styled-components";
import { Input } from "antd";

export const InputWrapper = styled.div`
  position: relative;
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 15px;
  background: var(--color-bg-container);
  padding: 0 2px;
  pointer-events: none;
`;

export const StyledFloatInputPassword = styled(Input.Password)`
  width: 100%;
  height: 45px;
  border-radius: 12px;
  font-size: 14px; // Consolidated to one font-size for consistency
  padding: 0 15px;
  background: transparent;
  outline: none;
  input {
    box-shadow: 0 0 0px 1000px var(--color-bg-container) inset !important;
    border-radius: unset !important;
    transition-property: background, border, box-shadow !important;
    transition-duration: 0.5s !important;
  }
`;

export const StyledFloatInput = styled(Input)`
   width: 100%;
  height: 45px;
  border-radius: 12px;
  font-size: 14px; // Consolidated to one font-size for consistency
  padding: 0 15px;
  background: transparent;
  outline: none;
  input {
    box-shadow: 0 0 0px 1000px var(--color-bg-container) inset !important;
    border-radius: unset !important;
    transition-property: background, border, box-shadow !important;
    transition-duration: 0.5s !important;
  }
`;
