import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
//TODO: make the progress bar buttons clickable
type props = {
  bgColor: string
  toggleDetails: () => boolean
}
const WizardSteps = ({changeCurrentStep, steps, bgColor, toggleDetails }:any) => {
  return (
    <Box
    borderRadius={"10px"}
    backgroundColor={bgColor}
    marginTop={"10px"}
    height={"auto"}
    width={"100%"}
    boxShadow={"0px 0px 2px 2px lightblue"}
  >
    <Flex
      height={"119px"}
      justifyContent={"center"}
      alignItems="center"
      paddingX={"30px"}
      flexDirection="row"
    >
      <Flex
        onClick={() => changeCurrentStep(0)}
        cursor={"pointer"}
        border="none"
        color={steps == 0 ? "#fff" : "white"}
        background="#1DA1F2"
        borderColor={"#1DA1F2"}
        justifyContent={"center"}
        alignItems="center"
        borderRadius={"50%"}
        width={"60px"}
        height="60px"
      >
        {/* for upload */}
        <Text margin='0px' fontWeight={"bold"}>Upload</Text>
      </Flex>

      {/* border={'1px solid black'} */}
      <Flex
        border={steps > 0 ? "1px solid #1DA1F2" : "1px solid black"}
        borderRight='none'
        borderLeft='none'
        background={steps > 0 ? "#1DA1F2" : "#000"}
        width={"45%"}
        height="3px"
      >
        {/* for line1 */}
      </Flex>

      <Flex
        onClick={() => changeCurrentStep(1)}
        cursor={"pointer"}
        border={steps > 0 ? "1px solid #fff" : "1px solid #fff"}
        color={steps > 0 ? "#fff" : "#000"}
        background={steps > 0 ? "#1DA1F2" : "#fff"}
        borderColor={steps > 0 ? "#1DA1F2" : "#000"}
        justifyContent={"center"}
        alignItems="center"
        borderRadius={"50%"}
        width={"60px"}
        height="60px"
      >
        {/* for Details */}
        <Text margin='0px' fontWeight={"bold"}  onClick={toggleDetails}>Details</Text>
      </Flex>

      <Flex
        border={
          steps == 2 ? "1px solid #1DA1F2" : "1px solid black"
        }
        borderRight='none'
        borderLeft='none'
        background={steps == 2 ? "#1DA1F2" : "#000"}
        width={"45%"}
        height="3px"
      >
        {/* for line2 */}
      </Flex>

      <Flex
        onClick={() => changeCurrentStep(2)}
        cursor={"pointer"}
        border={
          steps == 2 ? "1px solid #1DA1F2" : "1px solid black"
        }
        color={steps == 2 ? "#fff" : "#000"}
        background={steps == 2 ? "#1DA1F2" : "white"}
        borderColor={steps == 2 ? "#1DA1F2" : "#000"}
        justifyContent={"center"}
        alignItems="center"
        borderRadius={"50%"}
        width={"60px"}
        height="60px"
      >
        {/* visibility */}
        <Text margin='0px' fontWeight={"bold"}>Visibility</Text>
      </Flex>
    </Flex>
  </Box>
  )
}

export default WizardSteps