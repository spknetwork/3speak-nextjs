//TODO: to make a separate map component 
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
import UpperCard from "./UpperCard";

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
       <UpperCard 
        key={index}
        title={item.title}
        number={item.number}
        icon={item.icon}
        color={item.color}
       />
      ))}
    </Flex>
  );
};

export default UpperCards;
