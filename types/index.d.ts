declare global {
  var mongoose: any;
  var hive_keychain: any;
  function sum(a: number, b: number): number;
}

export interface HiveLoginInterface {
  username: string,
  dateNow: string,
  callback: Function
}

export interface Params {
  email: string;
  password: string;
}

export interface Account {
  avatar: string;
  name: string;
  type: string;
}


export interface UserDetails {
  username: string | null;
}


export interface VideoInterface {
  author?: Author
  body: string;
  created_at: string;
  permlink: string;
  refs: [item: string];
  spkvideo?: SpkVideoInterface;
  stats?: Stats
  title: string;
  index?: number;
  tags?: any;
  price?: number
}

export interface Author {
    username: string;
}
export interface Stats {
    num_comments: number;
    num_votes: number;
    total_hive_reward: number
}

export interface UsernameInterface {
  username: string;
}
export interface SocialFeedInterface {
  socialFeed: SocialFeedItemInterface
}
export interface SocialFeedItemInterface {
  item : SocialFeedItemsInterface[]
}
export interface SocialFeedItemsInterface {
  body?: string;
  created_at: string;
  title?: string;
  spkvideo?:SpkVideoInterface

}

export interface SpkVideoInterface {
  body?:string;
  duration?: number;
  height?: number;
  is_short?: boolean;
  play_url?: string;
  thumbnail_url?: string;
  width?: number;
}

export interface UserInterface {
  profile: ProfileInterface
}
export interface ProfileImagesInterface{
  avatar: string,
  cover: string,
}

export interface ProfileInterface {
  about: string,
  did?: string,
  images?: ProfileImagesInterface,
  id?: string,
  json_metadata?: string,
  location?: string,
  name: string,
  src?: string,
  username: string,
  website?: string,
}

export {}