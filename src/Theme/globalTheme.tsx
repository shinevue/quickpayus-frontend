import React from "react";
import { createGlobalStyle } from "styled-components";

import { theme } from "antd";

const { useToken } = theme;

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
    body {
      --color-bg-layout: ${theme.colorBgLayout};
      --color-bg-container: ${theme.colorBgContainer};
      --color-bg-list-item-actived: ${theme.colorBgListItemActived};
      --color-border-primary: ${theme.colorBorderPrimary};
      --border-radius-input: ${theme.borderRadiusInput};
      --border-radius-button: ${theme.borderRadiusButton};
      --border-radius-container: ${theme.borderRadiusContainer};
      --padding-content: ${theme.paddingContent};
      --padding-container: ${theme.paddingContainer};
      --color-text: ${theme.colorText};
      --font-size-page-title: ${theme.fontSizePageTitle};
      --font-weight-page-title: ${theme.fontWeightPageTitle};
      --margin-bottom-page-title: ${theme.marginBottomPageTitle};
      --transition-time-when-switch-theme-mode: ${theme.transitionTimeWhenSwitchThemeMode};
      
      --accent-blue: ${theme.accentBlue};
      --accent-blue-affix-hover: ${theme.accentBlueAffixHover};
      --accent-green: ${theme.accentGreen};
      --accent-green-affix-hover: ${theme.accentGreenAffixHover};
      --accent-red: ${theme.accentRed};
      --accent-red-affix-hover: ${theme.accentRedAffixHover};
      --accent-yellow: ${theme.accentYellow};
      --accent-yellow-affix-hover: ${theme.accentYellowAffixHover};
      --accent-orange: ${theme.accentOrange};
      --accent-orange-affix-hover: ${theme.accentOrangeAffixHover};
      --accent-mint: ${theme.accentMint};
      --accent-mint-affix-hover: ${theme.accentMintAffixHover};
      --accent-pink: ${theme.accentPink};
      --accent-pink-affix-hover: ${theme.accentPinkAffixHover};
      --accent-purple: ${theme.accentPurple};
      --accent-purple-affix-hover: ${theme.accentPurpleAffixHover};
      --accent-indigo: ${theme.accentIndigo};
      --accent-indigo-affix-hover: ${theme.accentIndigoAffixHover}
    }
    input, select, textarea {
      // font-size: 16px !important;
    }`}
`;

const themeColors = {
  light: {
    accentBlue: "#007AFF",
    accentBlueAffixHover: "#D5E4F4",
    accentGreen: "#34C759",
    accentGreenAffixHover: "#e7f8eb",
    accentRed: "#ff3b30",
    accentRedAffixHover: "#ffe7e6",
    accentYellow: "#ffcc00",
    accentYellowAffixHover: "#fff9e0",
    accentOrange: "#ff9500",
    accentOrangeAffixHover: "#fff2e0",
    accentMint: "#00c7be",
    accentMintAffixHover: "#e0f8f7",
    accentPink: "#ff2d55",
    accentPinkAffixHover: "#ffe6eb",
    accentPurple: "#af52de",
    accentPurpleAffixHover: "#f5eafb",
    accentIndigo: "#5856d6",
    accentIndigoAffixHover: "#ebebfa",
  },
  dark: {
    accentBlue: "#0a84ff",
    accentBlueAffixHover: "#02203d",
    accentGreen: "#30d158",
    accentGreenAffixHover: "#0c3215",
    accentRed: "#ff453a",
    accentRedAffixHover: "#3d110e",
    accentYellow: "#ffd60a",
    accentYellowAffixHover: "#3d3302",
    accentOrange: "#ff9f0a",
    accentOrangeAffixHover: "#fff3e2",
    accentMint: "#63e6e2",
    accentMintAffixHover: "#ecfcfc",
    accentPink: "#ff375f",
    accentPinkAffixHover: "#ffe7ec",
    accentPurple: "#bf5af2",
    accentPurpleAffixHover: "#f7ebfd",
    accentIndigo: "#5e5ce6",
    accentIndigoAffixHover: "#ecebfc",
  },
};

export const GlobalTheme: React.FC = () => {
  const { token }: { token: any } = useToken();

  const themeMode = localStorage.getItem("themeMode") || "light";

  const currentTheme =
    themeMode === "dark" ? themeColors.dark : themeColors.light;
  return (
    <GlobalStyle
      theme={{
        colorBgLayout: token.colorBgLayout,
        colorBgContainer: token.colorBgContainer,
        colorBgListItemActived: token.colorBgListItemActived,
        colorText: token.colorText,
        colorBorderPrimary: token.colorBorderPrimary,
        borderRadiusInput: "12px",
        borderRadiusButton: "12px",
        borderRadiusContainer: "18px",
        paddingContent: "25px",
        paddingContainer: "24px",
        fontSizePageTitle: "20px",
        fontWeightPageTitle: "600",
        marginBottomPageTitle: "20px",
        transitionTimeWhenSwitchThemeMode: "0.2s",
        accentBlue: currentTheme.accentBlue,
        accentBlueAffixHover: currentTheme.accentBlueAffixHover,
        accentGreen: currentTheme.accentGreen,
        accentGreenAffixHover: currentTheme.accentGreenAffixHover,
        accentRed: currentTheme.accentRed,
        accentRedAffixHover: currentTheme.accentRedAffixHover,
        accentYellow: currentTheme.accentYellow,
        accentYellowAffixHover: currentTheme.accentYellowAffixHover,
        accentOrange: currentTheme.accentOrange,
        accentOrangeAffixHover: currentTheme.accentOrangeAffixHover,
        accentMint: currentTheme.accentMint,
        accentMintAffixHover: currentTheme.accentMintAffixHover,
        accentPink: currentTheme.accentPink,
        accentPinkAffixHover: currentTheme.accentPinkAffixHover,
        accentPurple: currentTheme.accentPurple,
        accentPurpleAffixHover: currentTheme.accentPurpleAffixHover,
        accentIndigo: currentTheme.accentIndigo,
        accentIndigoAffixHover: currentTheme.accentIndigoAffixHover,
      }}
    />
  );
};
