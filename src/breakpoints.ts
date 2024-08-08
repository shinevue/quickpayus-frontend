// The following breakpoints are taken from the ant-design library.
// @see https://ant.design/components/grid/#components-grid-demo-useBreakpoint

export const BREAKPOINTS = {
  XS: 480,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1600,
};

/**
 * Breakpoints can be used in emotion css like this
 *
 *  ${breakpoint.sm} {
 *     font-size: 12px;
 *  }
 */
export const breakpoint = {
  xs: `@media screen and (min-width: ${BREAKPOINTS.XS}px)`,
  sm: `@media screen and (min-width: ${BREAKPOINTS.SM}px)`,
  md: `@media screen and (min-width: ${BREAKPOINTS.MD}px)`,
  lg: `@media screen and (min-width: ${BREAKPOINTS.LG}px)`,
  xl: `@media screen and (min-width: ${BREAKPOINTS.XL}px)`,
  xxl: `@media screen and (min-width: ${BREAKPOINTS.XXL}px)`,
  custom: (minWidth) => `@media screen and (min-width: ${minWidth}px)`,
};
