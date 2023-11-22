import { Flex } from '@chakra-ui/react'
import * as Tabs from "@radix-ui/react-tabs";
import React from 'react'


const HiveSIgnUp = () => {
  return (
    <Flex
      justifyContent="center"
      px="1rem"
      py="1rem"
      alignItems={{ _: "flex-start", tablet: "flex-start" }}
      backgroundColor="#F5F5F5"
    >
      <Tabs.Content className="TabsContent w-100" value={'tab4'}>
        
      </Tabs.Content>
    </Flex>
  )
}

export default HiveSIgnUp