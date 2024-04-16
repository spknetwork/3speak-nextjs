import { useAppStore } from "@/lib/store";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { FaLongArrowAltLeft, FaUpload } from "react-icons/fa";
import styles from "../../styles/pages/onboarding/profile.module.scss";

type FilePreview = {
  file: File;
  previewUrl: string;
};

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const Profile = ({ currentStep, setCurrentStep }: Props) => {
  const { getUserHiveDetails, userhiveDetails, userDetails } = useAppStore();
  const [coverImage, setcoverImage] = useState<string>("");
  const [profileImage, setprofileImage] = useState<string>("");
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;
    setColorMode(light ? "light" : "dark");
  }, [setColorMode]);

  useEffect(() => {
    if (userDetails?.username) {
      getUserHiveDetails(`${userDetails?.username}`);
    }
  }, [getUserHiveDetails, userDetails?.username]);
  //   useEffect(() => {
  //     if (profileImage) {
  //       localStorage.setItem("profileImage", profileImage);
  //     }
  //   }, [profileImage]);
  //   useEffect(() => {
  //     if (coverImage) {
  //       localStorage.setItem("coverImage", coverImage);
  //     }
  //   }, [coverImage]);
  useEffect(() => {
    if (userhiveDetails) {
      setcoverImage(userhiveDetails.cover_image);
      setprofileImage(userhiveDetails.profile_image);
    }
  }, [userhiveDetails]);

  const changeCurrentStep = (step: number) => {};
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);
  const [selectedFileProfile, setSelectedFileProfile] =
    useState<FilePreview | null>(null);

  //TODO: fix the uploader function
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({ file, previewUrl });
  }, []);

  const onDropProfile = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setSelectedFileProfile({ file, previewUrl });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const {
    getRootProps: getRootPropsProfile,
    getInputProps: getInputPropsProfile,
  } = useDropzone({
    onDrop: onDropProfile,
  });
  const router = useRouter();

  return (
    <Box h={"70vh"}>
      <Flex
        flexDirection={"column"}
        height={"100%"}
        width="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        <Card height={"100%"} width="100%">
          <CardBody
            className={
              colorMode === "dark" ? styles.my_card : styles.my_card_light
            }
          >
            <Box
              cursor={"pointer"}
              fontSize={{
                base: "30px",
                md: "30px",
                lg: "30px",
              }}
              onClick={() => setCurrentStep(0)}
            >
              <FaLongArrowAltLeft color="gray" />
            </Box>
            <Box
              border={"1px solid"}
              borderRadius="10px"
              width={{ base: "100%", md: "100%", lg: "60%" }}
              padding="10px"
              paddingTop={"10px"}
              margin="auto"
              height={"70vh"}

            >
              <Flex
                flexDirection="column"
                justifyContent="start"
                alignItems={"center"}
                height="full"
                width="100%"
              >
                <Flex
                  cursor="pointer"
                  justifyContent="center"
                  alignItems="center"
                  height="30%"
                  width="100%"
                  marginBottom="20px"
                  border={"1px solid grey"}
                  borderRadius={12}
                  overflow="hidden"
                  position={"relative"}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Flex fontSize={"5xl"}>
                    <FaUpload color="grey" />
                  </Flex>
                  {/* Display the selected cover image or a placeholder */}
                  {selectedFile ? (
                    <Flex>
                      <Image
                        src={selectedFile.previewUrl}
                        alt="Cover Image"
                        objectFit="cover"
                        layout="fill"
                      />
                    </Flex>
                  ) : (
                    <Flex mx={8} mt={6}>
                      <Text>No cover image selected</Text>
                    </Flex>
                  )}
                </Flex>

                {/* Profile Picture Container */}
                <Flex
                  h="200px"
                  w="200px"
                  backgroundColor="white"
                  justifyContent="center"
                  borderRadius="50%"
                  alignItems="center"
                  {...getRootProps()}
                >
                  <Box
                    cursor="pointer"
                    borderRadius="50%"
                    border="1px solid"
                    overflow="hidden" 
                    position="relative"
                  >
                    <input {...getInputPropsProfile()} />
                    <input type="hidden" value={profileImage} />
                    <input type="hidden" value={coverImage} />
                    {!selectedFileProfile && (
                      <Image
                        className={styles.my_Image}
                        height="80px"
                        width="80px"
                        alt="avatar"
                        src={"/images/avatar3.png"}
                      />
                    )}
                  </Box>
                </Flex>
                <Flex
                  justifyContent={"center"}
                  alignItems="center"
                  marginTop={"10px"}
                  width="100%"
                >
                  <Text as="h2">Add profile and banner</Text>
                </Flex>
                <Flex
                  justifyContent={"center"}
                  alignItems="center"
                  marginTop={"1px"}
                  width="100%"
                >
                  <Text as="h6">
                    Add profile and banner so that your friends know it`s you
                  </Text>
                </Flex>
                <Flex
                  cursor={"pointer"}
                  onClick={() => router.push("/onboarding/details")}
                  justifyContent={"center"}
                  alignItems="center"
                  padding={"10px"}
                  marginTop={"10px"}
                  width="100%"
                >
                  <Button width={"lg"} colorScheme="blue">
                    Save photo
                  </Button>
                </Flex>
                <Flex
                  cursor={"pointer"}
                  onClick={() => setCurrentStep(2)}
                  justifyContent={"center"}
                  alignItems="center"
                  marginTop={"10px"}
                  width="100%"
                >
                  <Text as="span">Skip</Text>
                </Flex>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default Profile;

