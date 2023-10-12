import OBWizardSteps from "@/components/onboarding/OBWizardSteps";
import { useAppStore } from "@/lib/store";
import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { FaLongArrowAltLeft, FaUpload } from "react-icons/fa";
type FilePreview = {
  file: File;
  previewUrl: string;
};
const OnBoarding = () => {
  const { getUserHiveDetails, userhiveDetails } = useAppStore();
  const [coverImage, setcoverImage] = useState<string>("");
  const [profileImage, setprofileImage] = useState<string>("");
  useEffect(() => {
    getUserHiveDetails();
  }, []);
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
    <Box minHeight={"100vh"}>
      <Flex
        flexDirection={"column"}
        padding={"20px"}
        height={"100%"}
        width="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        <Card height={"100%"} width="100%">
          <CardBody>
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
              width={{base:"100%", md: "100%", lg:"60%"}}
              padding="10px"
              paddingTop={"20px"}
              margin="auto"
              height={"80vh"}
            >
              <Flex
                position={"relative"}
                justifyContent={"start"}
                height={"400px"}
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
                    justifyContent={"center"}
                    alignItems="center"
                    fontSize={{
                      base: "60px",
                      md: "60px",
                      lg: "100px",
                    }}
                    borderRadius={"10px"}
                    height={"300px"}
                    width="100%"
                    border={"1px solid"}
                  >
                    <input {...getInputProps()} />
                    {(coverImage || selectedFile) && (
                      <img
                        src={coverImage ? coverImage : selectedFile?.previewUrl}
                        style={{
                          margin: "0",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {!selectedFile && !coverImage && <FaUpload color="grey" />}
                  </Flex>
                </Flex>
                <Box
                  left={{base:"16%", md:"29%", lg: "38%"}}
                  top="205px"
                  position={"absolute"}
                  background={"white"}
                  {...getRootPropsProfile()}
                  cursor={"pointer"}
                  borderRadius={"50%"}
                  height={"200px"}
                  width="200px"
                  border={"1px solid"}
                >
                  <input {...getInputPropsProfile()} />
                  <img
                    src={
                      profileImage
                        ? profileImage
                        : selectedFileProfile
                        ? selectedFileProfile.previewUrl
                        : "/images/avatar3.png"
                    }
                    style={{
                      margin: "0",
                      width: "100%",
                      borderRadius: "100px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
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
                onClick={() => router.push("/onboarding/details")}
                justifyContent={"center"}
                alignItems="center"
                marginTop={"10px"}
                width="100%"
              >
                <Text as="span">Skip</Text>
              </Flex>
            </Box>
          </CardBody>
        </Card>
        <OBWizardSteps changeCurrentStep={changeCurrentStep} steps={1} />
      </Flex>
    </Box>
  );
};

export default OnBoarding;
