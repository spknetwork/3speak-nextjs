//TODO: accessible only after login

import React, {
  ComponentProps,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  VStack,
} from "@chakra-ui/react";
import styled from "styled-components";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { MentionsInput, Mention } from "react-mentions";
import axios from "axios";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import tus, { Upload, UploadOptions } from "tus-js-client";
import styles from "../../components/ProgressBar.module.css";
import { getMentionInputStyle, getMentionStyle } from "./defaultStyle";
import { FaUpload } from "react-icons/fa";
import { SlCheck, SlPicture } from "react-icons/sl";
import { useRouter } from "next/router";
import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { api } from "@/utils/api";
import { useAppStore } from "@/lib/store";
import WizardSteps from "@/components/studio/WizardSteps";
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
  Textarea,
  Input,
  Spinner,
  RadioGroup,
  Radio,
  useToast,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CommunityCard from "../../components/Create_POST/CommunityCard";
import { backgroundColor } from "styled-system";
import { Numbers } from "web3";
import Chips from "@/components/Create_POST/Chips";
const { Client: HiveClient } = require("@hiveio/dhive");
import { TiPlus } from "react-icons/ti";
import { useAuth } from "@/hooks/auth";

// TODO put the type in plz
export type CommunityResult = {
  name: string;
  title: string;
  about: string;
  admins: string;
  sum_pending: number;
  num_pending: number;
  subscribers: number;
  num_authors: number;
};

type FilePreview = {
  file: File;
  previewUrl: string;
};

const hashRegex = /#\w+(-?\w+)*/gm;

const HASHTAG_LIMIT = 2;

const SHOW_HASHTAG_LIMIT_ERROR_TIME_MS = 3000;

//data for the hashtags
const base_mentions = [
  { id: "1", display: "John" },
  { id: "2", display: "Jane" },
  { id: "3", display: "Doe" },
];

// interface CommunityType {
//   name: string;
//   sum_pending: number;
// }

const CreatePost: React.FC = () => {
  //setting a global for the hashtags
  const limitHashtags = 150;

  //for the dark mode
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const mentionStyle = getMentionStyle(colorMode);

  /**
   * For rendering the chips and edited chips
   */
  const [chipData, setChipData] = useState<{ label: string }[]>([]);
  const [chipInput, setChipInput] = useState<string>("");

  /**
   * for the filteration of the results
   */
  const [search, setSearch] = useState<string>("");
  const [cardData, setCardData] = useState<CommunityResult>();

  // video title
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDescription, setVideoDesription] = useState<string>("");
  const [hashtagData, setHashTagData] = useState<string>("");
  const [video_upload_id, setVideoUploadId] = useState<string>("");
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

  const handleEncode = (): void => {
    // set encoding video
    const params = {
      upload_id: video_upload_id,
    };
    const token = localStorage.getItem("access_token");
    axios
      .post("https://acela.us-02.infra.3speak.tv/api/v1/start_encode", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          position: "top-right",
          title: "Success!",
          description: "Encoding video, please wait",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/studio/studio_videos");
      })
      .catch((error) => {
        toast({
          position: "top-right",
          title: "Error!",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const handleCreatePost = (): void => {
    // get video title
    // get video description
    // get thumbnail
    console.log("videotitle", videoTitle);
    console.log("videoDescription", videoDescription);

    const isSave = document.querySelector<HTMLElement>("#btn_details");
    if (isSave?.innerText === "Next") {
      setSteps(2);
    }
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
        toast({
          position: "top-right",
          title: "Success!",
          description: "Successfully created video details",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        // Handle upload error
        setSavingDetails(false);
        console.error("error", error);
        toast({
          position: "top-right",
          title: "Success!",
          description: "Successfully created video details",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_id", response.data.upload_id);
    // get upload_id
    setVideoUploadId(response.data.upload_id);
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
        setSteps(2);
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

  /**
   * Import the useAuth hook
   */
  const { authenticated } = useAuth() ?? {};

  const { allowAccess } = useAppStore();
  // const isMedium = useBreakpointValue({ base: false, md: true });

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

  /**
   * check for the access token (for the testing purpose)
   * /api/v1/upload/update_post
   */

  const [publishValue, setPublishValue] = useState<string>("1");

  //   const colorModeValue = useColorModeValue(
  //     authenticated ? "gray.100" : "gray.100",
  //     authenticated ? "gray.900" : "gray.900"
  //   );

  function handleAddChipData(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      //to checked the entered value is not empty or not aleready present in the chipData
      const trimmedValue = chipInput.trim();
      if (
        trimmedValue &&
        !chipData.some((chip) => chip.label === trimmedValue)
      ) {
        setChipData((prevState) => [...prevState, { label: trimmedValue }]);
        //making input field empty again
        setChipInput("");
      }
    }
  }

  /**
   * Deleting the chip data
   * @param label
   */
  function chipDataDelete(label: string) {
    setChipData(chipData.filter((chip) => chip.label !== label));
  }

 

  /**
   * api import
   */
  const client = new HiveClient("https://api.openhive.network");
  /**
   * useState for setting the community data
   */
  const [communityData, setCommunityData] = useState<CommunityResult[]>([]);

  /**
   * HiveClient api is needed to integrate here
   * query here
   */
  const fetchData = async () => {
    try {
      const result: CommunityResult[] = await client.call(
        "bridge",
        "list_communities",
        {
          last: "",
          limit: 100,
        }
      );
      const titles = result.map((info) => info.title);
      const leoIndex = titles.indexOf("LeoFinance");
      const speakIndex = titles.indexOf("Threespeak");

      let speakValue: CommunityResult, leoValue: CommunityResult;
      if (speakIndex > leoIndex) {
        [speakValue] = result.splice(speakIndex, 1);
        [leoValue] = result.splice(leoIndex, 1);
      } else {
        [leoValue] = result.splice(leoIndex, 1);
        [speakValue] = result.splice(speakIndex, 1);
      }

      result.unshift(leoValue);
      result.unshift(speakValue);

      setCardData(speakValue);
      setCommunityData(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * for the authentication purposes
   */
  if (authenticated === null) {
    return <Box>Loading...</Box>;
  }

  if (authenticated === false) {
    return <Box>Unauthorized access, please login first</Box>;
    //TODO: redirecting to auth components
  }

  return (
    <Box maxH="100vh">
      {/* add the toggle button to the sidebar for opening and close */}
      {/* for mobile view is already there  */}

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
        maxH={"50vh"}
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
            <Card backgroundColor={bgColor}>
              {steps == 0 && (
                <CardBody
                  borderRadius="10px"
                  backgroundColor={bgColor}
                  minH={"75vh"}
                >
                  <Box height={"60vh"} width={"100%"}>
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
                                position={"absolute"}
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
                            backgroundColor={bgColor}
                            borderRadius={"5px"}
                          >
                            {/* <div {...getRootProps()} className="dropzone"> */}
                            <Flex
                              {...getRootProps()}
                              className="dropzone"
                              borderRadius={"5px"}
                              style = {selectedFile === null ? {minHeight: "30vh", minWidth:"30vh"}: {maxHeight: "50vh", maxWidth:"50vh"}}
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
                      <Flex
                        justifyContent={"space-between"}
                        alignItems="center"
                        w={"full"}
                      >
                        {/* {selectedFile && uploadStatus == true && ( */}
                        {uploading && (
                          <Button
                            position={"absolute"}
                            right={5}
                            bottom={180}
                            onClick={() => setSteps(1)}
                            size={"lg"}
                            colorScheme="blue"
                          >
                            Next
                          </Button>
                        )}
                        {/* )} */}
                      </Flex>
                    </Flex>
                  </Box>
                </CardBody>
              )}
              {steps == 1 && (
                <CardBody backgroundColor={bgColor} minH={"75vh"}>
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
                            height="250px"
                            border={"1px solid"}
                            justifyContent="center"
                            background={"black"}
                            alignItems={"center"}
                            borderRadius="10px 10px 0px 0px"
                            position={"relative"}
                          >
                            {/* juneroy */}
                            {selectedFile ? (
                              <>
                                {selectedFile.file.type.startsWith("image/") ? (
                                  <Image
                                    src={selectedFile.previewUrl}
                                    alt="Preview"
                                    // className="preview"
                                  />
                                ) : (
                                  <Box position={"absolute"}>
                                    <video
                                      height={100}
                                      width={112}
                                      src={selectedFile.previewUrl}
                                      className="preview"
                                      controls
                                    />
                                  </Box>
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
                            background={colorMode === "dark" ? "grey" : "grey"}
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
                                mt={2}
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
                            <fieldset className="w-100 mb-4 ">
                              <Text
                                as={"legend"}
                                fontSize="15px"
                                className="fw-bold"
                              >
                                Tags
                              </Text>
                              <Flex alignItems={"center"}>
                                {chipData.map((chip, index) => (
                                  <Chips
                                    key={index}
                                    label={chip.label}
                                    onDelete={() => chipDataDelete(chip.label)}
                                    colorMode={colorMode}
                                  />
                                ))}
                                <Flex
                                  fontSize={"xl"}
                                  mx={2}
                                  cursor={"pointer"}
                                  alignItems={"center"}
                                  position={"relative"}
                                >
                                  <Input
                                    border={ colorMode === "dark" ? "1px solid white" : "1px solid black"}
                                    placeholder={"Add tags"}
                                    value={chipInput}
                                    onChange={(e) =>
                                      setChipInput(e.target.value)
                                    }
                                    onKeyDown={handleAddChipData}
                                  />
                                  <Text position={"absolute"} top={3} right={2}>
                                    <TiPlus />
                                  </Text>
                                </Flex>
                              </Flex>
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

                              {previewThumbnails.map((e, index) => (
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
                                  border={
                                    index === 0 ? "2px solid red" : undefined
                                  }
                                >
                                  <Image
                                    objectFit={"cover"}
                                    borderRadius={"10px"}
                                    src={e}
                                    alt="Thumbnail preview"
                                  />
                                </Flex>
                              ))}
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
                          colorScheme="blue"
                        >
                          Go Back
                        </Button>
                        <Button
                          id="btn_details"
                          disabled={savingDetails == true ? true : false}
                          onClick={handleCreatePost}
                          size={"lg"}
                          colorScheme="blue"
                        >
                          {savingDetails == true ? "Saving Details" : "Next"}
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </CardBody>
              )}
              {/* From here the new component will start */}
              {steps == 2 && (
                <CardBody minH={"75vh"}>
                  <Box
                    overflow="hidden"
                    height={{ base: "auto", md: "auto", lg: "70vh" }}
                    width={"100%"}
                  >
                    <Flex w={"full"}>
                      <Flex w={"50%"}>
                        <CommunityCard {...cardData} />
                      </Flex>
                      <Flex w={"50%"} flexDirection={"column"}>
                        {/* the result card will go here  */}
                        <Flex>
                          <Card w="full" m={2}>
                            <Flex p={2}>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <SearchIcon color="gray.300" />
                                </InputLeftElement>
                                <Input
                                  type="tel"
                                  placeholder="Search"
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </InputGroup>
                            </Flex>
                            <VStack
                              spacing={1}
                              overflowY={"auto"}
                              maxHeight="522px"
                            >
                              {communityData
                                .filter((item: any) => {
                                  return search.toLowerCase() === ""
                                    ? item
                                    : item.title
                                        .toLowerCase()
                                        .includes(search.toLowerCase());
                                })
                                .map((item: any, index) => (
                                  <Flex
                                    key={index}
                                    w={"full"}
                                    p={2}
                                    boxShadow={`0.5px 0.5px 0.5px 0.5px ${
                                      colorMode === "dark" ? "#3f444e" : "black"
                                    }`}
                                    _hover={{ backgroundColor: "#1a202c" }}
                                    _active={{ backgroundColor: "#1a202c" }}
                                    cursor="pointer"
                                    onClick={() => setCardData(item)}
                                  >
                                    <Image
                                      alt="hive blog"
                                      width={"22px"}
                                      height={"22px"}
                                      loader={() =>
                                        "https://images.hive.blog/u/" +
                                        item.name +
                                        "/avatar?size=icon"
                                      }
                                      src={
                                        "https://images.hive.blog/u/" +
                                        item.name +
                                        "/avatar?size=icon"
                                      }
                                    />
                                    <Flex
                                      px={8}
                                      w={"full"}
                                      justifyContent="space-between"
                                      alignItems={"center"}
                                    >
                                      <Flex>
                                        <Text>{item.title}</Text>
                                      </Flex>
                                      <Flex>
                                        <Text>{`id: ${item.id}`}</Text>
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                ))}
                            </VStack>
                          </Card>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      mt={25}
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Button
                        disabled={savingDetails == true ? true : false}
                        onClick={() => setSteps(1)}
                        size={"lg"}
                        colorScheme="blue"
                      >
                        Go Back
                      </Button>
                      <Button
                        disabled={savingDetails == true ? true : false}
                        onClick={() => setSteps(3)}
                        size={"lg"}
                        colorScheme="blue"
                      >
                        Next
                      </Button>
                    </Flex>
                  </Box>
                </CardBody>
              )}
              {steps == 3 && (
                <CardBody backgroundColor={bgColor} minH={"75vh"}>
                  <Box
                    height={{ base: "auto", md: "auto", lg: "65vh" }}
                    width={"100%"}
                  >
                    <Flex
                      margin={"auto"}
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
                                      <Radio value="1">Publish Now</Radio>
                                    </Stack>

                                    <Text as="label">
                                      Publish after encoding and everyone can
                                      watch the video
                                    </Text>
                                  </Box>
                                  <Box
                                    marginBottom={"15px"}
                                    marginLeft={"20px"}
                                  >
                                    <Stack spacing={5} direction="row">
                                      <Radio value="2">Schedule</Radio>
                                    </Stack>
                                    <Box>
                                      <Text as="label">
                                        Set a date and time
                                      </Text>
                                    </Box>

                                    {publishValue == "2" && (
                                      <Input
                                        alignItems={"center"}
                                        width={"50%"}
                                        type="datetime-local"
                                        placeholder="select date"
                                      />
                                    )}
                                  </Box>
                                </Box>
                              </RadioGroup>
                            </Box>
                          </Flex>
                        </Box>
                        <Box
                          paddingTop={"74px"}
                          width={{ base: "100%", md: "100%", lg: "40%" }}
                          paddingX="20px"
                          paddingBottom={"10px"}
                        >
                          <Flex
                            width={"83%"}
                            height="260px"
                            border={"1px solid"}
                            justifyContent="center"
                            background={"black"}
                            alignItems={"center"}
                            borderRadius="10px 10px 0px 0px"
                          >
                            {selectedFile ? (
                              <>
                                {selectedFile.file.type.startsWith("image/") ? (
                                  <Image
                                    src={selectedFile.previewUrl}
                                    alt="Preview"
                                    className="preview"
                                    position={"relative"}
                                  />
                                ) : (
                                  <Box position={"absolute"}>
                                    <video
                                      src={selectedFile.previewUrl}
                                      className="preview_visibility"
                                      controls
                                    />
                                  </Box>
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
                            width={"83%"}
                            height="70px"
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
                                // padding={{
                                //   base: "0px 10px",
                                //   md: "0px 10px",
                                //   lg:"10px",
                                // }}
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
                                mt={2}
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
                          colorScheme="blue"
                        >
                          Go Back
                        </Button>
                        <Button
                          onClick={() => handleEncode()}
                          size={"lg"}
                          colorScheme="blue"
                        >
                          Save
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </CardBody>
              )}
              <WizardSteps
                currentStep={steps}
                changeCurrentStep={changeCurrentStep}
                bgColor={bgColor}
                colorMode={colorMode}
              />
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
