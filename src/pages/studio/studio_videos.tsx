import React, { ReactNode, useEffect, useState } from "react";

import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Image,
  Card,
  CardBody,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
} from "@chakra-ui/react";

import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function StudioVideos({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  // const { post } = useAppStore()

  const router = useRouter();

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // Retrieve the token from your storage or context
    if (token) {
      api.auth.checkAuthentication(token).then((isAuthenticated) => {
        setAuthenticated(isAuthenticated);
      });
    } else {
      setAuthenticated(false);
    }
  }, []);

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
                    justifyContent={"start"}
                  >
                    <Flex
                      flexDirection={"column"}
                      justifyContent={"start"}
                      alignItems="start"
                    >
                      <Text as={"h2"} fontSize="30px" marginBottom={"10px"}>
                        My Videos
                      </Text>
                      <Alert
                        borderRadius={"5px"}
                        status="warning"
                        marginBottom={"10px"}
                      >
                        <AlertIcon />
                        <AlertTitle fontSize={"16px"}>
                          Important reminder!
                        </AlertTitle>
                        <AlertDescription fontSize={"16px"}>
                          Generally videos will take an hour to encode depending
                          on system load. If takes longer than 1 hour please
                          contact our support on{" "}
                          <Link href="/" color={"blue"}>
                            Discord
                          </Link>
                        </AlertDescription>
                      </Alert>
                      <Alert
                        borderRadius={"5px"}
                        status="warning"
                        marginBottom={"10px"}
                      >
                        <AlertIcon />
                        <AlertTitle fontSize={"16px"}>
                          Important reminder!
                        </AlertTitle>
                        <AlertDescription fontSize={"16px"}>
                          You must reload the page to get the updated status of
                          your videos
                        </AlertDescription>
                      </Alert>

                      <Box marginY={"20px"} width={"100%"}>
                        <Button width={"98%"} colorScheme="blue">
                          Manage Video Boost
                        </Button>
                      </Box>
                      <TableContainer width={"100%"}>
                        <Table variant="striped" colorScheme="gray">
                          {/* <TableCaption>
                            Imperial to metric conversion factors
                          </TableCaption> */}
                          <Thead color={"gray"}>
                            <Tr>
                              <Th>Thumbnail</Th>
                              <Th>Title</Th>
                              <Th>Status</Th>
                              <Th>Date</Th>
                              <Th>Views</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>
                                <Image
                                  src="https://ipfs-3speak.b-cdn.net/ipfs/bafybeibqxbf652lmfbdf7zoht3pbhkx4m76agdwn5mnw33vjhlxrzvccoe/"
                                  alt="test"
                                  width={"100px"}
                                />
                              </Td>
                              <Td>First Video</Td>
                              <Td>
                                <Badge colorScheme="red">Deleted</Badge>
                              </Td>
                              <Td>{date}</Td>
                              <Td>100</Td>
                            </Tr>
                            <Tr>
                              <Td>
                                <Image
                                  src="https://ipfs-3speak.b-cdn.net/ipfs/bafybeibqxbf652lmfbdf7zoht3pbhkx4m76agdwn5mnw33vjhlxrzvccoe/"
                                  alt="test"
                                  width={"100px"}
                                />
                              </Td>
                              <Td>Secod Video</Td>
                              <Td>
                                <Badge colorScheme="green">Active</Badge>
                              </Td>
                              <Td>{date}</Td>
                              <Td>200</Td>
                            </Tr>
                            <Tr>
                              <Td>
                                <Image
                                  src="https://ipfs-3speak.b-cdn.net/ipfs/bafybeibqxbf652lmfbdf7zoht3pbhkx4m76agdwn5mnw33vjhlxrzvccoe/"
                                  alt="test"
                                  width={"100px"}
                                />
                              </Td>
                              <Td>Third Video</Td>
                              <Td>
                                <Badge colorScheme="purple">New</Badge>
                              </Td>
                              <Td>{date}</Td>
                              <Td>1M</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
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
