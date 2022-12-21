import { useMediaQuery } from 'react-responsive';

export const xsMobile = '(min-width: 20.125rem)'; // 320px
export const smMobile = '(min-width: 22.5rem)'; // 360px
export const mdMobile = '(min-width: 23.75rem)'; // 380px
export const mobile = '(min-width: 26.5625rem)'; // 425px
export const smTablet = '(min-width: 31.25rem)'; // 500px
export const mdTablet = '(min-width: 38.125rem)'; // 610px
export const tablet = '(min-width: 58.5rem)'; // 936px
export const smDesktop = '(min-width: 70.313rem)'; // 1125px
export const desktop = '(min-width: 87.5rem)'; // 1400px

export const useQuery = () => ({
  isXsMobile: useMediaQuery({ query: xsMobile }),
  isSmMobile: useMediaQuery({ query: smMobile }),
  isMdMobile: useMediaQuery({ query: mdMobile }),
  isMobile: useMediaQuery({ query: mobile }),
  isSmTablet: useMediaQuery({ query: smTablet }),
  isMdTablet: useMediaQuery({ query: mdTablet }),
  isTablet: useMediaQuery({ query: tablet }),
  isSmDesktop: useMediaQuery({ query: smDesktop }),
  isDesktop: useMediaQuery({ query: desktop }),
});

export const breakpoints = {
  xsMobile,
  smMobile,
  mdMobile,
  mobile,
  mdTablet,
  tablet,
  smDesktop,
  desktop,
  useQuery,
};
