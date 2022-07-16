import hive from '@hiveio/hive-js'
import axios from 'axios'
import ArraySearch from 'arraysearch'
import { hiveClient } from 'singletons/hive-client.singleton'
import { VideoInfo, VideoSource } from 'common/models/video.model'
import RefLink from 'constants';

const Finder = ArraySearch.Finder

export class AccountService {
  static async login(data: any) {
    switch (data.accountType) {
      case 'hive': {
        const userAccounts = await hive.api.getAccountsAsync([data.username])
        console.log(`got hive account for username ${data.username}`, userAccounts)
        const pubWif = userAccounts[0].posting.key_auths[0][0]

        const Valid = hive.auth.wifIsValid(data.key, pubWif)

        if (Valid) {
          const profile = {
            _id: userAccounts[0].id.toString(),
            nickname: data.profile,
            keyring: [
              {
                type: 'hive',
                username: data.username,
                public: {
                  pubWif,
                },
                encrypted: data.encrypted,
                privateKeys: {
                  posting_key: data.key,
                },
              },
            ],
          }
          const profileID = profile._id
          const check_profile = await PromiseIPC.send('accounts.has', profileID)
          if (check_profile) {
            throw new Error('Account exists already')
          } else {
            // 2nd argument doesn't match function signature - marking with any
            await PromiseIPC.send('accounts.createProfile', profile as any)
            const get_profile = await PromiseIPC.send('accounts.get', profileID)
            localStorage.setItem('SNProfileID', profileID)
            return get_profile
          }
        } else {
          throw new Error('Invalid posting key')
        }
      }
    }
  }

  static async getAccounts() {
    const getAccounts = await PromiseIPC.send('accounts.ls', {} as any)

    return getAccounts
  }

  static async getAccount(profileID: any) {
    const getAccount = await PromiseIPC.send('accounts.get', profileID)
    return getAccount
  }
  static async logout(profileID: any) {
    await PromiseIPC.send('accounts.deleteProfile', profileID)
    return
  }
  static async voteHandler(voteOp: { accountType: any; weight: number; wif: any; voter: any; author: any; permlink: any }) {
    switch (voteOp.accountType) {
      case 'hive': {
        const weight = voteOp.weight * 100
        const theWif = voteOp.wif
        hive.broadcast.vote(
          theWif,
          voteOp.voter,
          voteOp.author,
          voteOp.permlink,
          weight,
          function (error: any, succeed: any) {
            if (error) {
              console.error(error)
              console.error('Error encountered')
            }

            if (succeed) {
              console.log('vote broadcast successfully')
            }
          },
        )
      }
    }
  }
  static async followHandler(profileID: any, followOp: { accountType: any; author: any; what: any }) {
    switch (followOp.accountType) {
      case 'hive': {
        //const profile = await acctOps.getAccount(profileID);
        const profile = (await this.getAccount(profileID)) as any

        const username = Finder.one.in(profile.keyring).with({ type: 'hive' }).username
        const theWifObj = Finder.one.in(profile.keyring).with({
          type: 'hive',
        })
        const wif = theWifObj.privateKeys.posting_key // posting key
        const jsonObj = [
          'follow',
          {
            follower: username,
            following: followOp.author,
            what: followOp.what ? [followOp.what] : [],
          },
        ]

        // console.log(
        hive.broadcast.customJson(
          wif,
          [],
          [username],
          'follow',
          JSON.stringify(jsonObj),
          async (error: any, succeed: any) => {
            if (error) {
              console.error(error)
              console.error('Error encountered broadcsting custom json')
            }

            if (succeed) {
              console.log(succeed)
              console.log('success broadcasting custom json')
            }
          },
        )
        // )
      }
    }
  }
  static async createPost(postOp: { accountType: any; wif: any; parentPermlink: any; author: any; permlink: any; title: any; body: any; jsonMetadata: any }) {
    switch (postOp.accountType) {
      case 'hive': {
        const theWif = postOp.wif

        hive.broadcast.comment(
          theWif,
          '',
          postOp.parentPermlink,
          postOp.author,
          postOp.permlink,
          postOp.title,
          postOp.body,
          postOp.jsonMetadata,
          function (error: any, succeed: any) {
            console.log('Bout to check')
            if (error) {
              console.error(error)
              console.error('Error encountered')
            }

            if (succeed) {
              console.log('succeed')
            }
          },
        )
      }
    }
  }
  static async getFollowing() {
    const profileID = window.localStorage.getItem('SNProfileID')
    // String does not match 2nd argument for send function signature
    const getAccount = (await PromiseIPC.send('accounts.get', profileID as any)) as any
    const hiveInfo = Finder.one.in(getAccount.keyring).with({ type: 'hive' })

    const out = []
    const done = false
    let nextFollow = ''
    const limit = 100
    while (done === false) {
      //       const followingChunk = await hiveClient.call('follow_api', 'get_following', [
      const followingChunk = await hiveClient.call('condenser_api', 'get_following', [
        hiveInfo.username,
        nextFollow,
        'blog',
        limit,
      ])

      out.push(...followingChunk)
      if (followingChunk.length !== limit) {
        break
      }
      nextFollow = followingChunk[followingChunk.length - 1].following
    }
    return out
  }

  static async convertLight(val: { json_metadata: string }) {
    if (typeof val.json_metadata === 'object') {
      val.json_metadata = JSON.parse(val.json_metadata)
    }
    if (!val.json_metadata.video) {
      val.json_metadata.video = {
        info: {},
      }
    }
  }
  /**
   * Retrieves post information from reflink.
   * @param {String|RefLink} reflink
   */
  static async permalinkToPostInfo(reflink: { toString: () => any }) {
    if (!(reflink instanceof RefLink)) {
      reflink = RefLink.parse(reflink)
    }
    const post_content = (
      (await PromiseIPC.send('distiller.getContent', reflink.toString())) as any
    ).json_content
    return post_content
  }
  /**
   * Retrieves post information as videoInfo from reflink.
   * @param {String|RefLink} reflink
   */
  static async permalinkToVideoInfo(reflink: { toString: () => any; source: { value: any }; permlink: any }, options: any = {}): Promise<VideoInfo> {
    if (!reflink) return undefined

    if (!(reflink instanceof RefLink)) {
      reflink = RefLink.parse(reflink)
    }
    if (!options.type) {
      options.type == '*'
    }

    const postContent = await PromiseIPC.send('distiller.getContent', reflink.toString())
    const post_content = postContent.json_content

    if (!post_content) {
      throw new Error('Invalid post content. Empty record')
    }
    switch (reflink.source.value) {
      case 'hive': {
        const json_metadata = post_content.json_metadata
        if (!(json_metadata.app && options.type === 'video')) {
          if (json_metadata.type) {
            if (!json_metadata.type.includes('3speak/video')) {
              throw new Error('Invalid post content. Not a video')
            }
          }
          //throw new Error("Invalid post content. Not a video");
        }
        const sources: VideoSource[] = []
        let title
        let description
        let duration
        if (json_metadata.sourceMap) {
          sources.push(...json_metadata.sourceMap)
          return {
            sources,
            creation: new Date(post_content.created + 'Z').toISOString(),
            title: post_content.title,
            description: post_content.body,
            tags: json_metadata.tags,
            refs: [`hive:${post_content.author}:${post_content.permlink}`], //Reserved for future use when multi account system support is added.
            meta: {
              duration: json_metadata.duration,
            }, //Reserved for future use.
            reflink: `hive:${post_content.author}:${post_content.permlink}`,
          }
        }
        try {
          const video_info = json_metadata.video.info
          const video_content = json_metadata.video.content
          description = video_content.description
          title = video_info.title
          duration = video_info.duration

          const urls = []
          if (video_info.ipfs != null && video_info.ipfs) {
            urls.push(`ipfs://${video_info.ipfs}`)
          }
          if (video_info.ipfsThumbnail != null && video_info.ipfsThumbnail) {
            sources.push({
              type: 'thumbnail',
              url: `ipfs://${video_info.ipfsThumbnail}`,
            })
          }
          urls.push(`https://threespeakvideo.b-cdn.net/${reflink.permlink}/default.m3u8`)
          if (video_info.file) {
            urls.push(`https://threespeakvideo.b-cdn.net/${reflink.permlink}/${video_info.file}`)
          }

          for (const url of urls) {
            sources.push({
              type: 'video',
              url,
              /**
               * Reserved if a different player must be used on per format basis.
               *
               * If multi-resolution support is added in the future continue to use the url/format scheme.
               * url should link to neccessary metadata.
               */
              format: url.split('.').slice(-1)[0],
            })
          }

          sources.push({
            type: 'thumbnail',
            url: `https://threespeakvideo.b-cdn.net/${reflink.permlink}/thumbnails/default.png`,
          })
        } catch (ex) {
          title = post_content.title
          description = post_content.body
        }
        return {
          sources,
          creation: new Date(post_content.created + 'Z').toISOString(),
          title,
          description,
          tags: json_metadata.tags,
          refs: [`hive:${post_content.author}:${post_content.permlink}`], //Reserved for future use when multi account system support is added.
          meta: { duration }, //Reserved for future use.
          reflink: `hive:${post_content.author}:${post_content.permlink}`,
        }
      }
      default: {
        throw new Error('Unknown account provider')
      }
    }
  }
  static async getProfileBackgroundImageUrl(reflink: { toString: () => any }): Promise<string> {
    if (!(reflink instanceof RefLink)) {
      reflink = RefLink.parse(reflink)
    }
    switch ('hive') {
      case 'hive': {
        const jsonContent = (
          (await PromiseIPC.send('distiller.getAccount', reflink.toString())) as any
        ).json_content

        if (!jsonContent) {
          throw new Error('Invalid account data content. Empty record')
        }
        const metadata = jsonContent.posting_json_metadata as string
        if (!metadata) {
          return ''
        }

        const parsed = JSON.parse(metadata)
        jsonContent.posting_json_metadata = JSON.parse(jsonContent.posting_json_metadata as string)

        const image = parsed.profile.cover_image

        return jsonContent.posting_json_metadata.profile.cover_image
      }
      default: {
        throw new Error('Unknown account provider')
      }
    }
  }
  /**
   * Retrieves Account profile picture URL.
   * @todo Future item: Pull image from URL, then store locally for later use.
   * @param {String|RefLink} reflink
   */
  static async getProfilePictureURL(reflink: { root: any }) {
    if (!(reflink instanceof RefLink)) {
      reflink = RefLink.parse(reflink)
    }
    switch ('hive') {
      case 'hive': {
        const avatar_url = `https://images.hive.blog/u/${reflink.root}/avatar`
        try {
          await axios.head(avatar_url)
          return avatar_url
        } catch {
          throw new Error('Failed to retrieve profile picture information')
        }
      }
      default: {
        throw new Error(`Unknown account provider ${'hive'}`)
      }
    }
  }
  /**
   * Retrieves Follower count.
   * @param {String|RefLink} reflink
   */
  static async getFollowerCount(reflink: { source: { value: any }; toString: () => any }) {
    if (!(reflink instanceof RefLink)) {
      reflink = RefLink.parse(reflink)
    }
    switch (reflink.source.value) {
      case 'hive': {
        const followerCount = await PromiseIPC.send(
          'distiller.getFollowerCount',
          reflink.toString(),
        )
        return followerCount
      }
      default: {
        throw new Error(`Unknown account provider ${reflink.source.value}`)
      }
    }
  }
  /**
   * Retrieves "about" text for user profiles
   * @param {String|RefLink} reflink
   */
  static async getProfileAbout(reflink: { source: { value: any }; root: any }) {
    if (!(reflink instanceof RefLink)) {
      reflink = RefLink.parse(reflink)
    }
    switch (reflink.source.value) {
      case 'hive': {
        // type error: 2nd argument string does not match function signature
        // const userAboutText = JSON.parse(
        //   ((await PromiseIPC.send('distiller.getAccount', `hive:${reflink.root}` as any)) as any)
        //     .json_content.posting_json_metadata,
        // ).profile.about
        const res = (await PromiseIPC.send(
          'distiller.getAccount',
          `hive:${reflink.root}` as any,
        )) as any

        if (!res?.json_content?.posting_json_metadata) {
          return ''
        } else {
          const metadata = JSON.parse(res.json_content.posting_json_metadata)
          return metadata.profile.about
        }
      }
      default: {
        throw new Error(`Unknown account provider ${reflink.source.value}`)
      }
    }
  }
  /**
   * Retrieves balances for user
   * @param {String|RefLink} reflink
   */
  static async getAccountBalances(reflink: { source: { value: any }; root: any }) {
    if (!(reflink instanceof RefLink)) {
      reflink = RefLink.parse(reflink)
    }
    switch (reflink.source.value) {
      case 'hive': {
        let accountBalances =
          // type error: 2nd argument (string) does not match function signature
          ((await PromiseIPC.send('distiller.getAccount', `hive:${reflink.root}` as any)) as any)
            .json_content

        accountBalances = {
          hive: accountBalances.balance,
          hbd: accountBalances.sbd_balance,
        }
        return accountBalances
      }
      default: {
        throw new Error(`Unknown account provider ${reflink.source.value}`)
      }
    }
  }
}
