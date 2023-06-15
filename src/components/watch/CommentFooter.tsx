import { Avatar, Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaCommentAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa";
const CommentFooter = () => {
  const [comment, setComment] = useState(false);

  const showComment = () => {
    setComment(true);
  };
  const hideComment = () => {
    setComment(false);
  };
  return (
    <Box>
      <Box display={"flex"} alignItems="center" flexFlow={"row nowrap"}>
        <Box
          margin={"3px 4px 4px -4px"}
          padding="0"
          alignItems={"center"}
          display="flex"
          flexDirection={"row"}
        >
          <Box marginRight={"5px"}>
            <Flex
              marginLeft={"5px"}
              justifyContent={"center"}
              alignItems="center"
              color={"black"}
            >
              {/* <Button variant="outline"> */}
              <FaRegThumbsUp />
              <Text
                color={"#1A1A1B"}
                margin="4px"
                marginBottom={"0px"}
                width={"auto"}
                lineHeight="15px"
                textAlign={"center"}
                fontSize="12px"
                fontWeight={"700"}
                pointerEvents="none"
                wordBreak={"normal"}
              >
                1000
              </Text>
              {/* </Button> */}
            </Flex>
          </Box>

          <Flex
            marginLeft={"5px"}
            justifyContent={"center"}
            alignItems="center"
            color={"black"}
          >
            {/* <Button variant="outline"> */}
            <FaRegThumbsDown /> <Text marginLeft={"5px"}> Dislike</Text>
            {/* </Button> */}
          </Flex>
        </Box>

        <Box
          margin={"0px 0 0 5px"}
          alignItems={"center"}
          display="flex"
          flexDirection={"row"}
          fontSize="12px"
          fontWeight={"700"}
          lineHeight="16px"
        >
          {/* <Button color={"black"} variant="outline">
                        Reply
                      </Button> */}
          <Box color={"black"} marginLeft={"5px"}>
            <Flex
              cursor={"pointer"}
              onClick={showComment}
              justifyContent={"center"}
              alignItems="center"
            >
              {/* <Button onClick={showComment} variant="outline"> */}
              <FaCommentAlt /> <Text marginLeft={"3px"}>Comments</Text>
              {/* </Button> */}
            </Flex>
          </Box>
          {/* <Flex>
                        <FaCommentAlt  />{" "}
                        <Text color={'black'} >
                          Comments
                        </Text>
                      </Flex> */}
          <Box color={"black"} marginLeft={"10px"}>
            <Flex justifyContent={"center"} alignItems="center">
              {/* <Button variant="outline"> */}
              <FaShare /> <Text marginLeft={"3px"}>Share</Text>
              {/* </Button> */}
            </Flex>
          </Box>
          {/* <Button color={"black"} variant="outline">
                        ...
                      </Button> */}
        </Box>
      </Box>
      {comment && (
        <Box marginTop={"10px"}>
          <Flex>
            <Box alignSelf={"flex-start"} marginRight="20px">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </Box>
            <Box width={"100%"}>
              <Flex flexDirection={"column"}>
                <Textarea
                  width={"100%"}
                  color="black"
                  placeholder="Add comment"
                />
                <Flex
                  marginTop={"10px"}
                  justifyContent="end"
                  alignItems={"center"}
                >
                  <Button
                    onClick={hideComment}
                    colorScheme="gray"
                    color={"black"}
                    marginRight={"10px"}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="messenger">Comment</Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CommentFooter;
