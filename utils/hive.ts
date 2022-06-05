import hive from '@hiveio/hive-js';

export const getPost = async (username: string, permlink: string) => {
  await hive.api.getContent(username, permlink, (err: any, result: any) => {
    if (err) {
      return { data: null, error: err }
    }

    return { data: result }
  })
}