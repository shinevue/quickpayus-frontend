import styled from "styled-components";

// antd
import { Input } from "antd";

export const StyledFloatInputWrapper = styled.div`
  position: relative;
`;

export const StyledFloatInput = styled(Input)`
  width: 100%;
  height: 35px;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
  // border: 1px solid #d3d3d3;
  // color: #0a0a0a;
  outline: none;
  font-size: 14px;

  &:focus {
    // border: 1px solid #000;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: 0;
    left: 15px;
    font-size: 12px;
    padding: 0 2px;

    position: absolute; /* Ensure label can be positioned relative to input */
    transition: all 0.3s ease; /* Smooth transition for label movement */
    color: black; /* Set label text color */
  }
`;

export const StyledFloatInputLabel = styled.label`
  position: absolute;
  top: 80%;
  left: 15px;
  transform: translateY(-100%);
  color: var(--color-text);
  font-size: 14px;
  pointer-event: none;
  transition: 0.3s;
`;
