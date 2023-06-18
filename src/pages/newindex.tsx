import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const NewIndex = () => {
  const [videos, setVideos] = useState([
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVhbanMFk5er56wJNKwfE3rStTxniLoi63EGuN92bNwmqSJsyv8yGdUJuh8CPqBoU6tbR6J6sp?format=jpeg&mode=cover&width=340&height=191",
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
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVgZaMRabaAELnZMcYoFGd71EwB2hzHtXt57PoZrmSDKQxqYVMgBjy3ZHngJkoQ7cVtWGUEHEe?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVfJBetiVfwB7dZwaXhwXoaBMEu9JTMDhAgXVdz2zYkMY2bMV5R2Qi5AZgFdjegBdwoCEx8jgA?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVvSkNxnSMUpeVjgovvzHnkc6a7kR4wVovMoBxSPe1DfyRbAsEyZRSXwB2cyDh8UfPzkEZTAVc?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVcNES7v9m1ZXhJYEGTYo9jWDAiUWWZDzkyn67RQsJe7hb4vi5oJvDynLxkKAXjMsv4UePbAyk?format=jpeg&mode=cover&width=340&height=191",
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
    <Box>
      <Box height={"20px"} backgroundColor={"#E8E8E8"} padding="20px"></Box>
      <Grid
        padding={"20px"}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
        gap={6}
      >
        {/* {videos.length} */}
        {videos.map((video, index) => (
          <GridItem w="100%" h="100%" key={index}>
            <Image
              padding={"5px"}
              backgroundColor={"#222 !important"}
              alt="test"
              src={`${video.thumbnail}`}
            />
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
  );
};

export default NewIndex;
