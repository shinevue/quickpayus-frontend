import styled from "styled-components";

export const Layout = styled.div`
  padding: 25px;
  max-height: calc(100vh - 50px);
  overflow: auto;
`;

export const Header = styled.h1`
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
  margin-bottom: 20px;
  font-weight: 700;
  color: var(--color-text);
`;

export const Container = styled.div`
  padding: 25px;
  border-radius: 18px;
  background-color: var(--color-bg-container);
`
