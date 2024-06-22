//TODO: 1st problem is that we couldnt collapse the reactions of comment
//TODO: 2nd discuss the behaviour for comments 
import CustomMarkdown from "@/helper/CustomMarkdown";
import {
  Avatar,
  Box,
  Collapse,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { CommentInterface } from "types";
import CommentFooter from "../CommentFooter";
import Comments from "./Comment";

type Props = {
  comment: CommentInterface;
  parentIndex: number;
  depth: number;
  defaultIsCollapsed: boolean;
  author: string;
  permlink: string;
};

const SingleComment = ({
  comment,
  parentIndex,
  depth,
  defaultIsCollapsed,
  author,
  permlink,
}: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);

  return (
    <Box
      key={comment?.permlink}
      marginLeft={`${depth * 28}px`}
      position={"relative"}
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
        {depth != 0 && (
          <Box
            backgroundColor="#edeff1"
            height={18}
            width={"5px"}
            position={"absolute"}
            top={-2}
            left={0.5}
            transform="rotate(145deg)"
          ></Box>
        )}
        <Box
          display={"block"}
          position="absolute"
          top={"45px"}
          left="21px"
          width={"12px"}
          height={"calc(100% - 50px)"}
          borderLeft="4px solid transparent"
          borderRight={"4px solid transparent"}
          backgroundColor="#edeff1"
          backgroundClip={"padding-box"}
        ></Box>
        {depth != 0 && (
          <>
            <Box position={"absolute"} top={-2} left={-1.5} cursor={"pointer"}>
              {/* How to put two conditions here  */}
              {isCollapsed ? (
                <Box>
                  <CiCirclePlus onClick={() => setIsCollapsed(false)} />
                </Box>
              ) : (
                <Box>
                  <CiCircleMinus onClick={() => setIsCollapsed(true)} />
                </Box>
              )}
            </Box>
          </>
        )}
        <Box alignSelf={"flex-start"}>
          <Avatar
            name={comment.author?.profile?.name}
            src={comment?.author?.profile?.images?.avatar}
          />
        </Box>
        <Box
          mt={2}
          ml={"4px"}
          borderRadius="4px"
          border={"1px solid transparent"}
          boxSizing="border-box"
          maxWidth={"800px"}
          width="calc(100% - 56px)"
          paddingLeft="0px"
          alignSelf="flex-start"
        >
          <Text
            fontSize="xl"
            fontWeight={"bold"}
            color={colorMode === "dark" ? "white" : "black"}
          >
            {comment?.author?.profile?.name ?? "User"}
          </Text>
          <Collapse in={!isCollapsed} unmountOnExit>
            <Box
              padding={"2px 0"}
              width="100%"
              color={colorMode === "dark" ? "white" : "black"}
            >
              <CustomMarkdown content={comment?.body} />
            </Box>
          </Collapse>
          <CommentFooter
            bgColor={bgColor}
            colorMode={colorMode}
            commentId={comment?.permlink}
            author={author}
            permlink={permlink}
          />
        </Box>
      </Box>
      {!isCollapsed && comment.children && (
        <Comments
          comments={comment.children}
          parentIndex={depth + 1}
          depth={depth + 1}
          author={author}
          permlink={permlink}
        />
      )}
    </Box>
  );
};

export default SingleComment;
