import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { useRouter } from "next/router";
import { BiDollar } from "react-icons/bi";
import { useAppStore } from "@/lib/store";

const Video = ({ video, videoSrc, number_views, bgColor, colorMode }: any) => {

    const router = useRouter();
    const { setVideo, video: videoSelected } = useAppStore();
  
    const setVideoDetails = (video:any) => {
      console.log("video",video)
      setVideo(video)
      router.push("/watch?username="+video.author.username+"&v="+video.permlink)
    }

  return (
    <Box
      w="100%"
      bgColor={bgColor}
      color={colorMode === "dark" ? "white" : "black"}
      marginBottom="3rem"
      onClick={() => setVideoDetails(video)}
    >
      {/* cursor={'pointer'} */}
      <Box
        id="parent"
        cursor={"pointer"}
        float="left"
        w="calc(136px * 1.25)"
        height="calc(77px * 1.25)"
        bgColor={bgColor}
        color={colorMode === "dark" ? "white" : "black"}
        marginRight="6px"
        position={"relative"}
      >
        <Flex id="widget" position={"absolute"} left={0} bottom={1}>
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            bottom="5px"
            color="black"
            fontSize="11px"
            fontWeight={"500"}
            left="1px"
            background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
            borderRadius="2px"
            paddingRight={"2px"}
            paddingLeft={"2px"}
            marginX={2}
          >
            <MdPlayArrow size="15px" color="grey" />
            <Text
              as="span"
              marginLeft={"2px"}
              fontSize="11px"
              fontWeight={"bold"}
            >
              {number_views}
            </Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            color="black"
            fontSize="11px"
            fontWeight={"500"}
            background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
            borderRadius="2px"
            paddingLeft={"2px"}
            paddingRight={"2px"}
            marginX={2}
          >
            <BiDollar size="12px" color="grey" />
            <Text as="span" fontSize="11px" fontWeight={"bold"}>
              10.0
            </Text>
          </Box>
        </Flex>
        <Box
          id="timestamp"
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
        <Box lineHeight="17px" bg="white.500" color={"black"}>
          {/* textDecor={'none !important'} */}
          <Link
            fontSize="13px"
            fontWeight={"600"}
            cursor="pointer"
            transition={"all 0.2s"}
            color={colorMode === "dark" ? "white" : "black"}
            textDecor={"none !important"}
          >
            (Eng/Esp)🔴¡VIVIR EN EL PASADO TE HACE DAÑO! Despabila
          </Link>
        </Box>
        <Box
          lineHeight="17px"
          bg="white.500"
          color={colorMode === "dark" ? "white" : "black"}
        >
          {/* <BsDot /> */}
          <Link
            paddingLeft={1}
            fontSize="9px"
            fontWeight={"bolder"}
            cursor="pointer"
            transition={"all 0.2s"}
            textDecor={"none !important"}
          >
            1 month ago
          </Link>
          <br />
          <Link
            paddingLeft={1}
            textDecor={"none !important"}
            fontSize="14px"
            fontWeight={"500"}
            cursor="pointer"
            transition={"all 0.2s"}
          >
            stellamartinez
          </Link>
        </Box>
        <Box lineHeight="17px" bg="white.500" color={"#acacac"}></Box>
        {/* <Box
          lineHeight="17px"
          bg="white.500"
          color={colorMode === "dark" ? "white" : "black"}
        >
          <Link
            textDecor={"none !important"}
            fontSize="11px"
            fontWeight={"bold"}
            cursor="pointer"
            transition={"all 0.2s"}
          >
            $10.00
          </Link>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Video;
