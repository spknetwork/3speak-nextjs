//TODO: to remove the minibar in the replies section and remove it with text area
//TODO: Integrate the emoji keyboard
//TODO: Optimize the comment component and separate the children node comments 

import React, { useEffect, useState } from "react";
import { Avatar, Box, Collapse, Text } from "@chakra-ui/react";
import CommentFooter from "../CommentFooter";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { CommentInterface, VideoInterface } from "types";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "@/graphql/queries";
import CustomMarkdown from "@/helper/CustomMarkdown"
import Comments from "./Comment";


type Props = {
  author: string;
  permlink: string;
  bgColor: string;
  colorMode: string;
};

const AllComments = ({ author, permlink, bgColor, colorMode }: Props) => {
  //call the comment query
  //TODO: .writeQuery {}
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

  

  if (commentsData === undefined) {
    return <Box>Loading..</Box>;
  }

  return (
    <Box>
      <Box maxHeight={"2000px"} overflow="hidden" position={"relative"}>
        <Box padding={"5px"} paddingTop="25px">
          <Comments comments={commentsData} parentIndex={0} depth={0} />
        </Box>
      </Box>
    </Box>
  );
};

export default AllComments;
