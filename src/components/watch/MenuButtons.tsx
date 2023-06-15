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

const MenuButtons = () => {
  return (
    <Flex justifyContent={"center"}>
      <Menu>
        <MenuButton
          textTransform="uppercase"
          border={"none"}
          transition={"all 0.4s"}
          fontSize="0.7109375rem"
          lineHeight={"1.5"}
          background="#fff"
          fontWeight={"400"}
          color={"#212121"}
          as={Button}
        >
          <Text
            fontSize={"12px"}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <FaEllipsisV />
          </Text>
        </MenuButton>
        <MenuList>
          <MenuItem
            marginRight={"10px"}
            textTransform="uppercase"
            border={"none"}
            boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
            transition={"all 0.4s"}
            fontSize="0.7109375rem"
            lineHeight={"1.5"}
            background="#fff linear-gradient(180deg, white, #fff) repeat-x"
            fontWeight={"400"}
            color={"#212121"}
          >
            <AddIcon marginRight={"10px"} /> ADD TO PLAYLIST
          </MenuItem>
          <MenuItem
            marginRight={"10px"}
            textTransform="uppercase"
            border={"none"}
            boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
            transition={"all 0.4s"}
            fontSize="0.7109375rem"
            lineHeight={"1.5"}
            background="#fff linear-gradient(180deg, white, #fff) repeat-x"
            fontWeight={"400"}
            color={"#212121"}
          >
            OPEN IN THE DESKTOP APP
          </MenuItem>
          <MenuItem
            marginRight={"10px"}
            textTransform="uppercase"
            border={"none"}
            boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
            transition={"all 0.4s"}
            fontSize="0.7109375rem"
            lineHeight={"1.5"}
            background="#fff linear-gradient(180deg, white, #fff) repeat-x"
            fontWeight={"400"}
            color={"#212121"}
          >
            <WarningTwoIcon marginRight={"10px"} /> REPORT
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MenuButtons;
