import React, { ReactNode, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Card,
  CardBody,
  useColorMode,
} from "@chakra-ui/react";
import { SlPicture } from "react-icons/sl";
import { useRouter } from "next/router";
import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { useAuth } from "@/hooks/auth";

export default function StudioUploadPage({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { authenticated } = useAuth() ?? {};

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  if (authenticated === null) {
    return <Box>Loading...</Box>;
  }

  if (authenticated === false) {
    return <Box>Unauthorized access, please login first</Box>;
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        bgColor={bgColor}
        colorMode={colorMode}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            bgColor={bgColor}
            colorMode={colorMode}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} bgColor={bgColor} colorMode={colorMode} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        <Box paddingLeft={"1.5rem"} paddingRight="1.5rem">
          <Box>
            <Card>
              <CardBody borderRadius="5px">
                <Box height={"80vh"} width={"100%"}>
                  <Flex
                    height={"100%"}
                    width={"100%"}
                    flexDirection="column"
                    justifyContent={"center"}
                  >
                    <Flex
                      marginTop={{ base: "50px", md: "50px", lg: "0px" }}
                      flexDirection={{
                        base: "column",
                        md: "column",
                        lg: "row",
                      }}
                      justifyContent={"space-evenly"}
                      alignItems="center"
                    >
                      <Flex
                        width={{ base: "300px", md: "300px", lg: "372px" }}
                        height={{ base: "200px", md: "200px", lg: "332px" }}
                        border={"2px dotted"}
                        justifyContent="center"
                        alignItems={"center"}
                        flexDirection="column"
                        borderRadius={"10px"}
                        cursor="pointer"
                        onClick={() => router.push("/studio/studio_videos")}
                      >
                        <Text
                          fontSize={{ base: "50px", md: "50px", lg: "70px" }}
                        >
                          <SlPicture
                            width={"100px"}
                            color={colorMode === "dark" ? "white" : "black"}
                          />
                        </Text>

                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          color={colorMode === "dark" ? "white" : "black"}
                        >
                          Edit your draft video
                        </Text>
                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          color={colorMode === "dark" ? "white" : "black"}
                        >
                          Video title
                        </Text>
                      </Flex>
                      <Box>
                        <Text
                          fontWeight={"400"}
                          fontStyle="italic"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          lineHeight="44px"
                          color={colorMode === "dark" ? "white" : "black"}
                        >
                          Or
                        </Text>
                      </Box>
                      <Flex
                        cursor={"pointer"}
                        onClick={() => router.push("/studio/create_post")}
                        width={{ base: "300px", md: "300px", lg: "372px" }}
                        height={{ base: "200px", md: "200px", lg: "332px" }}
                        border={"2px dotted"}
                        justifyContent="center"
                        alignItems={"center"}
                        flexDirection="column"
                        borderRadius={"10px"}
                      >
                        <Text
                          fontSize={{ base: "50px", md: "50px", lg: "70px" }}
                        >
                          <FaUpload
                            width={"100px"}
                            color={colorMode === "dark" ? "white" : "black"}
                          />
                        </Text>

                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          color={colorMode === "dark" ? "white" : "black"}
                        >
                          Create a new video
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
