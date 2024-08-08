import { useState } from "react";
import * as Styled from "./FloatingInput.styled";

const FloatingLabelInputPassword = ({ label, field, name }) => {
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
      <Styled.StyledFloatInputPassword
        style={{ zIndex: 0 }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={field.onChange}
        value={field.value}
        name={name}
      />
    </Styled.InputWrapper>
  );
};

export default FloatingLabelInputPassword;
