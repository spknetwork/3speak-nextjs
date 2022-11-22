import { Client } from "@hiveio/dhive";

const client = new Client(["https://api.deathwing.me"]);

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
}export const getFollowerInfo = async (video: IVideo, user?: string) => {
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

