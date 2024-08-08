import React from "react";
import * as Styled from "./FloatingInput.styled";

interface FloatingInputProps {
  label: string;
  name: string;
  onChange: any;
  value: any;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  name,
  onChange,
  value,
}) => (
  <Styled.StyledFloatInputWrapper>
    <Styled.StyledFloatInput
      type="text"
      required
      spellCheck="false"
      name={name}
      onChange={(e) => onChange(e)}
      value={value}
    />
    <Styled.StyledFloatInputLabel>{label}</Styled.StyledFloatInputLabel>
  </Styled.StyledFloatInputWrapper>
);
