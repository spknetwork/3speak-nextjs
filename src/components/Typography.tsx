import React from "react";
import styled from "styled-components";
import { typography, TypographyProps } from "styled-system";
import { Theme } from "src/styles";
import { Box, BoxProps } from "./Box";

interface IProps extends BoxProps<Theme>, TypographyProps<Theme> {}

export const Typography = styled(Box)<IProps>`
  && {
    ${typography}
  }
`;
