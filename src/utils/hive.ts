import { Client } from "@hiveio/dhive";
import { IVideo } from "src/models/Video";
import { formatChainData } from "./payouts";

const client = new Client([process.env.DEFAULT_HIVE_NODE || 'https://api.hive.blog']);

interface Authorperm {
  author: string;
  permlink: string;
}

export const getPost = async (authorperm: Authorperm) => {
  try {
    return await client.database.call('get_content', [authorperm.author, authorperm.permlink])
  } catch {
    return
  }
}

export const getPosts = async (authorperms: Authorperm[]): Promise<any[]> => {
  return (await Promise.all(
    authorperms.map(async (ap) => (getPost(ap)))
  )).filter(post => !!post)
}

export const getCommunity = async (video: IVideo) => {
  const communityQuery = {
    jsonrpc: "2.0",
    method: "bridge.get_community",
    params: {
      name: video.hive, 
      observer: "threespeak" // TODO: get logged in username
    },
    id: 1
  }
  return (await (await fetch(process.env.DEFAULT_HIVE_NODE || '', {
    method: 'post',
    body: JSON.stringify(communityQuery),
    headers: {'Content-Type': 'application/json'},
  })).json()).result
}

export const getFollowerInfo = async (video: IVideo, user?: string) => {
  const data = await client.call('follow_api', 'get_followers', [video.owner]);

  return {
    count: data.length,
    following: user ? data.find((follower: { voter: string; }) => follower.voter === user) : false
  }
}

export const getReplies = async (authorperm: Authorperm) => {
  let replies = await client.database.call('get_content_replies', [authorperm.author, authorperm.permlink])
  replies = await Promise.all(replies.map(async (r: any) => {
    const nestedReplies = await getReplies({author: r.author, permlink: r.permlink})
    return {
      ...r,
      replies: formatChainData(nestedReplies, nestedReplies, true, true)
    }
  }))
  return formatChainData(replies, replies, true, true).sort((a, b) => b.payout - a.payout);
}

export const getCommunities = async (last: any) => {
  let reqBody = {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "bridge.list_communities",
    "params": {last, limit: 100}
  };

  let communities = await (await fetch(`{{ HIVE_SECURE_NODE_PREFIX }}://{{ HIVE_DEFAULT_NODE }}`, {
    method: 'post',
    body: JSON.stringify(reqBody),
    headers: {'Content-Type': 'application/json'},
  })).json();
}
