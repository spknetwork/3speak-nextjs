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

type Props = {
  title: string;
  number: Number | undefined;
  color: string;
  icon: IconType;
};

const UpperCardStats = ({ title, number, color, icon }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Card
      borderLeft={`0.25rem solid ${color} !important`}
      paddingBottom="0.5rem !important"
      paddingTop={"0.5rem !important"}
      boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
      bgColor={colorMode === "dark" ? "#222731" : "gray.50"}
    >
      <CardBody>
        <Flex flexWrap={"wrap"} alignItems="center">
          <Box
            width={"100%"}
            marginRight="0.5rem !important"
            flexBasis={"0"}
            flexGrow="1"
            maxWidth={"100%"}
          >
            <Text
              fontSize={"1rem"}
              color="#4e73df !important"
              fontWeight={"700 !important"}
              textTransform="uppercase"
              marginBottom={"0.25rem !important"}
            >
              {title}
            </Text>
            <Text
              as={"h5"}
              color={
                colorMode === "dark" ? "white !important" : "black !important"
              }
              fontWeight={"700 !important"}
              marginBottom="0 !important"
              fontSize={"1.25rem"}
              lineHeight="1.2"
            >
              <>{number}</>
            </Text>
          </Box>
        
        </Flex>
      </CardBody>
    </Card>
  );
};

export default UpperCardStats;
