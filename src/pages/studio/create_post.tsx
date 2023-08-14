import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import axios from "axios";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import tus, { Upload, UploadOptions } from "tus-js-client";
import styles from "../../components/ProgressBar.module.css";
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
  useToast,
} from "@chakra-ui/react";

import { FaUpload } from "react-icons/fa";
import { SlCheck, SlPicture } from "react-icons/sl";
import { useRouter } from "next/router";
import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { api } from "@/utils/api";
import { useAppStore } from "@/lib/store";
import WizardSteps from "@/components/studio/WizardSteps";

type FilePreview = {
  file: File;
  previewUrl: string;
};

const CreatePost: React.FC = () => {
  // video title
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDescription, setVideoDesription] = useState<string>("");
  const [savingDetails, setSavingDetails] = useState<Boolean | null>(null);

  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);

  const [uploadingProgress, setUploadingProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<Boolean | null>(null);
  const [uploading, setUploading] = useState<Boolean>(false);
  const [steps, setSteps] = useState<number>(0);
  const [uploadingVideo, setUploadingVideo] = useState<Boolean>(false);
  const [uploadingVideoLabel, setUploadingVideoLabel] =
    useState<String>("Uploading Video...");

  const [previewThumbnails, setPreviewThumbnails] = useState<string[]>([]);
  const [previewManualThumbnails, setPreviewManualThumbnails] = useState<
    string[]
  >([]);
  const toast = useToast();

  const handleFileDropThumbnail = async (
    acceptedFiles: File[]
  ): Promise<void> => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);

    if (!file?.type?.startsWith("image/")) {
      console.log("Cant upload file, select a image type only");
      toast({
        position: "top-right",
        title: "Cant Upload Thumbnail.",
        description: "Select a image type only",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const files = [];
    files.push(previewUrl);
    setPreviewManualThumbnails(files);
  };
  const handleFileDrop = async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);

    if (!file?.type?.startsWith("video/")) {
      console.log("Cant upload file, Select a video type only");
      toast({
        position: "top-right",
        title: "Cant Upload.",
        description: "select a video type only",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const thumbs = await generateVideoThumbnails(file, 3, "url");
    console.log("thumbs", thumbs);

    setPreviewThumbnails(thumbs.slice(1));

    console.log("dropped file check", file);
    setSelectedFile({ file, previewUrl });

    // upload process
    if (!file) return;
    const token = localStorage.getItem("access_token");
    console.log("token", token);
    setUploading(true);
    const options: UploadOptions = {
      endpoint: "http://144.48.107.2:1080/files/",
      retryDelays: [0, 1000, 3000, 5000],
      onError: (error) => {
        console.error("Upload error:", error);
        setUploadStatus(false);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const progress = (bytesUploaded / bytesTotal) * 100;
        // create a loading progress
        setUploadingProgress(progress);
        console.log(`Upload progress: ${progress}%`);
      },
      onSuccess: () => {
        console.log("Upload complete");
        setUploadStatus(true);
      },
    };

    const upload = new Upload(file, options);
    upload.start();
    console.log("upload", upload);
  };

  const handleCreatePost = (): void => {
    // get video title
    // get video description
    // get thumbnail
    console.log("videotitle", videoTitle);
    console.log("videoDescription", videoDescription);
    const params = {
      title: videoTitle,
      description: videoDescription,
      tags: ["threespeak2", "acela-core2"],
      community: "hive-101",
      language: "en",
    };
    setSavingDetails(true);
    const token = localStorage.getItem("access_token");
    axios
      .post(
        "https://acela.us-02.infra.3speak.tv/api/v1/create_upload",
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful upload
        console.log("successful", response);
        saveThumbnail(response);
      })
      .catch((error) => {
        // Handle upload error
        setSavingDetails(false);
        console.error("error", error);
      });
  };

  const saveThumbnail = (response: any) => {
    let thumbnail = [];
    if (previewManualThumbnails.length > 0) {
      thumbnail.push(previewManualThumbnails[0]);
     
    } else {
      thumbnail.push(previewThumbnails[0]);
    }
    const blobData = new Blob([thumbnail[0]], { type: "image/jpeg" });
    const file = new File([blobData], "image.jpg", { type: "image/jpeg" });
    // console.log("blobData", file);
    // console.log("saveThumbnail", thumbnail);
    // console.log("response", response);
    // response.data.upload_id

    const token = localStorage.getItem("access_token");
    // const params = {
    //   file: [file],
    //   upload_id: response.data.upload_id,
    // };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_id', response.data.upload_id);
    axios
      .post(
        "https://acela.us-02.infra.3speak.tv/api/v1/upload_thumbnail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful upload
        console.log("successful thumbnail", response);
        setSavingDetails(false);
        setSteps(2);
      })
      .catch((error) => {
        // Handle upload error
        setSavingDetails(false);
        console.error("error thumbnail", error);
      });
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop: handleFileDrop,
  };
  const dropzoneOptionsThumbnail: DropzoneOptions = {
    onDrop: handleFileDropThumbnail,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);
  const {
    getRootProps: getRootPropsThumbnail,
    getInputProps: getInputPropsThumbnail,
  } = useDropzone(dropzoneOptionsThumbnail);

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
                          height={{ base: "100%", md: "100%", lg: "100%" }}
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
                      {uploading && (
                        <div className={styles.progressContainer}>
                          <div
                            className={styles.progressBar}
                            style={{ width: `${uploadingProgress}%` }}
                          >
                            {uploadStatus == true && (
                              <>
                                <Text
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  color="white"
                                >
                                  Upload Complete!
                                </Text>
                              </>
                            )}

                            {uploadStatus == false && (
                              <>
                                <Text
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  color="white"
                                >
                                  Error in uploading!
                                </Text>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      <Flex justifyContent={"end"} alignItems="center">
                        {/* <Button
                          onClick={() => router.push("/studio/upload")}
                          size={"lg"}
                          colorScheme="gray"
                          color={"black"}
                        >
                          Go Back
                        </Button> */}
                        {selectedFile && uploadStatus == true && (
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
                                disabled={savingDetails == true ? true : false}
                                placeholder="Video Title"
                                width={{ base: "89%", md: "89%", lg: "97%" }}
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
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
                              <Textarea
                                disabled={savingDetails == true ? true : false}
                                value={videoDescription}
                                onChange={(e) =>
                                  setVideoDesription(e.target.value)
                                }
                                placeholder="Here is a sample placeholder"
                              />
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
                              <input {...getInputPropsThumbnail()} />
                              {previewManualThumbnails.map((e) => (
                                <Flex
                                  key={e}
                                  width={"250px"}
                                  marginX={{
                                    base: "0px",
                                    md: "0px",
                                    lg: "10px",
                                  }}
                                  height="100%"
                                  paddingY={{
                                    base: "5px",
                                    md: "5px",
                                    lg: "0px",
                                  }}
                                >
                                  <Image
                                    objectFit={"cover"}
                                    borderRadius={"10px"}
                                    src={e}
                                    alt="Thumbnail preview"
                                  />
                                </Flex>
                              ))}

                              {previewManualThumbnails.length <= 0 && (
                                <Flex
                                  {...getRootPropsThumbnail()}
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
                              )}

                              {previewThumbnails.map((e) => (
                                <Flex
                                  key={e}
                                  width={"250px"}
                                  marginX={{
                                    base: "0px",
                                    md: "0px",
                                    lg: "10px",
                                  }}
                                  height="100%"
                                  paddingY={{
                                    base: "5px",
                                    md: "5px",
                                    lg: "0px",
                                  }}
                                >
                                  <Image
                                    objectFit={"cover"}
                                    borderRadius={"10px"}
                                    src={e}
                                    alt="Thumbnail preview"
                                  />
                                </Flex>
                              ))}

                              {/* <Flex
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
                              </Flex> */}
                            </Flex>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Button
                          disabled={savingDetails == true ? true : false}
                          onClick={() => setSteps(0)}
                          size={"lg"}
                          colorScheme="gray"
                          color={"black"}
                        >
                          Go Back
                        </Button>
                        <Button
                          disabled={savingDetails == true ? true : false}
                          onClick={handleCreatePost}
                          size={"lg"}
                          colorScheme="blue"
                        >
                          {savingDetails == true
                            ? "Saving Details"
                            : "Next Step"}
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

              <WizardSteps
                changeCurrentStep={changeCurrentStep}
                steps={steps}
              />
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
