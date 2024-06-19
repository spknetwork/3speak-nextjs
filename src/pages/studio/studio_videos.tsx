//TODO: make the delete button work
//TODO: fix this page on the dark mode
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
  useColorMode,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
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
  const {colorMode} = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const { isOpen, onOpen, onClose } = useDisclosure();

  //useState for confirming the delete and the index of the video to be deleted
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

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

  /**
   * function for deleting the data
   * @param id
   */
  const handleDeleteData = (id: number) => {
    setUploadedVideoData((prevData) =>
      prevData.filter((item) => item.id !== id)
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
                                      setIndex(index);
                                    }}
                                  >
                                    <FaRegEdit size={"20px"} />
                                  </Button>
                                </Td>
                                <Td>
                                  {/* TODO: hook up the delete modal confirmation here */}
                                  <Button
                                    colorScheme="red"
                                    onClick={() => {
                                      setShowConfirmation(true);
                                      setDeleteIndex(item.id);
                                    }}
                                  >
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
      {showConfirmation && deleteIndex && (
        <Modal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Video</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this video?</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setShowConfirmation(false);
                  handleDeleteData(deleteIndex);
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {index !== null && (
        <EditModal
          // uploadedVideoData={uploadedVideoData}
          // setUploadedVideoData={setUploadedVideoData}
          videoData={uploadedVideoData[index]}
          onClose={(newData) => {
            handleUpdateData(newData.id, newData);
            setIndex(null);
          }}
        />
      )}
    </Box>
  );
}
