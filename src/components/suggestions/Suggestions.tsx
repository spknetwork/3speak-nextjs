import React from "react";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import FeedGridItem from "../feedgrid/FeedGridItem";

type Props = {
  videos: any;
  bgColor: string;
  colorMode: string;
  author: string;
  permlink: string;
};
const Suggestions = ({
  videos,
  bgColor,
  colorMode,
  author,
  permlink,
}: Props) => {
  return (
    <Box
      w={{ base: "100%", md: "100%", lg: "100%" }}
      backgroundColor={bgColor}
      color={colorMode === "dark" ? "white" : "black"}
      marginTop="15px"
      borderRadius={4}
      boxShadow="base"
      marginLeft={"10px"}
      paddingTop="10px"
      paddingX={"10px"}
      paddingRight="25px"
      maxWidth={["100%", "75%", "50%", "25%"]}
    >
      <Box margin={"15px"}>
        <Text
          as="h2"
          fontWeight={"bolder"}
          lineHeight="1.2"
          fontSize={"1.5rem"}
        >
          Suggested video you may like
        </Text>
      </Box>
      <Grid
        display={{
          base: "inline-table",
          md: "inline-table",
          lg: "inline-table",
        }}
        templateColumns="repeat(1, 1fr)"
        gap={4}
      >
        {videos.map((video: any, index: number) => (
          <FeedGridItem video={video} key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default Suggestions;
