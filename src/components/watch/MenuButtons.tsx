import { AddIcon, ChevronDownIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";

type Props = {
  colorMode: string;
  bgColor: string;
};
const MenuButtons = (props: Props) => {
  return (
    <Menu>
      <MenuButton
        textTransform="uppercase"
        border={"none"}
        transition={"all 0.4s"}
        fontSize="0.7109375rem"
        lineHeight={"1.5"}
        background={props.bgColor}
        fontWeight={"400"}
        color={props.colorMode === "light" ? "#212121" : "#fff"}
        as={Button}
      >
        <Text
          fontSize={"12px"}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          marginBottom={"0px !important"}
          color={props.colorMode === "light" ? "#212121" : "#fff"}
        >
          <FaEllipsisV />
        </Text>
      </MenuButton>
      <MenuList w={"full"}>
        <MenuItem w={"auto"}>
          <AddIcon marginRight={"10px"} /> ADD TO PLAYLIST
        </MenuItem>
        <MenuItem w={"auto"}>OPEN IN THE DESKTOP APP</MenuItem>
        <MenuItem w={"auto"}>
          <WarningTwoIcon marginRight={"10px"} /> REPORT
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuButtons;
