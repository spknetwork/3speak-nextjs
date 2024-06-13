import React, { useState } from "react";
import {
  Flex,
  VStack,
  Text,
  Icon,
  Box,
  useColorModeValue,
  useColorMode,
  ScaleFade,
} from "@chakra-ui/react";
import Link from "next/link";
import { NAVIGATION } from "../../components/data/NavigationData";
import { Sidebar } from "../Sidebar";
import Image from "next/image";

const MiniSidebar = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const { colorMode } = useColorMode();

  //gif url
  const gifUrl = "/images/3speak.gif";
  //svg url
  const svgUrl =
    "https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png";
  //make a useState for replaving the svg to gif
  const [imgUrl, setImgUrl] = useState(false);

  const onMouseEnter = () => {
    setImgUrl(true);
  };

  const onMouseLeave = () => {
    setImgUrl(false);
  };

  return (
    <Box position={"relative"} h={"100vh"}>
      <Flex
        direction="column"
        height="100vh"
        w={"auto"}
        py={[1, 1, 2, 4]}
        backgroundColor={colorMode === "dark" ? "gray.600" : "gray.300"}
        overflowY="auto"
      >
        <VStack spacing={8} mt={8} w="auto" position="relative" top={"112px"}>
          <Sidebar />
          <Box h={[3, 6, 9, 9]} w={[3, 6, 9, 9]} textAlign={"center"}>
            <Image
              loader={() => (imgUrl ? gifUrl : svgUrl)}
              src={imgUrl ? gifUrl : svgUrl}
              alt=""
              width={imgUrl ? 24 : 22}
              height={imgUrl ? 24 : 22}
              objectFit="cover"
              layout="fixed"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </Box>
          {NAVIGATION.map((item, index) => (
            <Link key={index} href={`${item.route!}`}>
              <Flex>
                <Icon
                  cursor="pointer"
                  width={["12px", "16px", "18px", "22px"]}
                  height={["12px", "16px", "18px", "22px"]}
                  as={item.icon}
                  color={colorMode === "dark" ? "white" : "black"}
                />
              </Flex>
            </Link>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default MiniSidebar;
