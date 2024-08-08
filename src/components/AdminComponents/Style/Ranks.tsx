import styled from "styled-components";
import { Flex, Row, Typography } from "antd";
const {Title} = Typography;

export const Layout = styled.div`
  padding: 24px;
  margin: 25px;
  background-color: var(--color-bg-container);
  border-radius: 18px;
`;

export const Header = styled(Title)`
  font-size: 21px !important;
  margin-bottom: 20px !important;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const StyledRow = styled(Flex)`
  margin-bottom: 16px;
  gap: 10px;
  @media (max-width: 768px) {
    flex-wrap : wrap;
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (max-width: 640px) {
    max-width: 640px;
  }
  @media (max-width: 768px) {
    max-width: 768px;
  }
`;

export const StyledLabel = styled.label`
  margin-right: 8px;
  font-weight: 500;
`;

export const StyledSelect = styled.select`
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 4px;
  padding: 4px 12px;
`;
