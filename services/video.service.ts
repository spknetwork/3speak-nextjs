import ArraySearch from 'arraysearch'
import DefaultThumbnail from 'public/img/default-thumbnail.jpg';
import hive from '@hiveio/hive-js'
import { binary_to_base58 } from 'base58-js'

const Finder = ArraySearch.Finder

export class VideoService {
  /**
   * Retrieves thumbnail URL.
   * @param {String|Object} permalink
   */
  static async getNewThumbnailURL(author: any, permlink: any) {
    try {
      const content = await hive.api.getContentAsync(author, permlink)

      console.log(content)
      const parsedMeta = JSON.parse(content.json_metadata)

      if (parsedMeta && typeof parsedMeta === 'object' && typeof parsedMeta.image[0] === 'string') {
        let url = parsedMeta.image[0]

        if (parsedMeta.image[0]) {
          if (parsedMeta.image[0].includes('ipfs-3speak.b-cdn.net')) {
            const pathArray = url.split('/')
            const protocol = pathArray[3]
            const host = pathArray[4]
            url = `https://images.hive.blog/p/${binary_to_base58(
              Buffer.from('https://ipfs.io/' + protocol + '/' + host),
            )}?format=jpeg&mode=cover&width=340&height=191`
          } else {
            //Fix for bad frontends overriding our data
            let realImage
            if (!parsedMeta.image[1].includes('3speakcontent.co')) {
              realImage = parsedMeta.image[1]
            } else {
              parsedMeta.image[0]
            }
            url = `https://images.hive.blog/p/${binary_to_base58(
              Buffer.from(realImage),
            )}?format=jpeg&mode=cover&width=340&height=191`
          }
        } else {
          url = `https://img.3speakcontent.co/${permlink}/thumbnails/default.png`
          console.log(url, permlink)
        }

        return url
      } else {
        return DefaultThumbnail
        //throw new Error("Invalid post metadata");
      }
    } catch {
      return DefaultThumbnail
    }
  }
}
