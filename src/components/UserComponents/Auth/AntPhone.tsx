import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { CountrySelector, usePhoneInput } from "react-international-phone";

// antd
import { Button, Input, InputRef, Space } from "antd";

import "react-international-phone/style.css";

interface AntPhoneProps {
  value: string;
  onChange: any;
  onBlur: any;
  name: string;
  handleChange: any;
}

const StyledInput = styled(Input)`
  border-top-left-radius: unset !important;
  border-bottom-left-radius: unset !important;
`;

const StyledButton = styled(Button)`
  border-start-end-radius: 0 !important;
  border-end-end-radius: 0 !important;
  padding: 4px;
  height: 100%;
  z-index: 1;
`;

export const AntPhone: React.FC<AntPhoneProps> = ({
  value,
  onChange,
  handleChange,
}) => {
  const phoneInput = usePhoneInput({
    defaultCountry: "us",
    // value,
    onChange: (data) => {
      // onChange(data.phone);
      handleChange(data?.country?.dialCode,data.phone);
    },
  });

  const inputRef = useRef<InputRef>(null);

  // Need to reassign inputRef because antd provides not default ref
  useEffect(() => {
    if (phoneInput.inputRef && inputRef.current?.input) {
      phoneInput.inputRef.current = inputRef.current.input;
    }
  }, [inputRef, phoneInput.inputRef]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Space.Compact style={{ width: "100%" }}>
        <CountrySelector
          selectedCountry={phoneInput.country.iso2}
          onSelect={(country) => phoneInput.setCountry(country.iso2)}
          renderButtonWrapper={({ children, rootProps }) => (
            <StyledButton {...rootProps}>{children}</StyledButton>
          )}
          dropdownStyleProps={{
            style: {
              top: "35px",
            },
          }}
        />
        <StyledInput
          placeholder="Phone number"
          type="tel"
          value={phoneInput.inputValue}
          name="phone"
          onChange={phoneInput.handlePhoneValueChange}
          ref={inputRef}
          style={{ height: "40px", borderTopLeftRadius: "unset" }}
        />
      </Space.Compact>
    </div>
  );
};
