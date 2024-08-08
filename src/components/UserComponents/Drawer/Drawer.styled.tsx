import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: white;
  padding: 6px 32px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding-inline: 32px;
  z-index: 99;
  border-bottom: 1px solid #ece8e8; 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CtaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 16px;
`;

export const BalanceTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
`;

export const BalanceValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.88);
  line-height: 22px;
`;
