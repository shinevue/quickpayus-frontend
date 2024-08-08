import styled from "styled-components";
import { Link } from "react-router-dom";

// breakpoints
import { breakpoint } from "@/breakpoints";

export const SettingsH1 = styled.h2`
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  text-align: center;
  ${breakpoint.md} {
    text-align: left;
  }
`;
export const SettingsBox = styled.div`
  border-radius: var(--border-radius-container);
  padding: var(--padding-container);
  background: var(--color-bg-container);
  margin-bottom: 30px;
  transition: background var(--transition-time-when-switch-theme-mode);
`;
export const SettingsBoxH2 = styled.h2`
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 15px;
`;
export const SettingsBoxPdisable = styled.h2`
  opacity: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  cursor: not-allowed;
  font-weight: 500;
  padding-right: 10px;
  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export const TooltipImg = styled.img`
  width: 15px;
  margin-top: 10px;
  opacity: 0.6;
`;
export const deletebtn = styled.h2`
  font-size: 16px;
  color: red;
  font-weight: 600;
  opacity: 0.7;
  padding-right: 10px;
  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export const SettingsBoxP = styled.p`
  font-size: 16px;
  // color: var(--color-text);
  font-weight: 500;
  padding-right: 10px;
  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border-primary);
  transition: border-bottom var(--transition-time-when-switch-theme-mode);
  &:last-child {
    border-bottom: none; /* Remove bottom border for the last CustomLink */
  }
  padding-inline: 10px;
  &:hover {
    // color: #000; /* Change text color on hover */
  }
  padding: 10px 5px;
`;
export const CustomButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid var(--color-border-primary);
  transition: border-bottom var(--transition-time-when-switch-theme-mode);
  &:last-child {
    border-bottom: none; /* Remove bottom border for the last CustomLink */
  }
  padding-inline: 10px;
  &:hover {
    color: #1554ad;
  }
  padding: 10px 5px;
`;
export const CustomSettingBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  border-bottom: 1px solid #d3d3d3;
  padding-inline: 10px;
`;
