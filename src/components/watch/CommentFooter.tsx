//TODO: make this downvots upvote and reply functional
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
import { BiComment, BiShare } from "react-icons/bi";
import { ProfileInterface } from "types";
import { useGetMyQuery } from "@/hooks/getUserDetails";

type Props = {
  bgColor: string;
  colorMode: string;
  commentId: string;
  toggleCollapse: (key: string) => void;
  isCollapsed: { [key: number]: boolean };
};
const CommentFooter = (props: Props) => {
  const [comment, setComment] = useState(false);

  const showComment = () => {
    setComment(true);
  };
  const hideComment = () => {
    setComment(false);
  };

  const getUserProfile: ProfileInterface = useGetMyQuery()?.profile;

  return (
    <Box>
      <Box display={"flex"} alignItems="center" flexFlow={"row nowrap"}>
        <Flex alignItems={"center"}>
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
                color={props.colorMode === "dark" ? "white" : "black"}
              >
                {/* <Button variant="outline"> */}
                <FaRegThumbsUp />
                <Text
                  color={props.colorMode === "dark" ? "white" : "black"}
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
              color={props.colorMode === "dark" ? "white" : "black"}
            >
              {/* <Button variant="outline"> */}
              <FaRegThumbsDown />{" "}
              <Text marginBottom={"0px"} marginLeft={"5px"}>
                {" "}
                Dislike
              </Text>
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
            <Box
              color={props.colorMode === "dark" ? "white" : "black"}
              marginLeft={"5px"}
            >
              <Flex
                cursor={"pointer"}
                onClick={showComment}
                justifyContent={"center"}
                alignItems="center"
              >
                {/* <Button onClick={showComment} variant="outline"> */}
                <BiComment fontSize={"14px"} />{" "}
                <Text marginBottom={"0px"} marginLeft={"3px"}>
                  Reply
                </Text>
                {/* </Button> */}
              </Flex>
            </Box>
            <Box
              color={props.colorMode === "dark" ? "white" : "black"}
              marginLeft={"10px"}
            ></Box>
          </Box>
        </Flex>
      </Box>
      {comment && (
        <Box marginTop={"10px"}>
          <Flex>
            <Box alignSelf={"flex-start"} marginRight="20px">
              <Avatar src={getUserProfile?.images?.avatar} boxSize="2.5rem" />
            </Box>
            <Box width={"100%"}>
              <Flex flexDirection={"column"}>
                <Textarea
                  width={"100%"}
                  color={props.colorMode === "dark" ? "white" : "black"}
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
                    color={props.colorMode === "dark" ? "white" : "black"}
                    marginRight={"10px"}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="messenger">Reply</Button>
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
