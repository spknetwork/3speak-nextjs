import React, { useEffect, useState } from "react";
import { Avatar, Box, Collapse, Text } from "@chakra-ui/react";
import CommentFooter from "../CommentFooter";
import { commentsData } from "./CommentData";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { CommentInterface, VideoInterface } from "types";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "@/graphql/queries";
import CustomMarkdown from "@/helper/CustomMarkdown"

type Props = {
  author: string;
  permlink: string;
  bgColor: string;
  colorMode: string;
};

const Comment = ({ author, permlink, bgColor, colorMode }: Props) => {
  //call the comment query
  const getComments = useQuery(GET_COMMENTS, {
    variables: { author, permlink },
  });

  const commentsData: CommentInterface[] =
    getComments?.data?.socialPost?.children;
  console.log("Comments", commentsData);

  const [isCollapsed, setIsCollapsed] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleCollapse = (commentId: string, isParent = false) => {
    setIsCollapsed((prevState) => {
      const newState = { ...prevState };
      //   const commentKey: string = `comment-${commentId}`;

      if (isParent) {
        const replies =
          commentsData.find((comment) => comment.permlink === commentId)
            ?.children || [];
        const allReplies = getAllReplies(replies);

        allReplies.forEach((reply) => {
          newState[reply.permlink] = !prevState[commentId];
        });
      }
      newState[commentId] = !prevState[commentId];
      return newState;
    });
  };

  const getAllReplies = (replies: CommentInterface[]): CommentInterface[] => {
    let allReplies: CommentInterface[] = [];
    replies.forEach((reply: CommentInterface) => {
      allReplies.push(reply);
      if (reply.children) {
        allReplies = [...allReplies, ...getAllReplies(reply.children)];
      }
    });
    return allReplies;
  };

  const renderReplies = (
    replies: CommentInterface[],
    parentIndex: number,
    depth = 1
  ) => {
    return replies.map((reply: CommentInterface) => (
      <Box key={reply?.permlink} marginLeft={`${depth * 28}px`}>
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
            {isCollapsed[reply?.permlink] ? (
              <Box position={"absolute"} top={3} left={-1} cursor={"pointer"}>
                <CiCirclePlus
                  onClick={() => toggleCollapse(reply?.permlink, true)}
                />
              </Box>
            ) : (
              <Box position={"absolute"} top={3} left={-1} cursor={"pointer"}>
                <CiCircleMinus
                  onClick={() => toggleCollapse(reply.permlink, true)}
                />
              </Box>
            )}
          </Box>
          <Box alignSelf={"flex-start"}>
            <Avatar
              name={reply.author?.profile?.name}
              src={reply?.author?.profile?.images?.avatar}
            />
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
              {reply?.author?.profile?.name ?? "undefined user"}
            </Text>
            <Collapse in={!isCollapsed[reply?.permlink]} unmountOnExit>
              <Box
                padding={"2px 0"}
                width="100%"
                color={colorMode === "dark" ? "white" : "black"}
              >
                <CustomMarkdown content={reply?.body} />
              </Box>
            </Collapse>
            <CommentFooter
              bgColor={bgColor}
              colorMode={colorMode}
              commentId={reply?.permlink}
              toggleCollapse={toggleCollapse}
              isCollapsed={isCollapsed}
            />
          </Box>
        </Box>
        {reply.children && renderReplies(reply.children, depth + 1)}
      </Box>
    ));
  };

  if (commentsData === undefined) {
    return <Box>Loading..</Box>;
  }

  return (
    <Box>
      <Text marginBottom={"10px"} fontSize={"20px"} marginTop={"12px"}>
        Comments
      </Text>
      <Box maxHeight={"2000px"} overflow="hidden" position={"relative"}>
        <Box padding={"5px"} paddingTop="25px">
          {commentsData.map((commentData) => (
            <Box
              key={commentData?.permlink}
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
                  {isCollapsed[commentData?.permlink] ? ( //this would either true or false
                    <Box
                      position={"absolute"}
                      top={3}
                      left={-1}
                      cursor={"pointer"}
                    >
                      <CiCirclePlus
                        fontSize={"3xl"}
                        onClick={() =>
                          toggleCollapse(commentData?.permlink, true)
                        }
                      />
                    </Box>
                  ) : (
                    <Box
                      position={"absolute"}
                      top={3}
                      left={-1}
                      cursor={"pointer"}
                    >
                      <CiCircleMinus
                        onClick={() =>
                          toggleCollapse(commentData?.permlink, true)
                        }
                      />
                    </Box>
                  )}
                </Box>
                <Box alignSelf={"flex-start"}>
                  <Avatar
                    name={commentData?.author?.profile?.name}
                    src={commentData?.author?.profile?.images?.avatar}
                  />
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
                    {commentData?.author?.profile?.name ?? "undefined user"}
                  </Text>
                  <Collapse
                    in={!isCollapsed[commentData.permlink]}
                    unmountOnExit
                  >
                    <Box
                      padding={"2px 0"}
                      width="100%"
                      color={colorMode === "dark" ? "white" : "black"}
                    >
                     <CustomMarkdown content={commentData?.body} /> 
                    </Box>
                  </Collapse>
                  <CommentFooter
                    bgColor={bgColor}
                    colorMode={colorMode}
                    commentId={commentData?.permlink}
                    toggleCollapse={toggleCollapse}
                    isCollapsed={isCollapsed}
                  />
                </Box>
              </Box>
              {/* Agar ye parent already collapsed hai toh isko bhi collapsed krdo  */}
              <Collapse in={!isCollapsed[commentData?.permlink]} unmountOnExit>
                {commentData.children &&
                  renderReplies(commentData?.children, 0)}
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
