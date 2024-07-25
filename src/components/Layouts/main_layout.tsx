import React, { useRef } from "react";
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
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  VStack, 
} from "@chakra-ui/react";
import Footer from "../footer/Footer";
import MiniSidebar from "../MiniSidebar/MiniSidebar";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { NAVIGATION } from "../data/NavigationData";
import { IoMoon } from "react-icons/io5";
import { GoSun } from "react-icons/go";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Flex w="full">
      <Box as="nav">
        <Box
          position="sticky"
          top={0}
          left={0}
          height="100vh"
          display={["none", "none", "flex", "flex"]}
        >
          <MiniSidebar />
        </Box>
        <Flex
          position="absolute"
          right={[2, 6, 8, 10]}
          top={[1, 2, 3, 4]}
          alignItems="center"
          display={["none", "none", "flex", "flex"]}
        >
          <Switch
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            mr={2}
          />
          <Icon as={colorMode === "dark" ? MoonIcon : SunIcon} />
        </Flex>
      </Box>

      <Flex w="full" flexDirection="column">
        <Box as="nav">
          <Flex
            display={["flex", "flex", "none", "none"]}
            w="100%"
            h={24}
            justifyContent="space-between"
            alignItems="center"
            px={4}
          >
            <Image
              loader={() =>
                `${
                  colorMode === "dark"
                    ? "/main_logo_light.svg"
                    : "/main_logo.svg"
                }`
              }
              src={
                colorMode === "dark" ? "/main_logo_light.svg" : "/main_logo.svg"
              }
              alt="3speak logo"
              width={150}
              height={150}
            />

            <Flex gap={4}>
              <IconButton
                aria-label="Toggle color mode"
                icon={<Icon as={colorMode === "dark" ? GoSun : IoMoon} />}
                onClick={toggleColorMode}
                size="md"
              />
              <IconButton
                aria-label="Open menu"
                icon={<Icon as={isOpen ? CloseIcon : HamburgerIcon} />}
                onClick={onOpen}
                ref={btnRef}
                size="md"
              />
            </Flex>
          </Flex>

          <Drawer
            isOpen={isOpen}
            placement="top"
            size={"full"}
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody position="relative" pt={16}>
                {" "}
                {/* Added padding-top for space */}
                <Flex
                  justifyContent="flex-end"
                  position="absolute"
                  top={4}
                  right={4}

                >
                  <IconButton
                    icon={<Icon as={CloseIcon} />}
                    onClick={onClose}
                    aria-label="Close menu"
                    size="md"
                  />
                </Flex>
                <VStack spacing={5} align="stretch">
                  <Link href="/auth/modals">
                    <Button w="90%" h={16}>
                      LOGIN / SIGN UP
                    </Button>
                  </Link>
                  {NAVIGATION.map((item, index) => (
                    <Link
                      key={index}
                      href={item.route || "#"}
                      onClick={onClose}
                    >
                      <Flex alignItems="center">
                        <Icon
                          as={item.icon}
                          boxSize={[8, 10, 12]}
                          color={colorMode === "dark" ? "white" : "black"}
                          mr={3}
                        />
                        <Text fontSize="xl" mt={4}>{item.title}</Text>
                      </Flex>
                    </Link>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        <Box as="main" flex={1}>
          {children}
        </Box>

        <Footer />
      </Flex>
    </Flex>
  );
};

export default MainLayout;
