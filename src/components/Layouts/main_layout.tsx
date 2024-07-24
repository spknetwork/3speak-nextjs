//TODO: add a animation here for expanding drawer
//TODO: make the items functional like normal sidebar

import {
  Box,
  Flex,
  Text,
  Switch,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Icon,
  Button,
  Link,
} from "@chakra-ui/react";

import Footer from "../footer/Footer";
import MiniSidebar from "../MiniSidebar/MiniSidebar";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { NAVIGATION } from "../data/NavigationData";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const MainLayout = ({ children }: any) => {
  //for the dark mode
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  //use state
  const { isOpen, onToggle } = useDisclosure();

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
          right={[2, 6, 8, 10]}
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
      <Flex width={"full"} flexDirection={"column"}>
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
                width={150}
                height={150}
              />
            </Flex>
            <Flex>
              <Icon
                fontSize={"24px"}
                as={isOpen ? CloseIcon : HamburgerIcon}
                onClick={onToggle}
              />
            </Flex>
          </Flex>
          {isOpen && (
            <>
              <Link href="/auth/modals">
                <Flex justifyContent={"center"} w="95%">
                  <Button w="90%">LOGIN / SIGN UP</Button>
                </Flex>
              </Link>
              {NAVIGATION.map((item, index) => (
                <Link key={index} href={`${item.route!}`}>
                  <Flex alignItems={"center"}>
                    <Flex gap={5} alignItems={"center"} pl={6} py={4}>
                      <Icon
                        cursor="pointer"
                        width={["12px", "16px", "18px", "22px"]}
                        height={["12px", "16px", "18px", "22px"]}
                        as={item.icon}
                        color={colorMode === "dark" ? "white" : "black"}
                      />
                    </Flex>
                    <Flex alignItems={"center"} px={2} fontSize={"14px"}>
                      {item.title}
                    </Flex>
                  </Flex>
                </Link>
              ))}
            </>
          )}
        </Box>
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          flexDirection={{
            base: "column",
            md: "column",
            lg: "column",
            sm: "column",
          }}
        >
          <main>{children}</main>
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default MainLayout;
