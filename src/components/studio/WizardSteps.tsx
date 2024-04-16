import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  bgColor: string;
  currentStep: number;
  changeCurrentStep: (step: number) => void;
  colorMode: string
};



const WizardSteps = ({
  changeCurrentStep,
  currentStep,
  bgColor,
  colorMode
}: Props) => {
  const steps = ['Upload', 'Details', 'Community', 'Visibility'];

  return (
    <Flex w='full' justifyContent={'center'}>
    <Box
      borderRadius="10px"
      backgroundColor={bgColor}
      marginTop="10px"
      height="auto"
      width="98%"
      boxShadow={`0px 0px 1px 1px ${colorMode === "dark" ? "#3f444e" : "black"}`}
      >
      <Flex
        height="119px"
        justifyContent="center"
        alignItems="center"
        paddingX="30px"
        flexDirection="row"
        >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Flex
              onClick={() => changeCurrentStep(index)}
              cursor="pointer"
              border={currentStep === index ? '1px solid #fff' : '1px solid #000'}
              color={currentStep === index ? '#fff' : '#000'}
              background={currentStep >= index ? '#1DA1F2' : '#fff'}
              borderColor={currentStep >= index ? '#1DA1F2' : '#000'}
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              width="80px"
              height="60px"
              >
              <Text margin="0px" fontWeight="bold">
                {step}
              </Text>
            </Flex>
            {index < steps.length - 1 && (
              <Flex
                border={currentStep > index ? '1px solid #1DA1F2' : '1px solid black'}
                borderRight="none"
                borderLeft="none"
                background={currentStep > index ? '#1DA1F2' : 'white'}
                width="25%"
                height="3px"
                />
                )}
          </React.Fragment>
        ))}
      </Flex>
    </Box>
</Flex>
  );
};

export default WizardSteps;