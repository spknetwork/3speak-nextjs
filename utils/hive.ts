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
}