import React, { ReactNode, useEffect, useState } from "react";

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
} from "@chakra-ui/react";
import { SlPicture } from "react-icons/sl";
import { useRouter } from "next/router";
import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { useAppStore } from "@/lib/store";

export default function StudioUploadPage({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { allowAccess } = useAppStore();
  // const isMedium = useBreakpointValue({ base: false, md: true });
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (allowAccess == true) {
      setAuthenticated(allowAccess);
      // return
    } else {
      setAuthenticated(false);
    }
  }, [allowAccess]);

  useEffect(() => {
    if (authenticated == false && authenticated != null) {
      router.push("/auth/login");
    }
  }, [authenticated, router]);

  const colorModeValue = useColorModeValue(
    authenticated ? "gray.100" : "gray.100",
    authenticated ? "gray.900" : "gray.900"
  );
  if (authenticated === null) {
    return <Box>Loading...</Box>;
  }

  if (authenticated === false) {
    return <Box>Unauthorized access, please login first</Box>;
  }

  return (
    <Box minH="100vh" bg={colorModeValue}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
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
                      >
                        <Text
                          fontSize={{ base: "50px", md: "50px", lg: "70px" }}
                        >
                          <SlPicture width={"100px"} color="black" />
                        </Text>

                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          color="gray"
                        >
                          Edit your draft post
                        </Text>
                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          color="gray"
                        >
                          Post title
                        </Text>
                      </Flex>
                      {/* <Flex
                        width={"372px"}
                        height="332px"
                        background={"#2E3031"}
                        color="#fff"
                        justifyContent={"center"}
                        alignItems="center"
                        flexDirection={"column"}
                        cursor="pointer"
                        borderRadius={"4px"}
                      >
                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={"36px"}
                        >
                          Edit your draft post
                        </Text>
                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={"36px"}
                        >
                          Post title
                        </Text>
                      </Flex> */}
                      <Box>
                        <Text
                          fontWeight={"400"}
                          fontStyle="italic"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          lineHeight="44px"
                          color="gray"
                        >
                          Or
                        </Text>
                      </Box>
                      <Flex
                        cursor={"pointer"}
                        onClick={() => router.push("/auth/create_post")}
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
                          <SlPicture width={"100px"} color="black" />
                        </Text>

                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={{ base: "25px", md: "25px", lg: "36px" }}
                          color="gray"
                        >
                          Create a new Post
                        </Text>
                      </Flex>
                      {/* <Flex
                        borderRadius={"4px"}
                        cursor="pointer"
                        justifyContent={"center"}
                        alignItems="center"
                        width={"372px"}
                        height="332px"
                        background={"#2E3031"}
                        color="#fff"
                      >
                        <Text
                          fontWeight={"400"}
                          lineHeight="43.57px"
                          fontSize={"36px"}
                        >
                          Create a new Post
                        </Text>
                      </Flex> */}
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
