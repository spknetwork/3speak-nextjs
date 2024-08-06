//TODO: test the uploading apis and check wether the data is published on chain or not
//TODO: fetch the previous of the video that is in the draft
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  useColorMode,
  Button,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import styled from "styled-components";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import axios from "axios";
import {
  generateVideoThumbnails,
  getVideoDurationFromVideoFile,
} from "@rajesh896/video-thumbnails-generator";
import { useTus } from "use-tus";
import styles from "../../components/ProgressBar.module.css";
import { useRouter } from "next/router";
import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { api } from "@/utils/api";
import { useAppStore } from "@/lib/store";
import WizardSteps from "@/components/studio/WizardSteps";
import {} from "@chakra-ui/react";

import Chips from "@/components/Create_POST/Chips";
const { Client: HiveClient } = require("@hiveio/dhive");
import { TiPlus } from "react-icons/ti";
import { useAuth } from "@/hooks/auth";
import CommunityChip from "@/components/Create_POST/CommunityChip";
import { useQuery, QueryClient } from "@tanstack/react-query";
import UploadVideo from "@/components/studio/create_postComponents/UploadVideo";
import UploadDetails from "@/components/studio/create_postComponents/UploadDetails";
import AddCommunity from '@/components/studio/create_postComponents/AddCommunity'
import PublishVideo from "@/components/studio/create_postComponents/PublishVideo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  },
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

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

export type FilePreview = {
  file: File;
  previewUrl: string;
};


//data for the hashtags
const base_mentions = [
  { id: "1", display: "John" },
  { id: "2", display: "Jane" },
  { id: "3", display: "Doe" },
];

const CreatePost: React.FC = () => {
  const BASE_URL = "https://staging.3speak.tv";
  const UPLOAD_URL = "https://staging.3speak.tv/tusd/files/";
  //setting a global for the hashtags
  const limitHashtags = 150;

  //for the dark mode
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

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
  const [videoDescription, setVideoDescription] = useState<string>("");
  const [hashtagData, setHashTagData] = useState<string>("");

  const [video_id, setvideoId] = useState("");
  const [upload_id, setUploadId] = useState("");
  const [getpermLink, setPermLink] = useState("");

  const [savingDetails, setSavingDetails] = useState<Boolean | null>(null);
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);

  const [fileKey, setFileKey] = useState(0)
  const [fileIdentifier, setFileIdentifier] = useState("");

  const [uploadingProgress, setUploadingProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<Boolean | null>(null);
  //This is the useState for setting the thing to upload
  const [uploading, setUploading] = useState<Boolean>(false);

  const [steps, setSteps] = useState<number>(0);
  const [uploadingVideo, setUploadingVideo] = useState<Boolean>(false);
  const [uploadingVideoLabel, setUploadingVideoLabel] =
    useState<String>("Uploading Video...");

  const [previewThumbnails, setPreviewThumbnails] = useState<string[]>([]);
  const [previewManualThumbnails, setPreviewManualThumbnails] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const [selectedThumbnail, setSelectedThumbnail] = useState<{
    type: "generated" | "uploaded";
    index: number;
  }>({ type: "generated", index: 0 });

  const toast = useToast();
  //tus use for upload
  const { upload, setUpload, isSuccess, error, remove } = useTus({
    autoStart: true,
    uploadOptions: {
      endpoint: UPLOAD_URL,
    },
  });
  /**
   * @param acceptedFiles
   * @returns
   */
  const handleFileDrop = async (acceptedFiles: File[]) => {
    return await new Promise(async (resolve, reject) => {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);

    if (!file?.type?.startsWith("video/")) {
      console.log("Cant upload file, select a video type only");
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

      const thumbs = await generateVideoThumbnails(file, 3, "url");
      console.log("thumbs", thumbs);

      setPreviewThumbnails(thumbs.slice(1));

      console.log("dropped file check", file);
      setSelectedFile({ file, previewUrl });
      setFileKey(prevKey => prevKey + 1);

      //set uploading state to true
      setUploading(true);
    });
  };


  const { data: createUploadInfo, error: createUploadError } = useQuery(
    {
      queryKey: ["create_upload"],
      async queryFn() {
        const token = getAccessToken();
        if (!token) {
          console.error("no token found");
          throw new Error("not logged in");
        }
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/upload/create_upload`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("data from the create_upload", data);

        console.log("upload info created");

        return data as {
          permlink: string;
          upload_id: string;
          video_id: string;
        };
      },
    },
    queryClient
  );

  const handleCreatePostRef = useRef<() => Promise<void>>();

  /**
   * HandleCreate function api used : "/upload/create_upload"
   * @param {void}
   * @returns {status code 201}
   */
  const handleCreatePost = async () => {
    if (!createUploadInfo) {
      if (createUploadError) {
        console.error("can not upload", createUploadError);
      } else {
        await sleep(100);
        handleCreatePostRef.current?.();
      }
      return;
    }
    // Assuming selectedFile has the state variable where the file and previewUrl are stored
    if (!selectedFile || !selectedFile.file) {
      console.error("No file selected");
      return;
    }

    const uploadedUrl = await startUpload(
      selectedFile.file,
      createUploadInfo.upload_id,
      createUploadInfo.video_id
    );
    console.log(`uploaded url is - ${uploadedUrl}`);
    if (uploadedUrl) {
      const uploadedUrlArray = uploadedUrl.split("/");
      setFileIdentifier(uploadedUrlArray[uploadedUrlArray.length - 1]);
    } else {
      console.log("uploaded url is null");
    }
  };

  handleCreatePostRef.current = handleCreatePost;

  /**
   * function for the uploading process
   * @param {video_id, upload_id}
   * changes made: async & await removed
   */


  const startUpload = useCallback(
    (
      file: File,
      upload_id: string,
      video_id: string
    ): Promise<string | null> => {
      return new Promise((resolve, reject) => {
        if (!file) return;
        const token = getAccessToken();
        console.log("token", token);

        setUpload(file, {
          //   endpoint: `${UPLOAD_URL}`,
          metadata: {
            video_id: video_id,
            upload_id: upload_id,
            filename: file.name,
            filetype: file.type,
          },
          onError: (error) => {
            console.error("Upload error:", error);
            setUploadStatus(false);
            reject(error);
          },
          onSuccess: (upload) => {
            console.log("Upload complete");
            setUploadStatus(true);
            resolve(upload.url);
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            const progress = (bytesUploaded / bytesTotal) * 100;
            console.log(`Upload progress: ${progress}%`);
            setUploadingProgress(progress);
          },
        });
      });
    },
    [setUpload]
  );

  /**
   * This part is throwing issues on the deployment part 
   */
//   useEffect(() => {
//     if (selectedFile && createUploadInfo) {
//         startUpload(selectedFile.file, createUploadInfo?.upload_id, createUploadInfo?.video_id);
//     }
//   }, [fileKey, startUpload, createUploadInfo]);
  

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
    setPreviewManualThumbnails((previewManualThumbnails) => [
      { file, previewUrl },
      ...previewManualThumbnails,
    ]);
    setSelectedThumbnail({ type: "uploaded", index: 0 });
  };

  const saveThumbnail = async () => {
    if (!createUploadInfo) {
      console.error("create upload info not defined");
      return;
    }

    const file = await (async () => {
      if (selectedThumbnail.type === "generated") {
        const url = previewThumbnails[selectedThumbnail.index];
        const res = await fetch(url);
        return res.blob();
      } else {
        return previewManualThumbnails[selectedThumbnail.index].file;
      }
    })();

    const token = getAccessToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("video_id", createUploadInfo.video_id);
    // get upload_id

    await axios.post(`${BASE_URL}/api/v1/upload/thumbnail`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //Function for resetting the upload progress
//   const onFileChange = useCallback(async (file: File) => {
//     setSelectedFile(file);
//     setUploadStatus(true);
//     setUploadingProgress(0);

//     try {
//       const uploadInfo = await createUploadInfo();
//       const uploadedUrl = await startUpload(file, uploadInfo.upload_id, uploadInfo.video_id);

//       if (uploadedUrl) {
//         const uploadedUrlArray = uploadedUrl.split("/");
//         const fileIdentifier = uploadedUrlArray[uploadedUrlArray.length - 1];
//         console.log(`File uploaded successfully. Identifier: ${fileIdentifier}`);
//         setUploadStatus('success');
//       } else {
//         console.log("Upload failed or was cancelled");
//         setUploadStatus('error');
//       }
//     } catch (error) {
//       console.error("Error during upload:", error);
//       setUploadStatus('error');
//     }
//   }, [createUploadInfo, startUpload]);

  const handleStep1Complete = async () => {
    setSavingDetails(true);
    await saveThumbnail();
    setSavingDetails(false);
    setSteps(2);
  };

  const uploadPostInfo = async () => {
    if (!createUploadInfo) {
      console.error("missing upload info in uploadPostInfo()");
      throw new Error("this should not happen");
    }

    if (!cardData) {
      console.error("missing community info in uploadPostInfo()");
      throw new Error("oops");
    }

    if (!selectedFile) {
      console.error("missing selected file in uploadPostInfo()");
      throw new Error("oops");
    }

    const token = getAccessToken();

    console.log("community name", cardData.name);

    await axios.post(
      `${BASE_URL}/api/v1/upload/update_post`,
      {
        video_id: createUploadInfo.video_id,
        permlink: createUploadInfo.permlink,
        title: videoTitle,
        body: videoDescription,
        tags: chipData.map(({ label }) => label),
        community: cardData.name,
        beneficiaries: "[]", // TODO give user the option to select this
        language: navigator.language.split("-").shift(),
        originalFilename: selectedFile.file.name,
        filename: fileIdentifier,
        size: selectedFile.file.size,
        duration: await getVideoDurationFromVideoFile(selectedFile.file),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const handleStep2Complete = async () => {
    setSavingDetails(true);
    await uploadPostInfo();
    setSavingDetails(false);
    setSteps(3);
  };

  const publishVideo = async () => {
    if (!createUploadInfo) {
      console.error("missing upload info in uploadPostInfo()");
      throw new Error("this should not happen");
    }
    const token = getAccessToken();

    console.log("Upload id -> ", createUploadInfo.upload_id);
    console.log("Video id -> ", createUploadInfo.video_id);
    console.log("permlink -> ", createUploadInfo.permlink);

    // backend initiates hive tx
    const result = await axios.post(
      `${BASE_URL}/api/v1/upload/start_encode`,
      JSON.stringify({
        upload_id: createUploadInfo.upload_id,
        video_id: createUploadInfo.video_id,
        permlink: createUploadInfo.permlink,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.status === 201) {
      router.push("/studio/studio_videos");
    }
    console.log("Video Uploaded");
  };

  const handleStep3Complete = async () => {
    setSavingDetails(true);
    await publishVideo();
    setSavingDetails(false);
    // TODO take user somewhere when done
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
    router.push("/auth/modals");
  }

  /**
   * function for login and caching the data to the localstorage
   * @header {authorization}
   */

  return (
    <Box maxH="auto">
      {/* add he toggle button to the sidebar for opening and close */}
      {/* for mobile view is already there  */}

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
            height={"auto"}
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
        {/**
         * /upload/create_upload api
         * @params account, userKey
         */}
        <Box paddingLeft={"1.5rem"} paddingRight="1.5rem" maxH={"70vh"}>
          <Box>
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
            <Card backgroundColor={bgColor}>
              {steps == 0 && (
                  <UploadVideo
                   uploading={uploading} setUploading={setUploading} selectedFile={selectedFile} setSelectedFile={setSelectedFile} 
                   setPreviewThumbnails={setPreviewThumbnails}
                   setFileKey={setFileKey}
                   startUpload={startUpload}
                   getRootProps={getRootProps}
                   getInputProps={getInputProps}
                   handleCreatePost={handleCreatePost}
                   setSteps={setSteps}
                  />
              )}
              {steps == 1 && (
                <UploadDetails 
                 selectedFile={selectedFile}
                 savingDetails={savingDetails}
                 videoTitle={videoTitle}
                 setVideoTitle={setVideoTitle}
                 videoDescription={videoDescription}
                 setVideoDescription={setVideoDescription}
                 chipData={chipData}
                 setChipData={setChipData}
                 chipInput={chipInput}
                 setChipInput={setChipInput}
                 chipDataDelete={chipDataDelete}
                 handleAddChipData={handleAddChipData}
                 getInputPropsThumbnail={getInputPropsThumbnail}
                 getRootPropsThumbnail={getRootPropsThumbnail}
                 previewManualThumbnails={previewManualThumbnails}
                 previewThumbnails={previewThumbnails}
                 selectedThumbnail={selectedThumbnail}
                 setSelectedThumbnail={setSelectedThumbnail}
                 setSteps={setSteps}
                 handleStep1Complete={handleStep1Complete}
                />
              )}
              {/* From here the new component will start */}
              {steps == 2 && (
                 <AddCommunity
                 cardData={cardData}
                 setSearch={setSearch}
                 communityData={communityData}
                 savingDetails={savingDetails}
                 handleStep2Complete={handleStep2Complete}
                 setSteps={setSteps}
                 setCardData={setCardData}
                 search={search}
                 />
              )}
              {steps == 3 && (
                 <PublishVideo 
                   setPublishValue={setPublishValue}
                   publishValue={publishValue}
                   selectedFile={selectedFile}
                   savingDetails={savingDetails}
                   handleStep3Complete={handleStep3Complete}
                   setSteps={setSteps}
                 />
              )}
              <Box my={4}>
                <WizardSteps
                  currentStep={steps}
                  changeCurrentStep={changeCurrentStep}
                  bgColor={bgColor}
                  colorMode={colorMode}
                />
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CreatePost;
function setVideoUploadId(upload_id: any) {
  throw new Error("Function not implemented.");
}
