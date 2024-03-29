import OBWizardSteps from "@/components/onboarding/OBWizardSteps";
import { useAppStore } from "@/lib/store";
import { Box, Button, Card, CardBody, Flex, Text, useColorMode } from "@chakra-ui/react";
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
const OnBoarding = () => {
  const { getUserHiveDetails, userhiveDetails,userDetails } = useAppStore();
  const [coverImage, setcoverImage] = useState<string>("");
  const [profileImage, setprofileImage] = useState<string>("");
  const {colorMode, setColorMode } = useColorMode();
  

  useEffect(() => {
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;
    setColorMode(light ? "light" : "dark");
  }, [setColorMode]);


  useEffect(() => {
    if (userDetails?.username) {
      getUserHiveDetails(`${userDetails?.username}`);

    }
   
  }, [getUserHiveDetails,userDetails?.username]);
  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage",profileImage)
    }
  },[profileImage])
  useEffect(() => {
    if (coverImage) {
      localStorage.setItem("coverImage",coverImage)
    }
  },[coverImage])
  useEffect(() => {
    if (userhiveDetails) {
      setcoverImage(userhiveDetails.cover_image);
      setprofileImage(userhiveDetails.profile_image);
    }
  }, [userhiveDetails]);

  const changeCurrentStep = (step: number) => { };
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);
  const [selectedFileProfile, setSelectedFileProfile] =
    useState<FilePreview | null>(null);

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
    <Box h={"80vh"}>
      <Flex
        flexDirection={"column"}
        height={"100%"}
        width="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        <Card height={"100%"} width="100%">
          <CardBody className={colorMode === "dark" ? styles.my_card : styles.my_card_light}>
            <Box
              cursor={"pointer"}
              onClick={() => router.push("/onboarding/")}
              fontSize={{
                base: "30px",
                md: "30px",
                lg: "30px",
              }}
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
                position={"relative"}
                justifyContent={"start"}
                height={{ base: "200px", md: "400px" }}
                width="100%"
              >
                <Flex
                  {...getRootProps()}
                  cursor={"pointer"}
                  justifyContent={"center"}
                  height={"300px"}
                  width="100%"
                >
                  <Flex
                    position={'absolute'}
                    className="test"
                    justifyContent={"center"}
                    alignItems="center"
                    fontSize={{
                      base: "60px",
                      md: "60px",
                      lg: "100px",
                    }}
                    borderRadius={"10px"}
                    height={{ base: "100px", md: "200px" }}
                    width="100%"
                    border={"1px solid"}
                  >
                    {/* <span> {coverImage}</span> */}

                    {/* {selectedFile} */}
                    <input {...getInputProps()} />

                    <FaUpload color="grey" />
                  </Flex>
                </Flex>
                <Box
                  left={{ base: "40%", md: "40%", lg: "40%" }}
                  top={{ base: "120px", md: "180px" }}
                  position={"absolute"}
                  background={"white"}
                  {...getRootPropsProfile()}
                  cursor={"pointer"}
                  borderRadius={"50%"}
                  height={{ base: "100px", md: "200px" }}
                  width={{ base: "100px", md: "200px" }}
                  border={"1px solid"}
                >
                  <input {...getInputPropsProfile()} />
                  <input type="hidden" value={profileImage} />
                  <input type="hidden" value={coverImage} />
                  {!selectedFileProfile && (
                    <Image
                     className={styles.my_Image}
                      layout="fill"
                      alt="avatar"
                      src={
                        '/images/avatar3.png'
                      }
                    />
                  )}

                </Box>
              </Flex>
              <Flex
                justifyContent={"center"}
                alignItems="center"
                width="100%"
              >
                <Text as="h2">Add profile and banner</Text>
              </Flex>
              <Flex
                justifyContent={"center"}
                alignItems="center"
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
                width="100%"
              >
                <Button width={"lg"} colorScheme="blue">
                  Save photo
                </Button>
              </Flex>
              <Flex
                cursor={"pointer"}
                onClick={() => router.push("/onboarding/details")}
                justifyContent={"center"}
                alignItems="center"
                width="100%"
              >
                <Text as="span">Skip</Text>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Flex>
        <OBWizardSteps changeCurrentStep={changeCurrentStep} steps={1} />
    </Box>
  );
};

export default OnBoarding;
