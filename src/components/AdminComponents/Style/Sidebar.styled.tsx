import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  padding: 8px 16px;
  min-width: 280px;
  transition: all 0.2s;
  height: calc(100vh - 50px);
  overflow-y: auto;
  background-color: var(--color-bg-container);
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
  }
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--color-text) !important;
  transition: all 0.2s;
  border-radius: 8px;
  margin: 8px 0px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5e5e5e;
  padding: 12px;
  &.active {
    color: #007aff;
  }
  &:hover {
    background-color: var(--background-affix-hover);
  }
`;
