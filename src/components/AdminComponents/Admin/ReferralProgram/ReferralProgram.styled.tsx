import { Typography } from "antd";
import styled from "styled-components";
const {Title} = Typography

export const Layout = styled.div`
  padding: 25px;
  max-height: calc(100vh - 50px);
  overflow: auto;
`;

export const Header = styled(Title)`
  font-size: 21px !important;
  margin-bottom: 20px !important;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Container = styled.div`
  padding: 25px;
  border-radius: 18px;
  background-color: var(--color-bg-container);
`
