import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import OBWizardSteps from "../../components/onboarding/OBWizardSteps";
import Username from "../../components/onboarding/username";
import Profile from "../../components/onboarding/profile";
import Details from "../../components/onboarding/details";

type Props = {};

const Index = (props: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [alert, showAlert] = useState(false)
  /**
   * function for handling the previous step
   */
  const handlePrevious = () => {
    if(currentStep > 0){
        setCurrentStep(currentStep - 1)
    }
  };

  /**
   * function for handling the next step
   */
  const handleNext = () => {
    if(currentStep === 0){
        
    }
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * hook state for empty user validation   
   */
  const [name, setName] = useState<string>("");

  return (
    <Box position={"relative"}>
      <Box maxH={"70vh"}>
        {currentStep === 0 && <Username currentStep={currentStep} setCurrentStep={setCurrentStep} name={name} setName={setName} />}
        {currentStep === 1 && <Profile currentStep={currentStep} setCurrentStep={setCurrentStep}/>}
        {currentStep === 2 && <Details currentStep={currentStep} setCurrentStep={setCurrentStep}/>}
      </Box>
      <Flex mx={8} justifyContent={"space-between"}>
        <Button size={"lg"} colorScheme="blue" onClick={handlePrevious}>
          Go Back
        </Button>
        <Button size={"lg"} colorScheme="blue" onClick={handleNext} isDisabled={!name}>
          Next
        </Button>
      </Flex>
      <OBWizardSteps
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />
    </Box>
  );
};

export default Index;
