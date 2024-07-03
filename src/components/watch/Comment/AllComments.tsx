import { Box } from "@chakra-ui/react";
import { InfinitySpin } from "react-loader-spinner";
import { CommentInterface, VideoInterface } from "types";
import { useAuth } from "@/hooks/auth";
import { useGetComments } from "@/hooks/getComments";
import SingleComment from "./SingleComment";
type Props = {
  parentIndex?: number;
  depth?: number;
  author: string;
  permlink: string;
  bgColor: string;
  colorMode: string;
};

const AllComments = ({ author, permlink, parentIndex, depth }: Props) => {
  const isAuthenticated = useAuth();
  const commentsData = useGetComments(author, permlink);
 console.log("comments data", commentsData )
  const getAllReplies = (
    replies: CommentInterface[] | undefined
  ): CommentInterface[] => {
    let allReplies: CommentInterface[] = [];
    replies?.forEach((reply: CommentInterface) => {
      allReplies.push(reply);
      if (reply.children) {
        allReplies = [...allReplies, ...getAllReplies(reply.children)];
      }
    });
    return allReplies;
  };

  if (commentsData === undefined) {
    return (
    <Box>
      <InfinitySpin width="100" color="#6DC5D7" />
    </Box>
    )
  }
  console.log(isAuthenticated);

  return (
    <Box>
      <Box overflow="hidden" position={"relative"} height={"auto"}>
        <Box paddingTop="12px" zIndex={2}>
          {commentsData?.map((comment: CommentInterface) => (
            <SingleComment
              key={comment.permlink}
              comment={comment}
              parentIndex={parentIndex || 0}
              depth={depth || 0}
              defaultIsCollapsed={false}
              author={author}
              permlink={permlink}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AllComments;
