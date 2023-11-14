import { Box, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { VideoInterface } from 'types'
const VideoComponent: React.FC<VideoInterface> = ({ title, thumbnail, username, number_views, index }) => {
    return (
        <Box key={index} className="col-xl-2 col-lg-3  col-6 p-2 mb-3">
            <Box
                opacity={"1"}
                position="relative"
                transition={"all .6s ease-in-out"}
                textAlign="center"
            >
                <Box
                    left={"5px"}
                    width="50px"
                    background={"#e8e8e8 none repeat scroll 0 0"}
                    borderRadius="2px"
                    bottom={"5px"}
                    color="#000"
                    fontSize={"11px"}
                    fontWeight="500"
                    padding={"0 6px"}
                    position="absolute"
                    display="flex"
                    justifyContent={"space-between"}
                >
                    <Image
                        src="https://3speak.tv/img/play.svg"
                        alt="play"
                    ></Image>
                    <Text as={"span"}>20</Text>
                </Box>
                <Box
                    right={"5px"}
                    width="auto"
                    background={"#e8e8e8 none repeat scroll 0 0"}
                    borderRadius="2px"
                    bottom={"5px"}
                    color="#000"
                    fontSize={"11px"}
                    fontWeight="500"
                    padding={"0 6px"}
                    position="absolute"
                    display="flex"
                    justifyContent={"space-between"}
                >
                    <Text as={"span"}>12:48</Text>
                </Box>
                <Link href="https://3speak.tv/watch?v=cttpodcast/zjvcobqa">
                    <Image
                        className="img-fluid"
                        borderColor={"transparent!important"}
                        background="linear-gradient(135deg,#171b20 1%,#343a40 100%)"
                        width={"100% !important"}
                        padding="5px"
                        maxHeight={"200px"}
                        height="auto"
                        objectFit="cover"
                        src={`${thumbnail}`}
                        alt="Dan Abramov"
                    />
                </Link>
            </Box>
            <Box minHeight={"65px"}>
                <Link
                    textDecoration={"none"}
                    href={`/watch?v=${username}`}
                >
                    <Text
                        textDecoration={"none"}
                        fontSize={"13px"}
                        overflowWrap="break-word"
                        textOverflow={"ellipsis"}
                        overflow="hidden"
                        maxHeight={"2.8em"}
                        lineHeight="1.4em"
                        display={"block"}
                        marginTop="0.5rem !important"
                        marginBottom="0.5rem !important"
                        fontWeight={"500"}
                    >
                        {title}
                    </Text>
                </Link>
                <Box
                    width={"calc( 100% - 1rem )"}
                    display="block"
                    position={"unset"}
                >
                    <Box
                        display={"block !important"}
                        marginTop="0.5rem !important"
                        justifyContent={"justify !important"}
                    >
                        <p className="black_col mb-0">
                            <b>
                                <Link href="/user/cttpodcast">
                                    <i className="fa fa-user"></i>
                                    {username}
                                </Link>
                            </b>
                        </p>
                        <p className="mb-0">a day ago</p>
                        <p>
                            <b>$63.17</b>
                        </p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default VideoComponent