import client from "@/lib/apolloClient";
import { GET_COMMENTS, USER_DETAILS } from "@/graphql/queries";
import { CommentInterface, ProfileInterface } from "types";
import { Dispatch, SetStateAction } from "react";
import { Cache } from "@apollo/client";
import { ChildProcess } from "child_process";

export const handleAddComment = async (
  author: string,
  permlink: string,
  body: string,
  parentAuthor?: string,
  parentPermlink?: string
) => {
  if (typeof window === "undefined") {
    return;
  }

  console.log("author", author);
  console.log("permlink", permlink);
  console.log("body", body);

  const user_id = window.localStorage.getItem("user_id");

  if (!user_id) {
    console.log("warning: user is not logged in when trying to comment");
    return;
  }

  const getUserProfile = client.readQuery(
    { query: USER_DETAILS, variables: { id: user_id } },
    true
  )?.profile;

  console.log(getUserProfile);

  console.log("parent author", parentAuthor);
  console.log("parent permlink", parentPermlink);

  //tempreary id for the new one
  const tempId = Math.random().toString(36).substring(2, 15);

  if (getUserProfile === null) {
    throw Error("Profile is null");
  }

  //read the query for cached comments
  const data = client.readQuery(
    {
      query: GET_COMMENTS,
      variables: { author, permlink },
    },
    true
  ) || {
    socialPost: {
      // @ts-ignore satisifies keyword is broken otherwise that should be used
      __typename: "HivePost",
      children: [],
    },
  };

  //creating a new commment object
  const newComment: CommentInterface = {
    author: {
      username: getUserProfile.username,
      profile: {
        // @ts-ignore satisifies keyword is broken otherwise that should be used
        __typename: "HiveProfile",
        images: {
          avatar: getUserProfile?.images?.avatar,
        },
        name: getUserProfile?.name,
      },
    },
    stats: {
      num_comments: 0,
    },
    body,
    children: [],
    permlink: `pending-${tempId}`,
    created_at: new Date().toString(),
  };

  const pending = newComment.permlink.startsWith("pending");

  console.log("comment data:");
  console.log(data);

  console.log("user profile:");
  console.log(getUserProfile?.name);

  const newData = {
    ...data,
    socialPost: {
      ...data.socialPost,
      children: [newComment, ...data.socialPost.children],
    },
  };

  client.writeQuery({
    query: GET_COMMENTS,
    data: newData,
    variables: { author, permlink },
  });

  //we are reading the query
  const parentData = client.readQuery(
    {
      query: GET_COMMENTS,
      variables: { author: parentAuthor, permlink: parentPermlink },
    },
    true
  );
  console.log("ParentData", parentData);

  console.log('author', author);
  console.log('permlink', permlink)

  //TODO: compare this with get_comments query
  const newParentData = {
    ...parentData,
    socialPost: {
      ...parentData.socialPost,
      children: parentData.socialPost.children.map((child: any) => {
        console.log('child.author',child.author)
        console.log('child.permlink',child.permlink)
        console.log('author compare',author === child.author.username)
        console.log('permlink compare',permlink === child.permlink)
        return author === child.author.username && permlink === child.permlink
          ? {
              ...child,
              stats: {
                ...child.stats,
                num_comments: child.stats.num_comments + 1,
              },
            }
          : child
    }),
    },
  };

  client.writeQuery({
    query: GET_COMMENTS,
    variables: { author: parentAuthor, permlink: parentPermlink },
    data: newParentData,
  });

  const parentData2 = client.readQuery(
    {
      query: GET_COMMENTS,
      variables: { author: parentAuthor, permlink: parentPermlink },
    },
    true
  );
  console.log("ParentData2", parentData2);

  // TODO: write comment to backend or Hive

  // TODO: refetch the comments once the comment is confirmed
};

function addChildCommentToPostTree(
  replyId: string,
  comment: CommentInterface,
  post: { permlink: string; children?: CommentInterface[] }
) {
  if (post.permlink === replyId) {
    // found
    return { ...post, children: [comment, ...(post.children || [])] };
  }

  if (!post.children) {
    return undefined;
  }

  for (let i = 0; i < post.children.length; i++) {
    const child = post.children[i];
    const updatedChild = addChildCommentToPostTree(replyId, comment, child);
    if (updatedChild) {
      const children = [...post.children];
      children[i] = updatedChild as CommentInterface;
      return {
        ...post,
        children,
      };
    }
  }

  return undefined;
}
