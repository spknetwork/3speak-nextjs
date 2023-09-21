import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import React from "react";
import OBWizardSteps from "@/components/onboarding/OBWizardSteps";
import { useRouter } from "next/router";

const OnBoarding = () => {
  const router = useRouter();

  return (
    <Box height={"100vh"}>
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
              width={"40%"}
              padding="10px"
              paddingX={"50px"}
              paddingTop={"20px"}
              margin="auto"
              height={"100%"}
            >
              <Flex
                justifyContent={"start"}
                alignItems="center"
                marginTop={"10px"}
                width="100%"
              >
                <Text as="h2">Add profile description</Text>
              </Flex>
              <Flex
                justifyContent={"start"}
                alignItems="center"
                marginTop={"1px"}
                width="100%"
              >
                <Text as="h6">
                  This will give an idea to your friends whats your content all
                  about.
                </Text>
              </Flex>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="currentPassword">
                    About
                  </label>
                  <textarea
                    className="Input3Area"
                    rows={4}
                    cols={50}
                  ></textarea>
                </fieldset>
              </Box>
              <Flex
                cursor={"pointer"}
                onClick={() => router.push("/onboarding/banner")}
                justifyContent={"start"}
                alignItems="center"
                padding={"0"}
                marginTop={"10px"}
                width="100%"
              >
                <Button width={"xl"} colorScheme="blue">
                  Save
                </Button>
              </Flex>
            </Box>
          </CardBody>
        </Card>
        <OBWizardSteps changeCurrentStep={null} steps={2} />
      </Flex>
    </Box>
  );
};

export default OnBoarding;
