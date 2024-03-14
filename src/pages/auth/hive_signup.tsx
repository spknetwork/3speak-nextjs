import AuthLayout from '@/components/Layouts/auth_layout';
import HiveSignUpComponent from '@/components/hive_signup/HiveSignUpComponent';
import { Flex, useColorMode } from '@chakra-ui/react'
import * as Tabs from "@radix-ui/react-tabs";
import React, { useEffect } from 'react'


const HiveSIgnUp = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode == 'dark') {
      toggleColorMode()
    }
  },[colorMode, toggleColorMode])
  return (
    <AuthLayout>
      <Flex
        justifyContent="center"
        alignItems={{ _: "flex-start", tablet: "flex-start" }}
        backgroundColor="#F5F5F5"
      >
        <Tabs.Content className="TabsContent w-100" value={'tab4'}>
          <HiveSignUpComponent />
        </Tabs.Content>
      </Flex>
    </AuthLayout>

  )
}

export default HiveSIgnUp