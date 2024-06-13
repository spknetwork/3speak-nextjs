import client from "@/lib/apolloClient";
import {gql, useQuery} from "@apollo/client";
import { GET_COMMENTS } from "@/graphql/queries";
import { useGetMyQuery } from "@/hooks/getUserDetails";
import { CommentInterface, ProfileInterface } from "types";
import { dataLength } from "ethers";


export const handleAddComment = async ( author: string, permlink: string, body: string) => {

    const getUserProfile: ProfileInterface = useGetMyQuery()?.profile;
    
    //tempreary id for the new one
    const tempId = Math.random().toString(36).substring(2, 15);

    //read the query for cached comments
    const data = client.readQuery({
        query: GET_COMMENTS,
        variables: {author, permlink}
    })

    //creating a new commment object 
    const newComment: CommentInterface = {
        author: {
          profile: {
            images: {
              avatar: getUserProfile?.images?.avatar || `/images/avatar3.png`
            },
            name: "You"
          }
        },
        body,
        permlink: tempId,
        children: []
      };

    client.writeQuery({
      query: GET_COMMENTS,
      data: [...data.comments, newComment],
      variables: { author, permlink },
    });
  
}