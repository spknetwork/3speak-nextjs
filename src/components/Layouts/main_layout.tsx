//TODO: make the code mobile responsive here
import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Switch,
  useColorModeValue,
  useColorMode,
  Icon
} from "@chakra-ui/react"; 
import Footer from "../footer/Footer";
import MiniSidebar from "../MiniSidebar/MiniSidebar";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { NAVIGATION } from "../data/NavigationData";

const MainLayout = ({ children }: any) => {
  //for the dark mode
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  //use state
  const [showItems, setShowItems] = useState(false); //initializing it as false

  const handleShowItems = () => {
    setShowItems((prev) => !prev);
  };

  return (
    <Flex w="full">
      <Box as="nav">
        {/* TODO: to make the navbar display none in mobile view */}
        <Box
          position={"sticky"}
          top={0}
          left={0}
          height={"100vh"}
          display={["none", "none", "flex", "flex"]}
        >
          <MiniSidebar />
        </Box>
        <Text
          position={"absolute"}
          right={[2, 6, 8, 12]}
          top={[1, 2, 3, 4]}
          fontSize={["xs", "sm", "md", "xl"]}
          zIndex={2}
          display={["none", "none", "flex", "flex"]}
        >
          <Switch
            // size={["sm", "sm", "md", "4xl"]}
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />{" "}
          {colorMode === "dark" && <MoonIcon />}{" "}
          {colorMode !== "dark" && <SunIcon />}
        </Text>
      </Box>

      {/* This is the new component  */}
      <Flex width={"100%"} flexDirection={"column"}>
        <Box as="nav">
          <Flex
            display={["flex", "flex", "none", "none"]}
            w="100%"
            h={24}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={4}
          >
            <Flex>
              <Image
                loader={() =>
                  `${
                    colorMode == "dark"
                      ? "/main_logo_light.svg"
                      : "/main_logo.svg"
                  }`
                }
                src={
                  colorMode == "dark"
                    ? "/main_logo_light.svg"
                    : "/main_logo.svg"
                }
                alt="3speak logo"
                width={100}
                height={100}
              />
            </Flex>
            <Flex>
              <HamburgerIcon boxSize={"2rem"} onClick={handleShowItems} />
            </Flex>
          </Flex>
         
          {showItems && NAVIGATION.map((item, index) => (
             <Box key={index} display={["flex", "flex", "none", "none"]}>
                <Flex gap={5} alignItems={"center"}>
                <Icon
                  cursor="pointer"
                  width={["12px", "16px", "18px", "22px"]}
                  height={["12px", "16px", "18px", "22px"]}
                  as={item.icon}
                  color={colorMode === "dark" ? "white" : "black"}
                />
                <Text>{item.title}</Text>
                </Flex>
            </Box>
          ))}
        </Box>
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          //   minWidth={"max-content"}
          flexDirection={{ base: "column", md: "column", lg: "column" }}
        >
          <main>{children}</main>
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default MainLayout;
