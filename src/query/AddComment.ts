//TODO: If I am adding a reply then its coming to a main comments not going to the children 


import client from "@/lib/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { GET_COMMENTS, USER_DETAILS } from "@/graphql/queries";
import { useGetMyQuery } from "@/hooks/getUserDetails";
import { CommentInterface, ProfileInterface } from "types";
import { dataLength } from "ethers";

export const handleAddComment = async (
  author: string,
  permlink: string,
  body: string
) => {
  if (typeof window === "undefined") {
    return;
  }

  const user_id = window.localStorage.getItem("user_id");

  if (!user_id) {
    console.log("warning: user is not logged in when trying to comment");
    return;
  }

  const getUserProfile = client.readQuery(
    { query: USER_DETAILS, variables: { id: user_id } },
    true
  )?.profile;

  //tempreary id for the new one
  const tempId = Math.random().toString(36).substring(2, 15);

  //read the query for cached comments
  const data = client.readQuery(
    {
      query: GET_COMMENTS,
      variables: { author, permlink },
    },
    true
  );

  //creating a new commment object
  const newComment: CommentInterface = {
    author: {
      profile: {
        // @ts-ignore satisifies keyword is broken otherwise that should be used
        __typename: "HiveProfile",
        images: {
          avatar: getUserProfile?.images?.avatar,
        },
        name: getUserProfile?.name,
      },
    },
    body,
    children: [],
    permlink: `pending-${tempId}`,
  };

  const pending = newComment.permlink.startsWith("pending");

  // console.log('comment data:')
  // console.log(data)

  // console.log('example comment:')
  // console.log(data.socialPost.children[7])

  // console.log('user profile:')
  // console.log(getUserProfile?.name)

  client.writeQuery({
    query: GET_COMMENTS,
    data: {
      ...data,
      socialPost: {
        ...data.socialPost,
        children: [newComment, ...data.socialPost.children],
      },
    },
    variables: { author, permlink },
  });

  // TODO: write comment to backend or Hive

  // TODO: refetch the comments once the comment is confirmed
};
