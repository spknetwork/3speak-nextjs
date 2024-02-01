import AuthLayout from '@/components/Layouts/auth_layout';
import HiveSignUpComponent from '@/components/hive_signup/HiveSignUpComponent';
import { Flex } from '@chakra-ui/react'
import * as Tabs from "@radix-ui/react-tabs";
import React from 'react'


const HiveSIgnUp = () => {
  return (
    <AuthLayout>
      <Flex
        justifyContent="center"
        px="1rem"
        py="1rem"
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