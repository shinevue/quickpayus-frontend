import styled from "styled-components";
import { Link } from "react-router-dom";

// antd
import { Row, Card, Input, Button } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

interface MainRowProps {
  navbarheight?: number;
}

export const StyledH1 = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  // color: #000;
  margin-bottom: 40px;
`;

export const ForgetTxt = styled.p`
  text-align: center;
  color: #f00000;
`;
export const PrivacyTxt = styled.p`
  font-size: 12px;
  // color: #121212;
`;
export const PrivacyTxt2 = styled.p`
  font-size: 12px;
  // color: #121212;
  opacity: 0;
  transition: height 0.2s ease, opacity 0.2s ease;
  visibility: hidden;
`;
export const LearnMoreButton = styled.a`
  cursor: pointer;
  padding-left: 5px;
  color: #007aff;
  &:hover {
    color: #007aff;
  }
`;
export const MainRow = styled(Row)<MainRowProps>`
  justify-content: center;
  min-height: ${({ navbarheight }) => `calc(100vh - ${navbarheight || 0}px)`};
  align-items: center;
  background: var(--color-bg-container);
  margin: calc(var(--padding-content) * -1);
  transition: background var(--transition-time-when-switch-theme-mode);
  ${breakpoint.md} {
    background: var(--color-bg-layout);
  }
`;
export const MainCard = styled(Card)`
  border: none;
  max-width: 500px;
`;
export const StyledInput = styled(Input)`
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #1e1e1e;
`;
export const StyledInputPassword = styled(Input.Password)`
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #1e1e1e;
`;

export const SignInButton = styled(Button)`
  width: 100%;
  padding: 7px 15px;
  height: 45px;
  font-size: 18px;
  background: #007aff;
  border-radius: 5px;
  margin-top: 20px;
  &:hover {
    background: #007af9 !important;
  }
`;
export const SignUpBtn = styled.span`
  padding: 0 5px 0 0;
`;
export const StyleLink = styled(Link)`
  color: #007aff;
  &:hover {
    color: #007aff;
  }
`;
