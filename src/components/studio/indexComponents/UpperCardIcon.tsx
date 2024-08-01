import React from "react";
import {Box, Icon} from "@chakra-ui/react"
import { IconType } from "react-icons";

type Props = {
    icon: IconType
};

const UpperCardIcon = (props: Props) => {
  return (
    <Box width={"auto"} flex="0 0 auto" maxWidth={"100%"} fontWeight={"900"}>
      <Icon
        as={props.icon}
        color="#dddfeb !important"
        fontWeight={"900"}
        fontSize="2em"
      />
    </Box>
  );
};

export default UpperCardIcon;
