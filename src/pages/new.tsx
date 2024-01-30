import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Box, Flex, Grid, GridItem, Image, Switch, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { VideoInterface } from "types";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MainLayout from "@/components/Layouts/main_layout";
const New2 = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const { colorMode, toggleColorMode } = useColorMode();
  const [videos, setVideos] = useState<VideoInterface[]>([
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVeExQngEq7iRUrnhc6nn53bkCVBsgFpHS7MyjhEFTNWBf73wdgVAiYs1bRwEXPsRfwGEUec54?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbG93Si1Pof3Bp3SEoYnPNKtbHG2hmqSDhp9WVT7QEboptYxvDofQRog5ZtF2Mj6QXAxsbNPp?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbFfGR7ZUTupbsAmkiGxmsGFMazc7fs8C9Da6r49Va7sXUUxwEpMs9Lp8kLufQoT7nHCojSg6?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVb4dHDxLG1Fefpe4k4AmqEgewJw6TMbjKkXmd6EpNKDDSY7jajEbHFUDkuNFFGj3QHTXGgwi6?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVeUe5z9NZYeLaAjAAD5cJkxV4PRBZnpDR1KknD4EJbrmG3Q9yNQgcEncQJwMeScuZQCF964RC?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVigXNQ9i2Sj17Sn3n278qQDgwZjFj63SVyowrUwLLy3b4XjctSSXPrUQzfGWnYFenbacvxXNn?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVwVwkncjGuS3rGBYn5aS66yk9ripBpXdrZC3PDze6nrQmCgcnqLVtF7dmTz85o6rdCJk8XgTG?format=jpeg&mode=cover&width=340&height=191",
    },
  ]);
  return (
    <MainLayout>
      <Box bg={bgColor} >

        <Flex marginRight={'30px'} justifyContent={'space-between'} alignItems='center'>
          <Box padding="20px">
            <Text as="h1" fontWeight={"300 !important"}>
              NEW VIDEOS
            </Text>
          </Box>
          <Text>
            <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} /> {colorMode === 'dark' && (<MoonIcon />)} {colorMode !== 'dark' && (<SunIcon />)}
          </Text>

        </Flex>
        <Grid padding={"20px"} templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(5, 1fr)",
        }} gap={10}>
          {/* {videos.length} */}
          {videos.map((video: VideoInterface, index: number) => (
            <GridItem w="100%" h="100%" key={index}>
              <Box height="13em !important"
                width="100% !important">
                <Image
                  height="100% !important"
                  width="100% !important"
                  borderRadius={'10px'}
                  objectFit="cover"
                  alt="test"
                  src={`${video.thumbnail}`}
                />
              </Box>

              <VideosTitle title={`${video.title}`} />
              <Name username={`${video.username}`} />
              <Text as="p" margin={"1px"}>
                a day ago
              </Text>
              <Text fontWeight={"bold"} as="p">
                $ 10.10
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default New2;
