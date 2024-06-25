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
      boxShadow={"0px 0px 4px gray"}
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
              border={currentStep === index ? '1px solid #7a7b7d' : '1px solid #7a7b7d'}
              color={currentStep === index ? '#fff' : '#000'}
              background={currentStep >= index ? '#1DA1F2' : '#fff'}
              borderColor={currentStep >= index ? '#7a7b7d' : '#7a7b7d'}
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              width="80px"
              height="60px"
              boxShadow={"base"}
              >
              <Text margin="0px" fontWeight="bold">
                {step}
              </Text>
            </Flex>
            {index < steps.length - 1 && (
              <Flex
                border={currentStep > index ? '1px solid #1A94DA' : '1px solid #7a7b7d'}
                borderRight="none"
                borderLeft="none"
                background={currentStep > index ? '#1A94DA' : 'white'}
                width="25%"
                height="5px"
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