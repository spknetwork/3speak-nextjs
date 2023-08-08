import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import axios from "axios";

import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Image,
  Card,
  CardBody,
  Stack,
  Button,
  Textarea,
  Input,
  Spinner,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import { FaUpload } from "react-icons/fa";
import { SlCheck, SlPicture } from "react-icons/sl";
import { useRouter } from "next/router";
import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { api } from "@/utils/api";
import { useAppStore } from "@/lib/store";

type FilePreview = {
  file: File;
  previewUrl: string;
};

const CreatePost: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [uploadingVideo, setUploadingVideo] = useState<Boolean>(false);
  const [uploadingVideoLabel, setUploadingVideoLabel] =
    useState<String>("Uploading Video...");
  const handleFileDrop = async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({ file, previewUrl });
    setUploadingVideo(true);
    // const thumbnailGenerator = new VideoThumbnailGenerator({
    //   sourcePath: URL.createObjectURL(file),
    // });
    // console.log('file',file)
    // console.log('previewUrl',previewUrl)
    // setSteps(1);
    setTimeout(() => {
      setSteps(1);
      setUploadingVideo(false);
    }, 5000);
  };
  const proccedtoStep3 = () => {
    setUploadingVideoLabel("Adding Video Details...");
    setUploadingVideo(true);
    setTimeout(() => {
      setSteps(2);
      setUploadingVideo(false);
    }, 5000);
  };
  const handleFileUpload = (): void => {
    if (selectedFile) {
      const { file } = selectedFile;
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://your-upload-url", formData)
        .then((response) => {
          // Handle successful upload
          console.log(response);
        })
        .catch((error) => {
          // Handle upload error
          console.error(error);
        });
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop: handleFileDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { allowAccess } = useAppStore();
  // const isMedium = useBreakpointValue({ base: false, md: true });
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const changeCurrentStep = (step: number) => {
    if (step > 0 && selectedFile) {
      setSteps(step);
      return;
    }

    if (step <= 0) {
      setSteps(step);
      return;
    }
  };

  const [publishValue, setPublishValue] = useState<string>("1");

  useEffect(() => {
    if (allowAccess == true) {
      setAuthenticated(allowAccess);
      return;
    }
    if (allowAccess == false) {
      setAuthenticated(false);
      return;
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

      <Box
        position={"relative"}
        className="hellotesting"
        ml={{ base: 0, md: 60 }}
        p="4"
      >
        {uploadingVideo && (
          <Flex
            top={0}
            left="0"
            right={0}
            bottom="0"
            zIndex={"999"}
            position={"absolute"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems="center"
            backgroundColor={"blackAlpha.900"}
            opacity="0.9"
            width="100%"
            height={"90vh"}
          >
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="black.500"
            />
            <Text color={"white"}>{uploadingVideoLabel}</Text>
          </Flex>
        )}

        {/* {children} */}
        <Box paddingLeft={"1.5rem"} paddingRight="1.5rem">
          <Box>
            <Card background={"#ededed"}>
              {steps == 0 && (
                <CardBody borderRadius="10px" background={"white"}>
                  <Box height={"60vh"} width={"100%"}>
                    <Flex
                      height={"100%"}
                      width={"100%"}
                      flexDirection="column"
                      justifyContent={"center"}
                    >
                      <Flex
                        height={"100%"}
                        flexDirection={{
                          base: "column-reverse",
                          md: "column-reverse",
                          lg: "row",
                        }}
                      >
                        <Box
                          width={{ base: "100%", md: "100%", lg: "40%" }}
                          padding="20px"
                          paddingY={{ base: "5px", md: "5px", lg: "40px" }}
                        >
                          <Flex
                            width={"100%"}
                            height="100%"
                            justifyContent="center"
                            alignItems={"center"}
                            border={"1px solid black"}
                            padding="20px"
                            paddingY={"40px"}
                            borderRadius={"5px"}
                          >
                            {/* <div {...getRootProps()} className="dropzone"> */}
                            <Flex
                              {...getRootProps()}
                              className="dropzone"
                              borderRadius={"5px"}
                              width={"100%"}
                              height="100%"
                              justifyContent="center"
                              alignItems={"center"}
                              border={"1px dotted grey"}
                              fontSize={{
                                base: "60px",
                                md: "60px",
                                lg: "100px",
                              }}
                            >
                              <input {...getInputProps()} />
                              {selectedFile ? (
                                <>
                                  {selectedFile.file.type.startsWith(
                                    "image/"
                                  ) ? (
                                    <Image
                                      src={selectedFile.previewUrl}
                                      alt="Preview"
                                      className="preview"
                                    />
                                  ) : (
                                    <video
                                      src={selectedFile.previewUrl}
                                      className="preview"
                                      controls
                                    />
                                  )}
                                </>
                              ) : (
                                <FaUpload color="grey" />
                              )}
                            </Flex>
                          </Flex>
                        </Box>
                        <Box
                          width={{ base: "100%", md: "100%", lg: "60%" }}
                          padding="20px"
                          paddingY={{ base: "5px", md: "5px", lg: "40px" }}
                        >
                          <Flex
                            width={"100%"}
                            height="100%"
                            justifyContent="center"
                            alignItems={"start"}
                            flexDirection="column"
                          >
                            <Text
                              as={"h1"}
                              fontSize={{
                                base: "25px !important",
                                sm: "25px !important",
                                lg: "39px",
                              }}
                            >
                              Drag and drop video files to upload
                            </Text>
                            <Text
                              fontSize={{
                                base: "12px",
                                md: "12px",
                                lg: "16px",
                              }}
                            >
                              your videos will be private until you publish them
                            </Text>
                            <Button
                              {...getRootProps()}
                              size={"lg"}
                              colorScheme="twitter"
                            >
                              Select media
                            </Button>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex justifyContent={"end"} alignItems="center">
                        {/* <Button
                          onClick={() => router.push("/studio/upload")}
                          size={"lg"}
                          colorScheme="gray"
                          color={"black"}
                        >
                          Go Back
                        </Button> */}
                        {selectedFile && (
                          <Button
                            onClick={() => setSteps(1)}
                            size={"lg"}
                            colorScheme="blue"
                          >
                            Next Step
                          </Button>
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                </CardBody>
              )}

              {steps == 1 && (
                <CardBody borderRadius="10px" background={"white"}>
                  <Box
                    height={{ base: "auto", md: "auto", lg: "65vh" }}
                    width={"100%"}
                  >
                    <Flex
                      height={"100%"}
                      width={"100%"}
                      flexDirection="column"
                      justifyContent={"center"}
                    >
                      <Flex
                        flexDirection={{
                          base: "column",
                          md: "column",
                          lg: "row",
                        }}
                        height={"100%"}
                      >
                        <Box
                          paddingTop={"50px"}
                          width={{ base: "100%", md: "100%", lg: "30%" }}
                          paddingX="20px"
                          paddingBottom={"10px"}
                        >
                          <Flex
                            width={"100%"}
                            height="200px"
                            border={"1px solid"}
                            justifyContent="center"
                            background={"black"}
                            alignItems={"center"}
                            borderRadius="10px 10px 0px 0px"
                          >
                            {/* juneroy */}
                            {selectedFile ? (
                              <>
                                {selectedFile.file.type.startsWith("image/") ? (
                                  <Image
                                    src={selectedFile.previewUrl}
                                    alt="Preview"
                                    className="preview"
                                  />
                                ) : (
                                  <video
                                    src={selectedFile.previewUrl}
                                    className="preview"
                                    controls
                                  />
                                )}
                              </>
                            ) : (
                              <SlPicture
                                width={"100px"}
                                color="white"
                                fontSize="70px"
                              />
                            )}
                          </Flex>
                          <Flex
                            background={"grey"}
                            width={"100%"}
                            height="100px"
                            justifyContent="start"
                            alignItems={"start"}
                            flexDirection="column"
                            borderRadius="0px 0px 10px 10px"
                          >
                            <Text
                              marginTop={{ base: "5px", md: "5px", lg: "5px" }}
                              fontSize={"12px"}
                              fontWeight="bold"
                              marginLeft="10px"
                              color={"whiteAlpha.900"}
                            >
                              File Name
                            </Text>
                            {selectedFile?.file?.name && (
                              <Text
                                fontSize={{
                                  base: "10px",
                                  md: "10px",
                                  lg: "12px",
                                }}
                                fontWeight="bold"
                                color={"whiteAlpha.900"}
                                marginLeft={{
                                  base: "0px",
                                  md: "0px",
                                  lg: "10px",
                                }}
                                padding={{
                                  base: "0px 10px",
                                  md: "0px 10px",
                                  lg: "10px",
                                }}
                                width={{ base: "100%", md: "100%", lg: "100%" }}
                              >
                                {selectedFile?.file?.name
                                  ? selectedFile.file.name
                                  : ""}
                              </Text>
                            )}
                            <Flex
                              marginTop={{ base: "5px", md: "5px", lg: "20px" }}
                              justifyContent="center"
                              alignItems={"center"}
                              marginLeft={{
                                base: "2px",
                                md: "2px",
                                lg: "10px",
                              }}
                            >
                              <SlCheck fontSize={"20px"} color="white" />
                              <Text
                                fontSize={{
                                  base: "12px",
                                  md: "12px",
                                  lg: "15px",
                                }}
                                fontWeight="bold"
                                color={"whiteAlpha.900"}
                                marginLeft={{
                                  base: "5px",
                                  md: "5px",
                                  lg: "10px",
                                }}
                              >
                                Video upload complete. No issues found.
                              </Text>
                            </Flex>
                          </Flex>
                        </Box>
                        <Box
                          width={{ base: "100%", md: "100%", lg: "70%" }}
                          padding="20px"
                          paddingY={"10px"}
                        >
                          <Flex
                            width={"100%"}
                            height="100%"
                            justifyContent="start"
                            alignItems={"start"}
                            flexDirection="column"
                          >
                            <Text as={"fieldset"} className="w-100 mb-3">
                              <Text
                                as={"legend"}
                                fontSize="15px"
                                className="fw-bold"
                              >
                                Video Title
                              </Text>
                              <Input
                                placeholder="Video Title"
                                width={{ base: "89%", md: "89%", lg: "97%" }}
                              />
                              <Text as={"label"}>
                                Your video title, 2-55 characters
                              </Text>
                            </Text>
                            <fieldset className="w-100 mb-4 ">
                              <Text
                                as={"legend"}
                                fontSize="15px"
                                className="fw-bold"
                              >
                                Video Description
                              </Text>
                              <Textarea placeholder="Here is a sample placeholder" />
                            </fieldset>
                            <fieldset className="w-100 mb-3">
                              <Text
                                as={"legend"}
                                fontSize="15px"
                                className="fw-bold"
                                marginBottom={"0px"}
                              >
                                Thumbnail
                              </Text>
                              <Text fontSize={"15px"}>
                                Select or upload a picture that shows what`s in
                                your video. A good thumbnail stands out and
                                draws viewer`s attention
                              </Text>
                            </fieldset>
                            <Flex
                              flexDirection={{
                                base: "column",
                                md: "column",
                                lg: "row",
                              }}
                              width={"100%"}
                              height={{ base: "100%", md: "100%", lg: "150px" }}
                            >
                              <Flex
                                width={"250px"}
                                height="100%"
                                border={"2px dotted"}
                                justifyContent="center"
                                alignItems={"center"}
                                flexDirection="column"
                                borderRadius={"10px"}
                              >
                                <SlPicture
                                  width={"100px"}
                                  color="black"
                                  fontSize="70px"
                                />
                                <Text>Upload Thumbnail</Text>
                              </Flex>
                              <Flex
                                width={"250px"}
                                marginX={{ base: "0px", md: "0px", lg: "10px" }}
                                height="100%"
                                paddingY={{ base: "5px", md: "5px", lg: "0px" }}
                              >
                                <Image
                                  objectFit={"cover"}
                                  borderRadius={"10px"}
                                  src="https://marketplace.canva.com/EAEqfS4X0Xw/1/0/1600w/canva-most-attractive-youtube-thumbnail-wK95f3XNRaM.jpg"
                                  alt="Dan Abramov"
                                />
                              </Flex>
                              <Flex
                                width={"250px"}
                                marginX={{ base: "0px", md: "0px", lg: "10px" }}
                                height="100%"
                                paddingY={{ base: "5px", md: "5px", lg: "0px" }}
                              >
                                <Image
                                  objectFit={"cover"}
                                  borderRadius={"10px"}
                                  src="https://i.ytimg.com/vi/a4AtoGyjPVo/maxresdefault.jpg"
                                  alt="Dan Abramov"
                                />
                              </Flex>
                              <Flex
                                width={"250px"}
                                marginX={{ base: "0px", md: "0px", lg: "10px" }}
                                height="100%"
                                paddingY={{ base: "5px", md: "5px", lg: "0px" }}
                              >
                                <Image
                                  objectFit={"cover"}
                                  borderRadius={"10px"}
                                  src="https://i.ytimg.com/vi/-q4M9yf_ABY/mqdefault.jpg"
                                  alt="Dan Abramov"
                                />
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Button
                          onClick={() => setSteps(0)}
                          size={"lg"}
                          colorScheme="gray"
                          color={"black"}
                        >
                          Go Back
                        </Button>
                        <Button
                          onClick={proccedtoStep3}
                          size={"lg"}
                          colorScheme="blue"
                        >
                          Next Step
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </CardBody>
              )}

              {steps == 2 && (
                <CardBody borderRadius="10px" background={"white"}>
                  <Box
                    height={{ base: "auto", md: "auto", lg: "65vh" }}
                    width={"100%"}
                  >
                    <Flex
                      margin={"auto"}
                      height={"100%"}
                      width={"70%"}
                      flexDirection="column"
                      justifyContent={"center"}
                    >
                      <Flex
                        flexDirection={{
                          base: "column",
                          md: "column",
                          lg: "row",
                        }}
                        height={"100%"}
                      >
                        <Box
                          width={{ base: "100%", md: "100%", lg: "70%" }}
                          padding="20px"
                          paddingY={"10px"}
                        >
                          <Flex
                            width={"100%"}
                            height="100%"
                            justifyContent="start"
                            alignItems={"start"}
                            flexDirection="column"
                          >
                            <Text textAlign={"start"} as="h3">
                              Visibility
                            </Text>
                            <Text marginBottom={"10px"} as="label">
                              Choose when to publish and who can see your video
                            </Text>
                            <Box
                              borderRadius={"10px"}
                              height={"300px"}
                              border="1px solid"
                              width={{ base: "100%", md: "100%", lg: "100%" }}
                            >
                              <RadioGroup
                                onChange={setPublishValue}
                                value={publishValue}
                              >
                                <Box
                                  marginTop={"40px"}
                                  width="80%"
                                  marginX={"auto"}
                                >
                                  <Box marginBottom={"15px"}>
                                    <Text as="h3">Publish</Text>
                                    <Text as="label">
                                      Make your video public now or schedule a
                                      date
                                    </Text>
                                  </Box>
                                  <Box
                                    marginBottom={"15px"}
                                    marginLeft={"20px"}
                                  >
                                    <Stack spacing={5} direction="row">
                                      <Radio value="1">Public</Radio>
                                    </Stack>

                                    <Text as="label">
                                      Publish it now and everyone can watch your
                                      video
                                    </Text>
                                  </Box>
                                  <Box
                                    marginBottom={"15px"}
                                    marginLeft={"20px"}
                                  >
                                    <Stack spacing={5} direction="row">
                                      <Radio value="2">Schedule</Radio>
                                    </Stack>
                                    <Text as="label">
                                      Set a date when do you want publish this
                                      video
                                    </Text>
                                    {publishValue == "2" && (
                                      <Input
                                        width={"50%"}
                                        type="date"
                                        placeholder="select date"
                                      />
                                    )}
                                  </Box>
                                </Box>
                              </RadioGroup>
                            </Box>
                            {/* <Text as={"fieldset"} className="w-100 mb-3">
                              <Text
                                as={"legend"}
                                fontSize="15px"
                                className="fw-bold"
                              >
                                Video Title
                              </Text>
                              <Input
                                placeholder="Video Title"
                                width={{ base: "89%", md: "89%", lg: "97%" }}
                              />
                              <Text as={"label"}>
                                Your video title, 2-55 characters
                              </Text>
                            </Text> */}
                          </Flex>
                        </Box>
                        <Box
                          paddingTop={"74px"}
                          width={{ base: "100%", md: "100%", lg: "40%" }}
                          paddingX="20px"
                          paddingBottom={"10px"}
                        >
                          <Flex
                            width={"100%"}
                            height="200px"
                            border={"1px solid"}
                            justifyContent="center"
                            background={"black"}
                            alignItems={"center"}
                            borderRadius="10px 10px 0px 0px"
                          >
                            {/* juneroy */}
                            {selectedFile ? (
                              <>
                                {selectedFile.file.type.startsWith("image/") ? (
                                  <Image
                                    src={selectedFile.previewUrl}
                                    alt="Preview"
                                    className="preview"
                                  />
                                ) : (
                                  <video
                                    src={selectedFile.previewUrl}
                                    className="preview"
                                    controls
                                  />
                                )}
                              </>
                            ) : (
                              <SlPicture
                                width={"100px"}
                                color="white"
                                fontSize="70px"
                              />
                            )}
                          </Flex>
                          <Flex
                            background={"grey"}
                            width={"100%"}
                            height="100px"
                            justifyContent="start"
                            alignItems={"start"}
                            flexDirection="column"
                            borderRadius="0px 0px 10px 10px"
                          >
                            <Text
                              marginTop={{ base: "5px", md: "5px", lg: "5px" }}
                              fontSize={"12px"}
                              fontWeight="bold"
                              marginLeft="10px"
                              color={"whiteAlpha.900"}
                            >
                              File Name
                            </Text>
                            {selectedFile?.file?.name && (
                              <Text
                                fontSize={{
                                  base: "10px",
                                  md: "10px",
                                  lg: "12px",
                                }}
                                fontWeight="bold"
                                color={"whiteAlpha.900"}
                                marginLeft={{
                                  base: "0px",
                                  md: "0px",
                                  lg: "10px",
                                }}
                                padding={{
                                  base: "0px 10px",
                                  md: "0px 10px",
                                  lg: "10px",
                                }}
                                width={{ base: "100%", md: "100%", lg: "100%" }}
                              >
                                {selectedFile?.file?.name
                                  ? selectedFile.file.name
                                  : ""}
                              </Text>
                            )}
                            <Flex
                              marginTop={{ base: "5px", md: "5px", lg: "20px" }}
                              justifyContent="center"
                              alignItems={"center"}
                              marginLeft={{
                                base: "2px",
                                md: "2px",
                                lg: "10px",
                              }}
                            >
                              <SlCheck fontSize={"20px"} color="white" />
                              <Text
                                fontSize={{
                                  base: "12px",
                                  md: "12px",
                                  lg: "15px",
                                }}
                                fontWeight="bold"
                                color={"whiteAlpha.900"}
                                marginLeft={{
                                  base: "5px",
                                  md: "5px",
                                  lg: "10px",
                                }}
                              >
                                Video upload complete. No issues found.
                              </Text>
                            </Flex>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Button
                          onClick={() => setSteps(1)}
                          size={"lg"}
                          colorScheme="gray"
                          color={"black"}
                        >
                          Go Back
                        </Button>
                        <Button size={"lg"} colorScheme="blue">
                          Save
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </CardBody>
              )}

              {/* card for wizard */}
              <Box
                borderRadius={"10px"}
                background="white"
                marginTop={"10px"}
                height={"auto"}
                width={"100%"}
              >
                <Flex
                  height={"119px"}
                  justifyContent={"center"}
                  alignItems="center"
                  paddingX={"30px"}
                  flexDirection="row"
                >
                  <Flex
                    onClick={() => changeCurrentStep(0)}
                    cursor={"pointer"}
                    border="none"
                    color={steps == 0 ? "#fff" : "white"}
                    background="#1DA1F2"
                    borderColor={"#1DA1F2"}
                    justifyContent={"center"}
                    alignItems="center"
                    borderRadius={"50%"}
                    width={"250px"}
                    height="100px"
                  >
                    {/* for upload */}
                    <Text fontWeight={"bold"}>Upload</Text>
                  </Flex>

                  {/* border={'1px solid black'} */}
                  <Flex
                    border={steps > 0 ? "1px solid #1DA1F2" : "1px solid black"}
                    borderRight='none'
                    borderLeft='none'
                    background={steps > 0 ? "#1DA1F2" : "#000"}
                    width={"95%"}
                    height="3px"
                  >
                    {/* for line1 */}
                  </Flex>

                  <Flex
                    onClick={() => changeCurrentStep(1)}
                    cursor={"pointer"}
                    border={steps > 0 ? "1px solid #fff" : "1px solid #fff"}
                    color={steps > 0 ? "#fff" : "#000"}
                    background={steps > 0 ? "#1DA1F2" : "#fff"}
                    borderColor={steps > 0 ? "#1DA1F2" : "#000"}
                    justifyContent={"center"}
                    alignItems="center"
                    borderRadius={"50%"}
                    width={"250px"}
                    height="100px"
                  >
                    {/* for Details */}
                    <Text fontWeight={"bold"}>Details</Text>
                  </Flex>

                  <Flex
                    border={
                      steps == 2 ? "1px solid #1DA1F2" : "1px solid black"
                    }
                    borderRight='none'
                    borderLeft='none'
                    background={steps == 2 ? "#1DA1F2" : "#000"}
                    width={"95%"}
                    height="3px"
                  >
                    {/* for line2 */}
                  </Flex>

                  <Flex
                    onClick={() => changeCurrentStep(2)}
                    cursor={"pointer"}
                    border={
                      steps == 2 ? "1px solid #1DA1F2" : "1px solid black"
                    }
                    color={steps == 2 ? "#fff" : "#000"}
                    background={steps == 2 ? "#1DA1F2" : "white"}
                    borderColor={steps == 2 ? "#1DA1F2" : "#000"}
                    justifyContent={"center"}
                    alignItems="center"
                    borderRadius={"50%"}
                    width={"250px"}
                    height="100px"
                  >
                    {/* visibility */}
                    <Text fontWeight={"bold"}>Visibility</Text>
                  </Flex>
                </Flex>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
