import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import styles from "../../styles/pages/onboarding/wizard.module.scss";

const WizardcurrentStep = ({ setCurrentStep, currentStep }: any) => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    const light = window.matchMedia("(prefers-color-scheme: light)").matches;
    setColorMode(light ? "light" : "dark");
  }, [setColorMode]);

  return (
    <Box borderRadius={"10px"} marginTop={"80px"} height={"5vh"} width={"100%"}>
      <Flex
        className={
          colorMode === "dark"
            ? styles.parent_container
            : styles.parent_container_light
        }
        height={"119px"}
        justifyContent={"center"}
        alignItems="center"
        paddingX={"30px"}
        flexDirection="row"
      >
        <Flex
          onClick={() => setCurrentStep(0)}
          cursor={"pointer"}
          border="none"
          color={currentStep == 0 ? "#fff" : "white"}
          background="#3182ce"
          borderColor={"#3182ce"}
          justifyContent={"center"}
          alignItems="center"
          borderRadius={"50%"}
          width={"60px"}
          height="60px"
        >
          {/* for name */}
          <Text margin="0px" fontWeight={"bold"}>
            Name
          </Text>
        </Flex>

        {/* border={'1px solid black'} */}
        <Flex
          border={currentStep > 0 ? "1px solid #3182ce" : "1px solid black"}
          borderRight="none"
          borderLeft="none"
          background={currentStep > 0 ? "#3182ce" : "#000"}
          width={"35%"}
          height="0px"
        >
          {/* for line1 */}
        </Flex>

        <Flex
          onClick={() => setCurrentStep(1)}
          cursor={"pointer"}
          border={currentStep > 0 ? "1px solid #fff" : "1px solid #fff"}
          color={currentStep > 0 ? "#fff" : "#000"}
          background={currentStep > 0 ? "#3182ce" : "#fff"}
          borderColor={currentStep > 0 ? "#3182ce" : "#000"}
          justifyContent={"center"}
          alignItems="center"
          borderRadius={"50%"}
          width={"60px"}
          height="60px"
        >
          {/* for Details */}
          <Text margin="0px" fontWeight={"bold"}>
            Profile
          </Text>
        </Flex>

        <Flex
          border={currentStep >= 2 ? "1px solid #3182ce" : "1px solid black"}
          borderRight="none"
          borderLeft="none"
          background={currentStep >= 2 ? "#3182ce" : "#000"}
          width={"40%"}
          height="0px"
        >
          {/* for line2 */}
        </Flex>

        <Flex
          onClick={() => setCurrentStep(2)}
          cursor={"pointer"}
          color={currentStep >= 2 ? "#fff" : "#000"}
          border={currentStep >= 2 ? "1px solid #3182ce" : "1px solid black"}
          background={currentStep >= 2 ? "#3182ce" : "white"}
          borderColor={currentStep >= 2 ? "#3182ce" : "#000"}
          justifyContent={"center"}
          alignItems="center"
          borderRadius={"50%"}
          width={"60px"}
          height="60px"
        >
          {/* visibility */}
          <Text margin="0px" fontWeight={"bold"}>
            Info
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WizardcurrentStep;
