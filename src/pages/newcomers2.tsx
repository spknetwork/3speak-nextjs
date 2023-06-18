import Name from "@/components/user/Name";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React, { useState } from "react";

const NewComers2 = () => {
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
      <Box backgroundColor={"#E8E8E8"} padding="20px" paddingBottom={'0px'}>
        <Text as="h1" fontWeight={"200 !important"}>
          TRENDING VIDEOS
        </Text>
      </Box>
      <Grid
        padding={"20px"}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={4}
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
            <Text
             
              css={css`
                font-weight: bold;
                font-size: 13px;
                overflow-wrap: break-word;
                text-overflow: ellipsis;
                word-wrap: break-word;
                overflow: hidden;
                max-height: 2.8em;
                margin-top: 0.5rem !important;
                margin-bottom: 0.5rem;
                line-height: 1.4em;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              `}
              fontSize={"13px"}
              fontWeight={"bold"}
              marginY={"10px"}
              as="h3"
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              maxHeight={"6.8rem"}
              overflowWrap={"break-word"}
            >
              {video.title}
            </Text>
            <Name username={`${video.username}`} />
            <Text as="p" margin={'1px'}>a day ago</Text>
            <Text fontWeight={"bold"} as="p">
              $ 10.10
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default NewComers2;
