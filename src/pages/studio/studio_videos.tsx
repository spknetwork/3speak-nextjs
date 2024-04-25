//TODO: to integrate the pop modal for video edit
import React, { ReactNode, useEffect, useState } from "react";
import { UploadedVideoData } from "@/data/UploadedVideoData";
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
import { useAppStore } from "@/lib/store";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
//hooks
import { useAuth } from "@/hooks/auth";
import EditModal from "@/components/Studio_Videos/EditModal";
//importing the essentials for modal

export interface VideoData {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  Date: string;
  description: string;
  views: number;
}

export default function StudioVideos({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO make this work without it
  const [showPopup, setShowPopup] = useState(false);

  //useStates for handling the updated data
  const [uploadedVideoData, setUploadedVideoData] =
    useState<VideoData[]>(UploadedVideoData);

  const [index, setIndex] = useState<number | null>(null);

  //function for updating the state of the data
  const handleUpdateData = (id: number, newData: VideoData) => {
    setUploadedVideoData((prevData) =>
      prevData.map((item) => (item.id === id ? newData : item))
    );
  };


  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  // const { post } = useAppStore()

  const router = useRouter();

  // const { allowAccess } = useAppStore();
  // const isMedium = useBreakpointValue({ base: false, md: true });
  const { authenticated } = useAuth() ?? {};

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

                      {/* <Box marginY={"20px"} width={"100%"}>
                        <Button width={"98%"} colorScheme="blue">
                          Manage Video Boost
                        </Button>
                      </Box> */}
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
                              <Th>Edit</Th>
                              <Th>Delete</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {uploadedVideoData.map((item, index) => (
                              <Tr key={index}>
                                <Td>
                                  <Image
                                    src={item.thumbnail}
                                    alt="test"
                                    width={"100px"}
                                  />
                                </Td>
                                <Td>{item.title}</Td>
                                <Td>
                                  <Badge
                                    colorScheme={
                                      item.status === "Deleted"
                                        ? "red"
                                        : item.status === "Active"
                                        ? "green"
                                        : "yellow"
                                    }
                                  >
                                    {item.status}
                                  </Badge>
                                </Td>
                                <Td>{item.Date}</Td>
                                <Td>{item.views}</Td>
                                <Td>
                                  <Button
                                    colorScheme="blue"
                                    onClick={() => {
                                      setShowPopup(true);
                                      setIndex(index);
                                    }}
                                  >
                                    <FaRegEdit size={"20px"} />
                                  </Button>
                                </Td>
                                <Td>
                                  <Button colorScheme="red">
                                    <MdDelete size={"22px"} />
                                  </Button>
                                </Td>
                              </Tr>
                            ))}
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
      {index !== null  && <EditModal
        isOpen={true}
        uploadedVideoData={uploadedVideoData}
        videoData={uploadedVideoData[index]}
        setUploadedVideoData={setUploadedVideoData}
        onClose={() => setIndex(null)}
        index={index}
      />
}
    </Box>
  );
}
