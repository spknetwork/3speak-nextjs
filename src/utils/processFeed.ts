const APP_BUNNY_IPFS_CDN = process.env.APP_BUNNY_IPFS_CDN || "https://ipfs.3speak.tv"
const APP_VIDEO_CDN_DOMAIN = process.env.APP_VIDEO_CDN_DOMAIN 
const APP_IMAGE_CDN_DOMAIN = process.env.APP_IMAGE_CDN_DOMAIN

import { binary_to_base58 } from 'base58-js'

export default function processFeed(videoFeed: any[]) {
  const bugFix = JSON.parse(JSON.stringify(videoFeed));
  let out = [];
  for (let video of bugFix) {
    let baseUrl;
    let playUrl;
    if(video.upload_type === 'ipfs') {
      baseUrl = `${APP_BUNNY_IPFS_CDN}/ipfs/${video.thumbnail.replace('ipfs://', '')}/`;
      playUrl = `${APP_BUNNY_IPFS_CDN}/ipfs/${video.video_v2.replace('ipfs://', '')}`;
    } else {
      playUrl = `${APP_VIDEO_CDN_DOMAIN}/${video.permlink}/default.m3u8`;
      if(video?.thumbnail?.includes('ipfs://')) {
        baseUrl = `${APP_BUNNY_IPFS_CDN}/ipfs/${video.thumbnail.replace('ipfs://', '')}/`;
      } else {
        /*if(video.ipfs) {
          baseUrl = binary_to_base58(Buffer.from(`${APP_BUNNY_IPFS_CDN}/ipfs/${video.ipfs}/thumbnail.png`));
        } else {
        }*/
        baseUrl = `${APP_IMAGE_CDN_DOMAIN}/${video.permlink}/thumbnails/default.png`;
      }
    }
    video.thumbUrl = `https://images.hive.blog/p/${binary_to_base58(Buffer.from(baseUrl))}?format=jpeg&mode=cover&width=340&height=191`;
    video.baseThumbUrl = baseUrl;
    video.playUrl = playUrl;
    out.push(video)
  }
  return out;
}
