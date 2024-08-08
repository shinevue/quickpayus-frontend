import styled from "styled-components";
import { Row } from "antd";

export const Layout = styled.div`
  padding: 24px;
  margin: 25px;
  background-color: var(--color-bg-container);
  border-radius: 18px;
`;

export const Header = styled.h1`
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
  margin: 20px 0;
  font-weight: 700;
  color: var(--color-text);
`;

export const StyledRow = styled(Row)`
  margin-bottom: 16px;
  gap: 10px;
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
