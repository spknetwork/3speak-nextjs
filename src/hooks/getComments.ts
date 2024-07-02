import { GET_COMMENTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { CommentInterface } from "types";


type CommentsData = {
    socialPost: {
      children: CommentInterface[];
    };
  };
  
  type CommentsVars = {
    author: string;
    permlink: string;
  };

  
export function useGetComments(author: string, permlink: string) {
  const { data, loading, error } = useQuery<CommentsData, CommentsVars>(GET_COMMENTS, {
    variables: { author, permlink },
  });

  const commentsData = data?.socialPost?.children;
  console.log("Comments", commentsData);
  return commentsData;
}
