import React, { useState } from "react";
import * as Styled from "./FloatingInput.styled";

interface FloatingInputProps {
  label: string;
  field: any;
  name: string;
  type?: string;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  field,
  name,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    field.onBlur(e);
  };

  return (
    <Styled.InputWrapper>
      <Styled.StyledLabel
        style={{
          fontSize: "16px",
          transition: "all 0.3s ease-out",
           transform:
             isFocused || field.value ? "translate(calc(calc(0% + 0.625rem) * -1),calc(calc(50% + 0.875rem /2 - 6px) * -1)) rotate(0) skewX(0) skewY(0) scaleX(0.85) scaleY(0.85) " : "translate(0%,calc(0% + 9px)) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)",
          zIndex: 999,
        }}
      >
        {label}
      </Styled.StyledLabel>
      <Styled.StyledFloatInput
        style={{ zIndex: 0 }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
          field.onChange(e);
        }}
        value={field.value}
        name={name}
        type={type}
      />
    </Styled.InputWrapper>
  );
};
