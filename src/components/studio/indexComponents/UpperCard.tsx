import React from "react";
import {
  Box,
  Flex,
  Card,
  CardBody,
  Text,
  Icon,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import UpperCardStats from "./UpperCardStats";

type Props = {
  key: number;
  title: string;
  number: Number | undefined;
  color: string;
  icon: IconType;
};

const UpperCard = ({ key, title, number, color, icon }: Props) => {
  return (
    <Box
      width={"100%"}
      position="relative"
      paddingRight={"0.75rem"}
      paddingLeft={"0.75rem"}
      flex={"0 0 33.33333%"}
      marginTop=".5rem !important"
      maxWidth={{ sm: "100%", md: "100%", lg: "33.33333%" }}
    >
      <UpperCardStats title={title} number={number} color={color} icon={icon} />
    </Box>
  );
};

export default UpperCard;
