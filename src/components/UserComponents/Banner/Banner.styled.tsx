import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout, Avatar } from "antd";
import { BellOutlined, QrcodeOutlined } from "@ant-design/icons";
import { breakpoint } from "@/breakpoints";
const { Header } = Layout;

interface StyledHeaderProps {
  height?: number;
}

export const HeaderContainer = styled.div`
  background-color: var(--color-bg-content);
  padding: 0px 32px;
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  padding-inline: 32px;
  // z-index: 99;
  // border-bottom: 1px solid #d3d3d3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CtaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
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

export const BellIconCounter = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: red;
  top: 15px;
  border-radius: 2px;
  display: block;
  font-size: 8px;
`;
export const PcLogoWrapper = styled.div`
  height: 100%;
  a {
    height: 100%;
    display: flex;
    align-items: center;
    @media (min-width: 576px) and (max-width: 768px) {
      transform: translateX(50%);
    }
  }
`;
export const PcLogo = styled.img`
  // width: 28%;
  height: 50%;
  // transform: translateX(-20px);
  // src: "/src/assets/images/logo.svg";
`;
export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;
export const AvatarInfo = styled.div`
  padding-left: 10px;
`;
export const AvatarInfoP1 = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
`;
export const AvatarInfoP2 = styled.p`
  font-size: 11px;
  font-weight: 400;
  color: var(--color-text);
`;
export const MobileLogoWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const MobileLogoLink = styled(Link)`
  pointer-events: initial;
`;
export const MobileLogo = styled.img`
  height: 50%;
`;
export const StyledHeader = styled(Header)<StyledHeaderProps>`
  height: ${({ height }) => height}px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0;
  line-height: unset;
  z-index: 99;
  background: var(--color-bg-container);
  transition: background 0.2s, border 0.2s;
  ${breakpoint.md} {
    border-bottom: 1px solid var(--color-border-primary);
  }
`;
export const BellOutlinedNew = styled(BellOutlined)`
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: #1677ff;
  }
`;
export const StyledAvatar = styled(Avatar)`
  font-size: 14px;
  width: 26px;
  height: 26px;
  color: #fff;
  border: 0px;
  // background: #121212;
`;
export const ModeItem = styled.div`
  display: flex;
  justify-content: space-between;
  // color: #000;
`;
export const ShareBtn = styled.button`
  border: none;
  background: var(--color-bg-container);
  cursor: pointer;
  color: var(--color-text);
`;
export const ReferralTitle = styled.p`
  // margin-top: calc(1em - 10px);
  padding-bottom: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;
export const CopyToClipboardContent = styled.button`
  width: 100%;
  padding: 15px 10px;
  border: none;
  background: var(--color-bg-container);
  cursor: pointer;
  color: var(--color-text);
`;
export const CustomQrCodeIcon = styled(QrcodeOutlined)`
  cursor: pointer;
  font-size: 14px;
`;
export const CustomList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding-left: 0px;
  gap: 10px;
`;
export const CustomListContent = styled.p`
  padding-bottom: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export const Verified = styled.img`
  width: 10px;
  height: 10px;
  z-index: 999;
  margin-left: 5px;
  @media (max-width: 768px) {
    position: absolute;
    left: 13px;
    bottom: 5px;
  }
`;
