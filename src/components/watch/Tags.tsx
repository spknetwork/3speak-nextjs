import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

const Tags = () => {
  return (
    <Box
      display={"flex"}
      flexWrap="wrap"
      flexDirection={"row"}
      marginBottom={"0.5rem"}
    >
      <Box>
        <Link href="#" color={"blue"} display={"inline-block"}>
          #onlinehotelbookingmanagementsystem&nbsp;
        </Link>
      </Box>
      <Box>
        <Link href="#" color={"blue"} display={"inline-block"}>
          #system&nbsp;
        </Link>
      </Box>
      <Box>
        <Link href="#" color={"blue"} display={"inline-block"}>
          #3speakspeaking
        </Link>
      </Box>
    </Box>
  );
};

export default Tags;
