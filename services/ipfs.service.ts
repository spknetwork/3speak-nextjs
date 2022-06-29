import { normalizeCidPath } from '../utils/ipfs'
import { IpfsHandler } from 'core/ipfsHandler'
import CID from 'cids'
import { IPFSHTTPClient } from 'ipfs-http-client'

export class IpfsService {
  static gateway = 'https://ipfs.3speak.tv/ipfs/'
  static async getGateway(cid: string, bypass: boolean) {
    if (bypass === true) {
      return this.gateway
    }
    const { ipfs: ipfsInstance } = await IpfsHandler.getIpfs()
    let has = false

    if (!ipfsInstance) return null

    try {
      for await (const pin of ipfsInstance.pin.ls({
        path: cid,
        type: 'recursive',
      })) {
        if (pin.cid.equals(new CID(cid))) {
          has = true
          break
        }
      }
    } catch (ex) {
      console.error(ex)
    }
    if (has) {
      return 'http://localhost:8080/ipfs/'
    } else {
      return ipfsInstance.gateway
    }
  }
  static urlToIpfsPath(urlString: string) {
    const url = new URL(urlString)
    if (url.protocol === 'ipfs:' && url.pathname !== '') {
      return url.pathname
    } else {
      return normalizeCidPath(url.href)
    }
  }
  static urlToCID(urlString: string) {
    const url = new URL(urlString)

    if (url.protocol === 'ipfs:' && url.pathname !== '') {
      return url.hostname
    } else {
      const ipfsPath = normalizeCidPath(url.href).split('/')
      return ipfsPath[0]
    }
  }
}
