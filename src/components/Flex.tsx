import styled from "styled-components/macro";
import {
  compose,
  flexbox,
  FlexboxProps,
  space,
  SpaceProps,
} from "styled-system";

import { Box } from "src/components";
import { Theme } from "src/styles/theme";

const flexProps = compose(flexbox, space);

interface Props<T> extends FlexboxProps<T>, SpaceProps<T> {}

export const Flex = styled(Box)<Props<Theme>>`
  display: flex;
  && {
    ${flexProps};
  }
`;
