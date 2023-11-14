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
  title: string;
  username: string;
  number_views?: number;
  thumbnail: string;
  index?: number;
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