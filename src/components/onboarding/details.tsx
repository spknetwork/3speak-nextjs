import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Text,
  Textarea,
  useColorMode,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useAppStore } from "@/lib/store";
import { Name } from "@/lib/slices/createUserStore";
import styles from "../../styles/pages/onboarding/details.module.scss";

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const Details = ({ currentStep, setCurrentStep }: Props) => {
  const { getUserHiveDetails, userhiveDetails, userName, userDetails } =
    useAppStore();
  const [coverImage, setcoverImage] = useState<string | null>("");
  const [profileImage, setprofileImage] = useState<string | null>("");
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;
    setColorMode(light ? "light" : "dark");
  }, [setColorMode]);

  useEffect(() => {
    console.log("userDetails?.username", userDetails?.username);
    const ls_coverImage = localStorage.getItem("coverImage");
    const ls_profileImage = localStorage.getItem("profileImage");
    setcoverImage(ls_profileImage);
    setprofileImage(ls_coverImage);
  }, [userDetails?.username]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
  }, [profileImage]);
  useEffect(() => {
    if (coverImage) {
      localStorage.setItem("coverImage", coverImage);
    }
  }, [coverImage]);

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
          router.push("/");
        }
      );
    } catch (error) {
      console.log({ error });
      router.push("/");
    }
  };

  useEffect(() => {
    if (userDetails?.username) {
      getUserHiveDetails(`${userDetails?.username}`);
    }

    if (userName) {
      setName(`${userName}`);
    }
  }, [getUserHiveDetails, userName, userDetails?.username]);

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
              width={{ base: "100%", md: "100%", lg: "40%" }}
              padding="10px"
              paddingX={"50px"}
              margin="auto"
              maxHeight={"90vh"}
            >
              {/* <Form></Form> */}
              <Flex justifyContent={"start"} alignItems="center" width="100%">
                <Text as="h2">Add profile details</Text>
              </Flex>
              <FormControl py={8}>
                <FormLabel pt={2}>Display Name</FormLabel>
                <Input type="text" />
                <FormLabel pt={2}>Location</FormLabel>
                <Input type="text" />
                <FormLabel pt={2}>Website</FormLabel>
                <Input type="text" />
                <FormLabel pt={2}>About</FormLabel>
                <Textarea placeholder="Tell us about your interests" size={"lg"} height={"200px"} />
              </FormControl>
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
    </Box>
  );
};

export default Details;
