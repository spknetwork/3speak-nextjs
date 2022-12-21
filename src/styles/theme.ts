type Colors = keyof typeof colors;

const breakpoints = [
  '20rem', // 320px
  '22.5rem', // 360px
  '23.75rem', // 380px
  '26.5625rem', // 425px
  '31.25rem', // 500px
  '38.125rem', // 610px
  '58.5rem', // 936px,
  '70.313rem', // 1125px
  '87.5rem', // 1400px
] as unknown as Breakpoints;

const Breakpoints = breakpoints as any;
Breakpoints.xsMobile = Breakpoints[0];
Breakpoints.smMobile = Breakpoints[1];
Breakpoints.mdMobile = Breakpoints[2];
Breakpoints.mobile = Breakpoints[3];
Breakpoints.smTablet = Breakpoints[4];
Breakpoints.mdTablet = Breakpoints[5];
Breakpoints.tablet = Breakpoints[6];
Breakpoints.smDesktop = Breakpoints[7];
Breakpoints.desktop = Breakpoints[8];

type Breakpoints<T = string> = {
  _: T;
  xsMobile: T;
  smMobile: T;
  mdMobile: T;
  mobile: T;
  smTablet: T;
  mdTablet: T;
  tablet: T;
  smDesktop: T;
  desktop: T;
};

const space = [] as (string | number)[] | Breakpoints<string>;

const colors = {
  backgroundPrimary: '#F5F5F5'
};

const shadows = {
};

const zIndices = {
  background: 0,
  elevation: 2,
  header: 3,
  modal: 99,
  modalOverlay: 100,
  modalView: 101,
};

export const modal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const theme = {
  breakpoints,
  space,
  shadows,
  zIndices,
  modal
};

type Theme = typeof theme;

export type { Colors, Theme };
