import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const FirstTime = () => {
  const [videos, setVideos] = useState([
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
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVfJRLvVE5BvTWSaKDuG2V5WY8voUDnYRYyQCQ2mP5vrsECF8CejKSNS4BouWcu7EZSrWtZ2EA?format=jpeg&mode=cover&width=340&height=191",
    },
    {
      title:
        "The new update of LIKETU 📱 (subtitled) - Conoce la nueva actualización de LIKETU",
      username: " hiveredcarpet",
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjViUUPgY24GUYeConGrus7C4UPGS2f5LkMjMShfeap5qDU7Guy2DR83RwGUsHZrU28PNmuwEuc?format=jpeg&mode=cover&width=340&height=191",
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
  ]);
  return (
    <Box>
      <Box backgroundColor={"#E8E8E8"} padding="20px">
        <Text as="h1" fontWeight={"300 !important"}>
          FIRST TIME UPLOADS
        </Text>
      </Box>
      <Grid padding={"20px"} templateColumns="repeat(4, 1fr)" gap={6}>
        {/* {videos.length} */}
        {videos.map((video, index) => (
          <GridItem w="100%" h="100%" key={index}>
            <Image padding={'5px'} backgroundColor={'#222 !important'} alt="test" src={`${video.thumbnail}`} />
            <Text fontSize={'13px'} fontWeight={"bold"} marginY={"10px"} as="h3">
              {video.title}
            </Text>
            <Text fontWeight={"bold"} marginTop={"10px"} as="h3">
              {video.username}
            </Text>
            <Text as="p">a day ago</Text>
            <Text fontWeight={"bold"} as="p">
              $ 10.10
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default FirstTime;
