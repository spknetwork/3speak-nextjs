import { Box, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { MdPlayArrow } from "react-icons/md";

const Video = ({ videoSrc }: any) => {
  return (
    <Box w="100%" bg="white.500" color={"black"} marginBottom="3rem">
      <Box
        cursor={'pointer'}
        float="left"
        w="calc(136px * 1.25)"
        height="calc(77px * 1.25)"
        bg="white.500"
        color={"black"}
        marginRight="6px"
        position={"relative"}
      >
        <Box
          display={'flex'}
          justifyContent='center'
          alignItems={'center'}
          position={"absolute"}
          bottom="5px"
          color={"#000"}
          fontSize="11px"
          fontWeight={"500"}
          left="5px"
          background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
          borderRadius="2px"
          paddingLeft={"4px"}
          paddingRight={"8px"}
        >
          <MdPlayArrow size='18px' color="grey" />
          <Text as='span' marginLeft={'2px'} fontSize='11px' fontWeight={'bold'}>12</Text>
        </Box>
        <Box
          position={"absolute"}
          bottom="5px"
          color={"#000"}
          fontSize="11px"
          fontWeight={"bold"}
          right="5px"
          background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
          borderRadius="2px"
          padding={"0px 6px"}
        >
          01:19
        </Box>
        <Image
          borderRadius={"8px"}
          objectFit="cover"
          width="100%"
          height="inherit"
          src={videoSrc}
          alt="Dan Abramov"
        />
      </Box>
      <Box bg="white.500" color={"black"}>
        <Box
          marginBottom="5px"
          lineHeight="17px"
          bg="white.500"
          color={"black"}
        >
          <Link
            fontSize="13px"
            fontWeight={"600"}
            cursor="pointer"
            transition={"all 0.2s"}
          >
            (Eng/Esp)🔴¡VIVIR EN EL PASADO TE HACE DAÑO! Despabila
          </Link>
        </Box>
        <Box
          marginBottom="5px"
          lineHeight="17px"
          bg="white.500"
          color={"black"}
        >
          <Link
            fontSize="11px"
            fontWeight={"500"}
            cursor="pointer"
            transition={"all 0.2s"}
          >
            stellamartinez
          </Link>
        </Box>
        <Box
          marginBottom="5px"
          lineHeight="17px"
          bg="white.500"
          color={"#acacac"}
        >
          <Link
            fontSize="10px"
            fontWeight={"bolder"}
            cursor="pointer"
            transition={"all 0.2s"}
          >
            stellamartinez
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Video;
