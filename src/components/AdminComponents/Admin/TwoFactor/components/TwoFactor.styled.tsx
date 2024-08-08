import { Typography } from "antd";
import styled from "styled-components";
const {Title} = Typography

export const Layout = styled.div`
  padding: 25px;
`

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`

export const Container = styled.div`
  padding: 25px;
  background-color: var(--color-bg-container);
  border-radius: 18px;
`

export const Header = styled(Title)`
  font-size: 21px !important;
  margin-bottom: 20px !important;
  @media (max-width: 768px) {
    text-align: center;
  }
`