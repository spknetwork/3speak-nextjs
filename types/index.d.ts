declare global {
  var mongoose: any;
  var hive_keychain: any;
  function sum(a: number, b: number): number;
}


export interface VideoInterface {
  title: string;
  username: string;
  number_views?: number;
  thumbnail: string;
}

export {}