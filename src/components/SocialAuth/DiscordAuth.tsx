import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { BsDiscord } from 'react-icons/bs'

const DiscordAuth = ({ discordlogin, label }: any) => {
    return (
        <Button
            width={"100%"}
            variant={"outline"}
            colorScheme="gray"
            onClick={() => discordlogin()}
        >
            <BsDiscord size={'20px'} /> <Text marginLeft={'10px'} marginBottom='0px'>{label}</Text>
        </Button>
    )
}

export default DiscordAuth