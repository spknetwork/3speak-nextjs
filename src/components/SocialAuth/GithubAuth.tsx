import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { BsGithub } from 'react-icons/bs'

const GithubAuth = ({ githublogin, label }: any) => {
    return (
        <Button
            width={"100%"}
            variant={"outline"}
            colorScheme="gray"
            onClick={() => githublogin()}
        >
            <BsGithub size={'20px'} /> <Text marginLeft={'10px'} marginBottom='0px'>{label}</Text>
        </Button>
    )
}

export default GithubAuth