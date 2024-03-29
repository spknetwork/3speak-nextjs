import { Box, Button, Card, CardBody, Flex, Input, Text, Textarea, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OBWizardSteps from "@/components/onboarding/OBWizardSteps";
import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useAppStore } from "@/lib/store";
import { Name } from "@/lib/slices/createUserStore";
import styles  from "../../styles/pages/onboarding/details.module.scss";

const OnBoarding = () => {
  const { getUserHiveDetails, userhiveDetails, userName, userDetails } = useAppStore();
  const [coverImage, setcoverImage] = useState<string| null>("");
  const [profileImage, setprofileImage] = useState<string| null>("");
  const { colorMode, setColorMode } = useColorMode(); 

  useEffect(() => {
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;
    setColorMode(light ? "light" : "dark");
  }, [setColorMode]);


  useEffect(() => {
    console.log("userDetails?.username",userDetails?.username)
    const ls_coverImage = localStorage.getItem("coverImage")
    const ls_profileImage = localStorage.getItem("profileImage")
    setcoverImage(ls_profileImage)
    setprofileImage(ls_coverImage)
  },[userDetails?.username])

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
  
  const router = useRouter();
  const [datawindow] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const requestBroadcast = () => {
    try {
      const keychain = window.hive_keychain;
      const profile = {
        profile: {
          name: name,
          version: 2,
          location: location,
          about: about,
          website: website,
          cover_image: coverImage,
          profile_image: profileImage,
        },
      };

      const stringprofile = JSON.stringify(profile);
      keychain.requestBroadcast(
        `${userDetails?.username}`,
        [
          [
            "account_update2",
            {
              account: `${userDetails?.username}`,
              json_metadata: "",
              posting_json_metadata: stringprofile,
              extensions: [],
            },
          ],
        ],
        "Posting",
        (response: any) => {
          console.log("response", response);
          router.push("/")
        }
      );
    } catch (error) {
      console.log({ error });
      router.push("/")
    }
    
  };

  useEffect(() => {
    if (userDetails?.username) {
      getUserHiveDetails(`${userDetails?.username}`);
    }
   
    if (userName) {
      setName(`${userName}`);
    }
  }, [getUserHiveDetails,userName,userDetails?.username]);

  useEffect(() => {
    if (userhiveDetails) {
      console.log("userhiveDetails useffect", userhiveDetails);
      setWebsite(userhiveDetails.website);
      setAbout(userhiveDetails.about);
      setLocation(userhiveDetails.location);
      setName(userhiveDetails.name);
    }
  }, [userhiveDetails]);

  return (
    <Box>
      <Flex
        flexDirection={"column"}
        height={"auto"}
        width="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        <Card height={"100%"} width="100%">
          <CardBody className={colorMode === "dark"? styles.my_card : styles.my_card_light}>
            <Box
              cursor={"pointer"}
              onClick={() => router.push("/onboarding/profile")}
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
              width={{base:"100%", md: "100%", lg:"40%"}}
              padding="10px"
              paddingX={"50px"}
              margin="auto"
              maxHeight={"90vh"}
            >
              <Flex
                justifyContent={"start"}
                alignItems="center"
                width="100%"
              >
                <Text as="h2">Add profile details</Text>
              </Flex>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                  <Text>
                    Display Name
                  </Text>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="Input3"
                    id="name"
                    type="text"
                    name="name"
                  />
              </Box>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                  <Text>
                    Location
                  </Text>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="Input3"
                    id="text"
                    type="text"
                    name="text"
                  />
              </Box>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                  <Text>
                    Website
                  </Text>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="Input3"
                    type="text"
                  />
              </Box>
              <Box my={12} width="100%">
                  <Text>
                    About
                  </Text>
                  <Textarea
                    height={12}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="Input3Area"
                    rows={12}
                    cols={50}
                  ></Textarea>
              </Box>
              <Flex
                cursor={"pointer"}
                onClick={() => requestBroadcast()}
                justifyContent={"center"}
                alignItems="center"
                padding={"0"}
                width="100%"
              >
                <Button width={"xl"} colorScheme="blue">
                  Save
                </Button>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Flex>
        <OBWizardSteps changeCurrentStep={null} steps={2} />
    </Box>
  );
};

export default OnBoarding;
