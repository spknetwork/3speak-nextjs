// TOOD: show more num_comments replies
import CustomMarkdown from "@/helper/CustomMarkdown";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { CommentInterface } from "types";
import CommentFooter from "../CommentFooter";;
import { useGetComments } from "@/hooks/getComments";
import { BsDot } from "react-icons/bs";
import AllComments from "./AllComments";

type Props = {
  comment: CommentInterface;
  parentIndex: number;
  depth: number;
  defaultIsCollapsed: boolean;
  author: string;
  permlink: string;
  isFirstChild: boolean;
};

const SingleComment = ({
  comment,
  depth,
  defaultIsCollapsed,
  author,
  permlink,
  isFirstChild,
}: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreReplies, setShowMoreReplies] = useState(false);

  console.log(isCollapsed);

  function timeAgo(date: string): string {
    const now = new Date();

    const nowDate = new Date(date);
    const ago = now.getTime() - nowDate.getTime();

    const seconds = Math.floor(ago / 1000);
    const minutes = Math.floor(seconds / 60);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      return `Other time unit ago`;
    }
  }

  return (
    <Box
      key={comment?.permlink}
      marginLeft={depth === 0 ? "0px" : "30px"}
      position={"relative"}
      p={2}
      pb={4}
    >
      <Box
        background="transparent"
        borderRadius={"4px"}
        display="flex"
        position="relative"
        transition={"color .5s,fill .5s,background 1s"}
        padding="8px 0 0 8px"
        alignItems={"center"}
        zIndex={1}
        fontFamily={"system-ui"}
      >
        {/* TODO: we just need only one  */}
        {depth != 0 && isFirstChild && (
          <Box
            backgroundColor={colorMode === "dark" ? "gray.500" : "#edeff1"}
            display={"block"}
            height={7}
            width="5px"
            position={"absolute"}
            top={4}
            left={0}
            transform="rotate(270deg)"
          ></Box>
        )}
        {/* This is the line  */}
        {!isCollapsed && <Box
          backgroundColor={colorMode === "dark" ? "gray.500" : "#edeff1"}
          display="block"
          position="absolute"
          top="45px"
          left="21px"
          width="12px"
          height="calc(100%)"
          borderLeft="4px solid transparent"
          borderRight={"4px solid transparent"}
          _hover={{ backgroundColor: "blue.200" }}
          backgroundClip={"padding-box"}
          cursor={"pointer"}
          onClick={() => setIsCollapsed(!isCollapsed)}
        ></Box>}

        {isCollapsed && (
          <Box
            position={"absolute"}
            top={"48px"}
            left={6}
            fontSize={"lg"}
            cursor={"pointer"}
            onClick={() => setIsCollapsed(false)}
          >
            <FaPlusCircle
              color={colorMode === "dark" ? "white" : "black"}
              style={{ fontWeight: "bold" }}
            />
          </Box>
        )}

        <Box
          alignSelf={"flex-start"}
          border={colorMode == "dark" ? "1px solid white" : "1px solid black "}
          borderRadius={"50%"}
          zIndex={2}
        >
          <Avatar
            name={comment.author?.profile?.name}
            src={comment?.author?.profile?.images?.avatar}
          />
        </Box>
        <Box
          mt={["2","0"]}
          ml={"4px"}
          borderRadius="4px"
          border={"1px solid transparent"}
          boxSizing="border-box"
          maxWidth={"800px"}
          width="calc(100% - 56px)"
          paddingLeft="0px"
          alignSelf="flex-start"
        >
          <Flex alignItems={"center"} gap={1} flexWrap={"wrap"}>
            <Text
              fontSize={["14px","20px"]}
              fontWeight={"bold"}
              color={colorMode === "dark" ? "white" : "black"}
            >
              {comment?.author?.profile?.name ?? "User"}
            </Text>
            <Text fontSize={["12px","18px"]}>{`@${comment?.author?.username}`}</Text>
            <Flex alignItems={"center"} mb={2}>
              <BsDot />
            </Flex>
            <Text fontSize={["10px", "12px"]}>{timeAgo(comment?.created_at)}</Text>
          </Flex>
          <Collapse in={!isCollapsed} unmountOnExit>
            <Box
              padding={"2px 0"}
              width="100%"
              color={colorMode === "dark" ? "white" : "black"}
            >
              <CustomMarkdown content={comment?.body} />
            </Box>
            <CommentFooter
              bgColor={bgColor}
              colorMode={colorMode}
              author={comment.author.username}
              permlink={comment.permlink}
              setShowMoreReplies={setShowMoreReplies}
              parentAuthor={author}
              parentPermlink={permlink}
            />
          </Collapse>
        </Box>
      </Box>

      {comment.stats.num_comments !== 0 && (showMoreReplies ? (
        <Collapse in={!isCollapsed}>
          <AllComments
            parentIndex={depth + 1}
            depth={depth + 1}
            author={comment.author.username}
            permlink={comment.permlink}
            bgColor={bgColor}
            colorMode={colorMode}
          />
        </Collapse>
      ) : (
       !isCollapsed && <Box px={12} mt={5} cursor="pointer">
        <Text onClick={() => setShowMoreReplies(true)}>
          Show {comment.stats.num_comments} replies
        </Text>
        </Box>
      ))}
    </Box>
  );
};

export default SingleComment;
