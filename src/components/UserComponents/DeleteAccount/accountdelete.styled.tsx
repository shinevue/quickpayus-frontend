import styled from "styled-components";
import { Row, Card, Input, Button } from "antd";
import { Link } from "react-router-dom";

export const StyledH1 = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export const MainRow = styled(Row)`
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const MainCard = styled(Card)`
  border: none;
`;

export const StyledInput = styled(Input)`
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #1e1e1e;
`;

export const SignInButton = styled(Button)`
  width: 100%;
  background: #ff4d4f;
  &:hover {
    background: #ff4d4f !important;
  }
`;

export const StyleLink = styled(Link)`
  color: red;
  &:hover {
    color: red;
  }
`;