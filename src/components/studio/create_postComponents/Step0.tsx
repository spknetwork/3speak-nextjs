import React, { useState, useEffect, useRef, SetStateAction } from "react";
import {
  Flex,
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import { IoCaretForwardSharp, IoCaretBackSharp } from "react-icons/io5";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTus } from "use-tus";
import {
  generateVideoThumbnails,
  getVideoDurationFromVideoFile,
} from "@rajesh896/video-thumbnails-generator";
import { FilePreview } from "@/pages/studio/create_post";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";

type Props = {
  uploading: Boolean;
  selectedFile: FilePreview | null;
  setUploading: React.Dispatch<React.SetStateAction<Boolean>>;
  setSelectedFile: React.Dispatch<SetStateAction<FilePreview | null>>;
  setPreviewThumbnails: React.Dispatch<SetStateAction<string[]>>;
  setFileKey: React.Dispatch<SetStateAction<number>>;
  startUpload: (
    file: File,
    upload_id: string,
    video_id: string
  ) => Promise<string | null>;
  getRootProps: <T extends DropzoneRootProps = DropzoneRootProps>(
    props?: T | undefined
  ) => T;
  getInputProps: <T extends DropzoneInputProps = DropzoneInputProps>(
    props?: T | undefined
  ) => T;
  handleCreatePost: () => Promise<void>;
  setSteps: React.Dispatch<SetStateAction<number>>
};

const Step0 = ({
  uploading,
  setUploading,
  selectedFile,
  setSelectedFile,
  setPreviewThumbnails,
  setFileKey,
  startUpload,
  getRootProps,
  getInputProps,
  handleCreatePost,
  setSteps
}: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const toast = useToast();

  //startUpload function here
  return (
    <CardBody
      borderRadius="10px"
      backgroundColor={bgColor}
      maxH={"75vh"}
      minH={"70vh"}
    >
      <Flex maxH={"60vh"} width={"100%"}>
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
                  style={
                    selectedFile === null
                      ? { minHeight: "20vh", minWidth: "20vh" }
                      : { maxHeight: "50vh", maxWidth: "50vh" }
                  }
                  justifyContent="center"
                  alignItems={"center"}
                  border={"1px dotted grey"}
                  fontSize={{
                    base: "30px",
                    md: "50px",
                    lg: "70px",
                  }}
                >
                  <input {...getInputProps()} />
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
                <Button {...getRootProps()} size={"lg"} colorScheme="twitter">
                  Select media
                </Button>
              </Flex>
            </Box>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center" w={"full"}>
            {/* {selectedFile && uploadStatus == true && ( */}
            {/* Note: Only here use create_upload apis and rest all other places update_post api  */}
            {uploading && (
              <Button
                position={"absolute"}
                right={20}
                bottom={170}
                onClick={async () => {
                  try {
                    handleCreatePost();
                    setSteps(1);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                size={"lg"}
                colorScheme={"twitter"}
              >
                Next
                <IoCaretForwardSharp />
              </Button>
            )}
            {/* )} */}
          </Flex>
        </Flex>
      </Flex>
    </CardBody>
  );
};

export default Step0;
