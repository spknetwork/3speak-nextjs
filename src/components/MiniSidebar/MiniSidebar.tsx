import React, { useState } from "react";
import {
  Flex,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  useColorMode,
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
    <Flex
      direction="column"
      height="100vh"
      w={20}
      position="sticky"
      left={0}
      top={0}
      py={4}
      backgroundColor={colorMode === "dark" ? "gray.600" : "gray.300"}
      overflowY="auto"
    >
      <Sidebar />
      <VStack spacing={8} mt={8} position="relative" top={"112px"}>
        <Image
          loader={() => (imgUrl ? gifUrl : svgUrl)}
          src={imgUrl ? gifUrl : svgUrl}
          alt=""
          width={imgUrl ? 24 : 18}
          height={imgUrl ? 24 : 18}
          objectFit="cover"
          layout="fixed"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {NAVIGATION.map((item, index) => (
          <Link key={index} href={`${item.route!}`}>
            <Icon
              cursor="pointer"
              width={"24px"}
              height={"24px"}
              as={item.icon}
              color={colorMode === "dark" ? "white" : "black"}
            />
          </Link>
        ))}
      </VStack>
    </Flex>
  );
};

export default MiniSidebar;
