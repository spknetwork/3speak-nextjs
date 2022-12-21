import styled from "styled-components";
import { Theme } from "src/styles";
import {
  alignSelf,
  AlignSelfProps,
  border,
  BorderProps,
  BoxShadowProps,
  color,
  ColorProps,
  compose,
  flex,
  FlexProps,
  gridArea,
  GridAreaProps,
  gridColumn,
  GridColumnProps,
  gridRow,
  GridRowProps,
  justifySelf,
  JustifySelfProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  zIndex,
  ZIndexProps,
} from "styled-system";

const boxProps = compose(
  space,
  color,
  position,
  zIndex,
  layout,
  justifySelf,
  alignSelf,
  gridColumn,
  gridRow,
  gridArea,
  flex,
  border,
  shadow,
  textAlign
);

export interface BoxProps<T>
  extends BorderProps,
    ColorProps,
    PositionProps<T>,
    ZIndexProps<T>,
    GridRowProps<T>,
    BoxShadowProps<T>,
    GridColumnProps<T>,
    GridAreaProps<T>,
    JustifySelfProps<T>,
    AlignSelfProps<T>,
    FlexProps<T>,
    LayoutProps<T>,
    ShadowProps<T>,
    TextAlignProps<T>,
    SpaceProps<T>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  as?: React.ElementType;
}

export const Box = styled.div<BoxProps<Theme>>`
  && {
    ${boxProps};
  }
`;
