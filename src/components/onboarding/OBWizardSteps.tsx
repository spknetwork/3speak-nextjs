import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import styles from "../../styles/pages/onboarding/wizard.module.scss"


const WizardSteps = ({changeCurrentStep, steps }:any) => {
  return (
    <Box
    className={styles.parent_container}
    borderRadius={"10px"}
    background="white"
    marginTop={"10px"}
    height={"auto"}
    width={"100%"}
    // backgroundColor={"green"}

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
        background="#3182ce"
        borderColor={"#3182ce"}
        justifyContent={"center"}
        alignItems="center"
        borderRadius={"50%"}
        width={"60px"}
        height="60px"
      >
        {/* for upload */}
        <Text margin='0px' fontWeight={"bold"}>Name</Text>
      </Flex>

      {/* border={'1px solid black'} */}
      <Flex
        border={steps > 0 ? "1px solid #3182ce" : "1px solid black"}
        borderRight='none'
        borderLeft='none'
        background={steps > 0 ? "#3182ce" : "#000"}
        width={"35%"}
        height="0px"
      >
        {/* for line1 */}
      </Flex>

      <Flex
        onClick={() => changeCurrentStep(1)}
        cursor={"pointer"}
        border={steps > 0 ? "1px solid #fff" : "1px solid #fff"}
        color={steps > 0 ? "#fff" : "#000"}
        background={steps > 0 ? "#3182ce" : "#fff"}
        borderColor={steps > 0 ? "#3182ce" : "#000"}
        justifyContent={"center"}
        alignItems="center"
        borderRadius={"50%"}
        width={"60px"}
        height="60px"
      >
        {/* for Details */}
        <Text margin='0px' fontWeight={"bold"}>Profile</Text>
      </Flex>

      <Flex
        border={
          steps >= 2 ? "1px solid #3182ce" : "1px solid black"
        }
        borderRight='none'
        borderLeft='none'
        background={steps >= 2 ? "#3182ce" : "#000"}
        width={"40%"}
        height="0px"
      >
        {/* for line2 */}
      </Flex>

      

      <Flex
        onClick={() => changeCurrentStep(2)}
        cursor={"pointer"}
        border={
          steps >= 2 ? "1px solid #3182ce" : "1px solid black"
        }
        color={steps>= 2 ? "#fff" : "#000"}
        background={steps >= 2 ? "#3182ce" : "white"}
        borderColor={steps >= 2 ? "#3182ce" : "#000"}
        justifyContent={"center"}
        alignItems="center"
        borderRadius={"50%"}
        width={"60px"}
        height="60px"
      >
        {/* visibility */}
        <Text margin='0px' fontWeight={"bold"}>Info</Text>
      </Flex>
    </Flex>
  </Box>
  )
}

export default WizardSteps