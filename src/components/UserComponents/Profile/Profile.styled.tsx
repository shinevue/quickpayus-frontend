import styled from "styled-components";

// antd
import { Col, Row, Button, Avatar, Skeleton } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

export const ProfileWrapper = styled.div`
  height: 100%;
`;

export const AboutBoxH4 = styled.h4`
  margin: 0;
  font-size: 16px;
  padding-right: 10px;
  font-weight: 600;
  color: var(--color-text);

  @media screen and (max-width: 580px) {
    font-size: 14px;
  }
`;
export const AboutBoxP = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);

  @media screen and (max-width: 580px) {
    font-size: 14px;
  }
`;
export const KycBox = styled.div`
  // background-color: #f4f4f4 !important;

  width: 70%;
  border-radius: 5px;
  @media screen and (max-width: 580px) {
    width: 90%;
  }
`;
export const KycBoxH3 = styled.h3`
  font-weight: 700;
  font-size: 24px;
  color: #fff;
  margin: 0 0 30px 0;
  text-align: center;
  @media screen and (max-width: 580px) {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`;

export const AboutMainRow = styled(Row)`
  padding: 46px;

  @media screen and (max-width: 580px) {
    padding: 40px 10px;
  }
`;
export const AboutBoxRow = styled(Row)`
  padding: 10px 0;
  border-radius: var(--border-radius-container);
  background: var(--color-bg-container);
  margin-bottom: 20px;
  transition: background var(--transition-time-when-switch-theme-mode);
`;
export const AboutBoxCol = styled(Col)`
  display: flex;
  align-items: center;
  padding: 15px;
  transition: border-right var(--transition-time-when-switch-theme-mode);
  ${breakpoint.md} {
    border-right: 1px solid var(--color-border-primary);
  }
`;
export const AboutBoxCol2 = styled(Col)`
  display: flex;
  align-items: center;
  padding: 15px;
`;
export const KycMainRow = styled(Row)`
  padding: 0px 46px;
  padding-bottom: 100px;

  @media screen and (max-width: 580px) {
    padding: 0px;
  }
`;
export const KycBtn = styled(Button)`
  && {
    display: block;
    margin: auto;
    padding: 8px 16px;
    height: 40px;

    width: 140px;
    // color: #fff;
    border-radius: 5px;
    // background: #007aff;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const StyledProfileAvatar = styled(Avatar)`
  color: white;
  width: 100px;
  height: 100px;
  font-size: 64px;
  border: 0px;
  position: relative;
`;
export const StyledNameLabel = styled.h1`
  margin-bottom: 5px;
  color: var(--color-text);
  font-size: 21px;
  display: flex;
  align-items: center;
`;
export const StyledLevelLabel = styled.p`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: var(--color-text);
`;
export const StyledUserInfo = styled.div`
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledKYCCol = styled(Col)`
  display: flex;
  justify-content: center;
`;
export const ProfileHeroHeader = styled.div`
  height: 185px;
  background: url(/images/profile-bg.png);
`;
export const ProfileHeroContent = styled.div`
  max-height: 120px;
  padding: 20px 34px 34px 46px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
`;
export const ProfileHeroLevel = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #df0b0b;
`;
export const ProfileHeroLocation = styled.p`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const ProfileHeroName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 25px;
`;
export const ProfileHeroImage = styled.img`
  display: block;
  border-radius: 6px;
`;

export const StyledKYCColMobile = styled(Col)`
  display: none;
  @media screen and (max-width: 580px) {
    display: block;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    padding: 15px;
  }
`;

export const SkeletonInputCustom = styled(Skeleton.Input)`
  width: 80%;
`;

export const ColorPickerContainer = styled.div`
  text-align: center;
  margin: 10px;
`;

export const ColorPickerText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #767678;
`;

export const Verified = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 5px;
  @media screen and (max-width: 768px) {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  margin: 0px auto;
`;

export const ProfileHeroImageWrapper = styled.div`
`