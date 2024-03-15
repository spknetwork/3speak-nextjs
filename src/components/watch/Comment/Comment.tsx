import React, { useState } from "react";
import { Avatar, Box, Collapse, Text } from "@chakra-ui/react";
import CommentFooter from "../CommentFooter";
import { commentsData } from "./CommentData";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

type Props = {
  bgColor: string;
  colorMode: string;
};
//TODO: comment collapse in the whole child container

const Comment = ({ bgColor, colorMode }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleCollapse = (commentId: number, isParent = false) => {
    setIsCollapsed((prevState) => {
      const newState = { ...prevState };
      if (isParent) {
        const replies =
          commentsData.find((comment) => comment.id === commentId)?.replies ||
          [];
        const allReplies = getAllReplies(replies);

        allReplies.forEach((reply) => {
          newState[reply.id] = !prevState[commentId];
        });
      }
      newState[commentId] = !prevState[commentId];
      return newState;
    });
  };

  const getAllReplies = (replies: any): any[] => {
    let allReplies: any[] = [];
    replies.forEach((reply: any) => {
      allReplies.push(reply);
      if (reply.replies) {
        allReplies = [...allReplies, ...getAllReplies(reply.replies)];
      }
    });
    return allReplies;
  };

  const renderReplies = (replies: any, depth = 1) => { 
    return replies.map((reply: any) => (
      <Box key={reply.id} marginLeft={`${depth * 28}px`}>
        <Box
          background="transparent"
          borderRadius={"4px"}
          display="flex"
          position="relative"
          transition={"color .5s,fill .5s,background 1s"}
          padding="8px 0 0 8px"
          alignItems={"center"}
        >
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
          >
            {isCollapsed[reply.id] ? (
              <Box position={"absolute"} top={3} left={-1}>
                <CiCirclePlus onClick={() => toggleCollapse(reply.id)} />
              </Box>
            ) : (
              <Box position={"absolute"} top={3} left={-1}>
                <CiCircleMinus onClick={() => toggleCollapse(reply.id)} />
              </Box>
            )}
          </Box>
          <Box alignSelf={"flex-start"}>
            <Avatar name={reply.author} src={reply.avatar} />
          </Box>
          <Box
            marginLeft={"8px"}
            borderRadius="4px"
            border={"1px solid transparent"}
            boxSizing="border-box"
            maxWidth={"800px"}
            width="calc(100% - 56px)"
            padding={"0 20px"}
            paddingLeft="0px"
            alignSelf="flex-start"
          >
            <Text
              fontSize="xl"
              fontWeight={"bold"}
              color={colorMode === "dark" ? "white" : "black"}
            >
              {reply.title}
            </Text>
            <Collapse in={!isCollapsed[reply.id]} unmountOnExit>
              <Box
                padding={"2px 0"}
                width="100%"
                color={colorMode === "dark" ? "white" : "black"}
              >
                {reply.content}
              </Box>
            </Collapse>
            <CommentFooter
              bgColor={bgColor}
              colorMode={colorMode}
              commentId={reply.id}
              toggleCollapse={toggleCollapse}
              isCollapsed={isCollapsed}
            />
          </Box>
        </Box>
        {reply.replies && renderReplies(reply.replies, depth + 1)}
      </Box>
    ));
  };

  return (
    <Box>
      <Box maxHeight={"2000px"} overflow="hidden" position={"relative"}>
        <Box padding={"0px"} paddingTop="20px">
          {commentsData.map((commentData) => (
            <Box
              key={commentData.id}
              paddingLeft={"16px"}
              boxSizing="border-box"
              overflow={"visible"}
              position="relative"
              transition={"background 1s"}
              width="100%"
            >
              <Box
                background="transparent"
                borderRadius={"4px"}
                display="flex"
                position="relative"
                transition={"color .5s,fill .5s,background 1s"}
                padding="8px 0 0 8px"
                alignItems={"center"}
              >
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
                >
                  {isCollapsed[commentData.id] ? (
                    <Box position={"absolute"} top={3} left={-1}>
                      <CiCirclePlus
                        onClick={() => toggleCollapse(commentData.id, true)}
                      />
                    </Box>
                  ) : (
                    <Box position={"absolute"} top={3} left={-1}>
                      <CiCircleMinus
                        onClick={() => toggleCollapse(commentData.id, true)}
                      />
                    </Box>
                  )}
                </Box>
                <Box alignSelf={"flex-start"}>
                  <Avatar name={commentData.author} src={commentData.avatar} />
                </Box>
                <Box
                  marginLeft={"8px"}
                  borderRadius="4px"
                  border={"1px solid transparent"}
                  boxSizing="border-box"
                  maxWidth={"800px"}
                  width="calc(100% - 56px)"
                  padding={"0 20px"}
                  paddingLeft="0px"
                  alignSelf="flex-start"
                >
                  <Text
                    fontSize="xl"
                    fontWeight={"bold"}
                    color={colorMode === "dark" ? "white" : "black"}
                  >
                    {commentData.title}
                  </Text>
                  <Collapse in={!isCollapsed[commentData.id]} unmountOnExit>
                    <Box
                      padding={"2px 0"}
                      width="100%"
                      color={colorMode === "dark" ? "white" : "black"}
                    >
                      {commentData.content}
                    </Box>
                  </Collapse>
                  <CommentFooter
                    bgColor={bgColor}
                    colorMode={colorMode}
                    commentId={commentData.id}
                    toggleCollapse={toggleCollapse}
                    isCollapsed={isCollapsed}
                  />
                </Box>
              </Box>
              {commentData.replies && renderReplies(commentData.replies)}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
