import styled from "styled-components";

// antd
import { Button, Col, Row } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

export const RankTitle = styled.h2`
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  text-align: center;
  ${breakpoint.md} {
    text-align: left;
  }
`;

export const RankSubtitleWrapper = styled.div`
  // padding: 0 20px;
  border-radius: 8px 8px 8px 0;
`;

export const RankSubtitle = styled.h2`
  padding-bottom: 15px;
  font-weight: 500;
`;
export const RankCol1 = styled.div`
  text-align: left;
  padding: 0 0 20px 0;
  border-width: 0;
  border-style: solid;
  height: 130px;
  display: grid;
  grid-template-rows: auto auto auto;
  border-color: var(--color-border-primary);
  border-bottom-width: 1px;
  transition: border-color var(--transition-time-when-switch-theme-mode);
  ${breakpoint.md} {
    border-right-width: 1px;
    border-bottom-width: 0px;
    padding: 0 20px 0 0;
  }
`;
export const RankCol2 = styled(RankCol1)`
  padding: 20px 0 0 0;
  height: 130px;
  display: grid;
  grid-template-rows: auto auto;
  border: unset;
  ${breakpoint.md} {
    padding: 0 0 0 20px;
  }
`;
export const RankDataWrapper = styled.div`
  border-radius: var(--border-radius-container);
  padding: var(--padding-container) !important;
  background: var(--color-bg-container);
  transition: background var(--transition-time-when-switch-theme-mode);
`;
export const RankDataItem = styled(Row)`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;
export const RankDataLabel = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
  ${breakpoint.md} {
    justify-content: flex-start;
  }
`;
export const RankDataValue = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const RankDataDescription = styled.div`
  text-align: center;
  // color: black;
  font-size: 20px;
  margin: 20px;
`;
export const ClaimRewardBtnWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;
export const ClaimRewardBtn = styled(Button)`
  padding: 0 25px;
  font-size: 16px;
  font-weight: 600;
`;
export const RankResultTitle = styled.h3`
  // color: #121212;
`;
export const RankResultWrapper = styled.div`
  padding-bottom: 20px;
  padding-left: 20px;
`;
export const RankChartWrapper = styled.div`
  border-radius: var(--border-radius-container);
  margin: 30px 0;
  padding: var(--padding-container) !important;
  transition: background var(--transition-time-when-switch-theme-mode);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
`;
export const RankResultContent = styled.span`
  margin: auto 0;
  font-weight: 500;
  font-size: 16px;
  // color: #000;
`;
export const BlurBackgroundWrapper = styled.div`
  border-radius: var(--border-radius-container);
  background: var(--color-bg-container);
  backdrop-filter: blur(200px);
  position: relative;
  transition: background var(--transition-time-when-switch-theme-mode);
`;
export const Shade = styled.div`
  position: absolute;
  left: 50%;
  top: 0px;
  width: 25%;
  height: 200px;
  background: #007AFF;
  opacity: 0.1;
  transform: translateX(-50%);
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
`;