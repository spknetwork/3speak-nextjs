import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Card,
  CardBody,
  Flex,
  useColorMode,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaVideo, FaUsers, FaRegEye } from "react-icons/fa";
import { useAppStore } from "@/lib/store";

type Props = {};

const UpperCards = (props: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.100");

  const { news, video_count, followers_count, views_count } = useAppStore();

  const [mVideoCount, setMVideoCount] = useState<Number>(0);
  const [mFollowersCount, setMFollowersCount] = useState<Number>();
  const [mViewsCount, setMViewsCount] = useState<Number>();

  const data = [
    {
      id: 1,
      title: "UPLOADED VIDEOS",
      number: mVideoCount,
      icon: FaVideo,
      color: "#4e73df",
    },
    {
      id: 2,
      title: "FOLLOWER",
      number: mFollowersCount,
      icon: FaUsers,
      color: "green",
    },
    {
      id: 1,
      title: "VIEWS",
      number: mViewsCount,
      icon: FaRegEye,
      color: "white",
    },
  ];

  // get total videos
  useEffect(() => {
    setMVideoCount(video_count);
  }, [video_count]);

  // get total followers
  useEffect(() => {
    setMFollowersCount(followers_count);
  }, [followers_count]);

  // get total views count
  useEffect(() => {
    setMViewsCount(views_count);
  }, [views_count]);

  return (
    <Flex
      flexWrap="wrap"
      flexDirection={{ sm: "column", md: "column", lg: "row" }}
    >
      {data.map((item, index) => (
        <Box
          key={index}
          width={"100%"}
          position="relative"
          paddingRight={"0.75rem"}
          paddingLeft={"0.75rem"}
          flex={"0 0 33.33333%"}
          marginTop=".5rem !important"
          maxWidth={{ sm: "100%", md: "100%", lg: "33.33333%" }}
        >
          {/* mapping from here */}
          <Card
            borderLeft={`0.25rem solid ${item.color} !important`}
            paddingBottom="0.5rem !important"
            paddingTop={"0.5rem !important"}
            boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
            bgColor={colorMode === "dark" ? "#222731" : "gray.50"}
          >
            <CardBody>
              <Flex flexWrap={"wrap"} alignItems="center">
                <Box
                  width={"100%"}
                  marginRight="0.5rem !important"
                  flexBasis={"0"}
                  flexGrow="1"
                  maxWidth={"100%"}
                >
                  <Text
                    fontSize={"1rem"}
                    color="#4e73df !important"
                    fontWeight={"700 !important"}
                    textTransform="uppercase"
                    marginBottom={"0.25rem !important"}
                  >
                    {item.title}
                  </Text>
                  <Text
                    as={"h5"}
                    color={
                      colorMode === "dark"
                        ? "white !important"
                        : "black !important"
                    }
                    fontWeight={"700 !important"}
                    marginBottom="0 !important"
                    fontSize={"1.25rem"}
                    lineHeight="1.2"
                  >
                    <>{mVideoCount}</>
                  </Text>
                </Box>
                <Box
                  width={"auto"}
                  flex="0 0 auto"
                  maxWidth={"100%"}
                  fontWeight={"900"}
                >
                  <Icon
                    as={item.icon}
                    color="#dddfeb !important"
                    fontWeight={"900"}
                    fontSize="2em"
                  />
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </Box>
      ))}
    </Flex>
  );
};

export default UpperCards;
