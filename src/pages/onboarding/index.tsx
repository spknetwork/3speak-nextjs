import { Typography } from "@/components";
import OBWizardSteps from "@/components/onboarding/OBWizardSteps";
import { useAppStore } from "@/lib/store";
import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
type FilePreview = {
  file: File;
  previewUrl: string;
};
const OnBoarding = () => {
  // const { getUserHiveDetails, userhiveDetails, userName, userDetails } = useAppStore();
  const router = useRouter();

  const {
    getUserHiveDetails,
    userDetails,
    userhiveDetails,
    setUserHiveDetails,
    
  } = useAppStore();
  const [name, setName] = useState<string>("");
  const [checkDone, setcheckDone] = useState<boolean|null>(null);

  useEffect(() => {
    if (userDetails?.username) {
      getUserHiveDetails(`${userDetails?.username}`);

    }
   
  }, [getUserHiveDetails,userDetails?.username]);

  useEffect(() => {
    if (userDetails) {
        const name = `${userDetails.username}`
        console.log("userDetails",userDetails)
      setName(name);
    }
  }, [userDetails]);

  useEffect(() => {
    console.log("userhiveDetails",userhiveDetails)
    if (userhiveDetails) {
      const from_login = localStorage.getItem("from_login")
      if ((userhiveDetails?.name || userhiveDetails?.name != "" ) && from_login == 'true') {
        setcheckDone(true)
        localStorage.setItem("from_login", "false")
        router.push("/");

      }else{
        localStorage.setItem("from_login", "false")
        setcheckDone(true)
      }
    }else{
      setcheckDone(true)

    }
   
  }, [userhiveDetails])

  const onchangeName = (e: any) => {
    setName(e.target.value);
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
              border={"1px solid"}
              borderRadius="10px"
              width={{base:"100%", md: "100%", lg:"40%"}}
              padding="10px"
              paddingX={"50px"}
              paddingTop={"20px"}
              margin="auto"
              height={"80vh"}
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
                <Text as="h2">Let's start with reviewing of username</Text>
              </Flex>
              <Flex
                justifyContent={"center"}
                alignItems="center"
                marginTop={"1px"}
                width="100%"
              >
                <Text as="h6">
                  This will be your username
                </Text>
              </Flex>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                <fieldset className="Fieldset">
                  <label className="LabelOnboarding" htmlFor="currentPassword">
                    Username
                  </label>
                  <input
                    value={name}
                    disabled
                    
                    className="Input3"
                    id="email"
                    type="email"
                    name="email"
                    style={{cursor: 'not-allowed'}}
                  />
                </fieldset>
              </Box>
              <Flex
                cursor={"pointer"}
                onClick={() => router.push("/onboarding/profile")}
                justifyContent={"center"}
                alignItems="center"
                padding={"0"}
                marginTop={"10px"}
                width="100%"
              >
                <Button width={"xl"} colorScheme="blue">
                  Next
                </Button>
              </Flex>
              {/* <Box
                  width="100%"
                  borderRadius="0.25rem"
                  mt="1.5rem"
                  py="0.75rem"
                  px="1.25rem"
                  backgroundColor="#f8d7da"
                  border="1px solid #f5c6cb"
                >
                  <Typography textAlign="center" color="#721c24">
                    Some email services will wrongly sort our emails,
                    remember to check your junk/spam folder!
                  </Typography>
                </Box> */}
                {/* <Box
                  width="100%"
                  borderRadius="0.25rem"
                  mt="1.5rem"
                  py="0.75rem"
                  px="1.25rem"
                  backgroundColor="#f8d7da"
                  border="1px solid #f5c6cb"
                >
                  <Typography textAlign="center" color="#721c24">
                    In order to claim the keys for the Hive account associated
                    with your 3speak account you must post at least one video.
                  </Typography>
                </Box>  */}
              {/* <Flex cursor={'pointer'} onClick={() => router.push('/onboarding/profile')} justifyContent={'center'} alignItems='center' padding={'10px'} marginTop={'10px'} width='100%' >
                                <Button width={'lg'} colorScheme='blue'>Add display name</Button>
                            </Flex> */}
              {/* <Flex
                cursor={"pointer"}
                onClick={() => router.push("/onboarding/profile")}
                justifyContent={"center"}
                alignItems="center"
                marginTop={"10px"}
                width="100%"
              >
                <Text as="span">Skip</Text>
              </Flex> */}
            </Box>
          </CardBody>
        </Card>
        <OBWizardSteps changeCurrentStep={changeCurrentStep} steps={0} />
      </Flex>
    </Box>
  );
};

export default OnBoarding;
