import { Typography } from "@/components";
import MainLayout from "@/components/Layouts/main_layout";
import OBWizardSteps from "@/components/onboarding/OBWizardSteps";
import { useAppStore } from "@/lib/store";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import styles from "../../styles/pages/onboarding/index.module.scss";

type FilePreview = {
  file: File;
  previewUrl: string;
};

type Props = {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

const Username = (props: Props) => {
  // const { getUserHiveDetails, userhiveDetails, userName, userDetails } = useAppStore();
  const router = useRouter();
  const { colorMode, setColorMode } = useColorMode();
 
  /**
   * for the system mode
   */
  useEffect(() => {
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;
    setColorMode(light ? "light" : "dark");
  }, [setColorMode]);

  const {
    getUserHiveDetails,
    userDetails,
    userhiveDetails,
    setUserHiveDetails,
  } = useAppStore();


  const [checkDone, setcheckDone] = useState<boolean | null>(null);

  useEffect(() => {
    if (userDetails?.username) {
      getUserHiveDetails(`${userDetails?.username}`);
    }
  }, [getUserHiveDetails, userDetails?.username]);

  useEffect(() => {
    if (userDetails) {
      const name = `${userDetails.username}`;
      console.log("userDetails", userDetails);
      props.setName(name);
    }
  }, [userDetails]);

  useEffect(() => {
    // console.log("userhiveDetails",userhiveDetails)
    if (userhiveDetails) {
      const from_login = localStorage.getItem("from_login");
      if (
        (userhiveDetails?.name || userhiveDetails?.name != "") &&
        from_login == "true"
      ) {
        setcheckDone(true);
        localStorage.setItem("from_login", "false");
        router.push("/");
      } else {
        localStorage.setItem("from_login", "false");
        setcheckDone(true);
      }
    } else {
      setcheckDone(true);
    }
  }, [userhiveDetails, router]);

  //function for changing the name
  const onchangeName = (e: any) => {
    props.setName(e.target.value);
    setUserHiveDetails(e.target.value);
    console.log("onchangeName", name);
  };

  const changeCurrentStep = (step: number) => {};
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({ file, previewUrl });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  // const router = useRouter();
  if (checkDone == null) {
    return <Box>Loading...</Box>;
  }

  const handleName = (e: any) => {
     e.preventDefault();
     if(props.name){
       props.setCurrentStep(1);
     }
     
  }

  return (
    <Box
      maxH={"70vh"}
      className={
        colorMode === "dark" ? styles.my_class_name : styles.my_class_name_light
      }
      position={"relative"}
    >
      <Flex
        flexDirection={"column"}
        padding={"20px"}
        height="auto"
        width="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        <Card height={"100%"} width="100%">
          <CardBody
            className={
              colorMode === "dark"
                ? styles.my_card_name
                : styles.my_card_name_light
            }
          >
            <Box
              border={"1px solid"}
              borderRadius="10px"
              width={{ base: "100%", md: "100%", lg: "40%" }}
              padding="10px"
              paddingX={"50px"}
              paddingTop={"20px"}
              margin="auto"
              height={"70vh"}
              className={styles.my_child_name}
            >
              {/* <Flex justifyContent={'center'} height={'200px'} width='100%' >
                <Box  {...getRootProps()} cursor={'pointer'} borderRadius={'50%'} height={'200px'} width='200px' border={'1px solid'}>
                <input {...getInputProps()} />
                  <img src={selectedFile?selectedFile.previewUrl:'/images/avatar3.png'} style={{margin:'0', width:'100%', borderRadius:'100px', height:'100%', objectFit:'cover'}} />
                  </Box>
              </Flex> */}
              <Flex
                justifyContent={"center"}
                alignItems="center"
                marginTop={"10px"}
                width="100%"
              >
                <Text as="h2">Let&apos;s start with reviewing of username</Text>
              </Flex>
              <Flex
                justifyContent={"center"}
                alignItems="center"
                marginTop={"1px"}
                width="100%"
              >
                <Text as="h6">This will be your username</Text>
              </Flex>
              <Box
                className={styles.username}
                mb="1.5rem"
                mt="1.5rem"
                width="100%"
              >
                <Flex color={colorMode === "dark" ? "white" : "black"}>
                  Username
                </Flex>
                <Flex>
                  <Input
                    required
                    className={styles.username_input}
                    onChange={onchangeName}
                    value={props.name}
                    type="text"
                  />
                </Flex>
              </Box>
              <Flex
                cursor={"pointer"}
                justifyContent={"center"}
                alignItems="center"
                padding={"0"}
                marginTop={24}
                width="100%"
              >
                <Button
                  width={"sm"}
                  colorScheme="blue"
                  onClick={handleName}
                  isDisabled={!(props.name)}
                >
                  Next
                </Button>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default Username;
