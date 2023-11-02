import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleAuth = ({googlelogin, label}:any) => {
  return (
    <Button
      width={"100%"}
      variant={"outline"}
      colorScheme="gray"
      onClick={() => googlelogin()}
    >
      <FcGoogle size={'20px'} /> <Text marginLeft={'10px'} marginBottom='0px'>{label}</Text>
    </Button>
  )
}

export default GoogleAuth