import styled from "styled-components";

// breakpoints
import { breakpoint } from "@/breakpoints";

interface PageTitleProps {
  level: number;
}

interface TitleProps {
  hasMarginBottom?: boolean;
  level: number;
}

interface DescriptionProps {
  level: number;
}

const pageTitleMarginBottom = 20,
  titleFontWeight = 600,
  titleMarginBottom = 10,
  descriptionFontWeight = 500,
  descriptionColor = "#767678";

const mapFontSizeToLevel = [
  [21, 15],
  [18, 12],
  [16, 10],
];

export const PageTitle = styled.div<PageTitleProps>`
  margin-bottom: ${pageTitleMarginBottom}px;
  ${({ level }) => `
    text-align: ${!level ? "center" : "unset"};  
    ${
      !level &&
      `
        ${breakpoint.md} {
          text-align: left;
        }
      `
    }
  `};
`;

export const Title = styled.p<TitleProps>`
  font-size: ${({ level }) => mapFontSizeToLevel[level][0]}px;
  font-weight: ${titleFontWeight};
  margin-bottom: ${({ hasMarginBottom }) =>
    hasMarginBottom ? titleMarginBottom : 0}px;
`;

export const Description = styled.p<DescriptionProps>`
  font-size: ${({ level }) => mapFontSizeToLevel[level][1]}px;
  font-weight: ${descriptionFontWeight};
  color: ${descriptionColor};
`;
