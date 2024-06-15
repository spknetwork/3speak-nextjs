import React from 'react'
import {Box, Flex, Text, Avatar} from "@chakra-ui/react"
import { CommentInterface } from 'types';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import SingleComment from './SingleComment';



const Comments = ({
  comments,
  parentIndex,
  depth = 1,
  author,
  permlink,
}: {
  comments: CommentInterface[];
  parentIndex: number;
  depth?: number;
  author: string;
  permlink: string;
}) => {
  return (
    <>
      {comments.map((comment: CommentInterface) => (
        <SingleComment
          key={comment.permlink}
          comment={comment}
          parentIndex={parentIndex}
          depth={depth}
          defaultIsCollapsed={false}
          author={author}
          permlink={permlink}
        />
      ))}
    </>
  );
};

export default Comments;