export const OAUTH2_CLIENTS = {
  '2vn8qv3lcg5r9qtd4camrq7l9u': {
    secret: '10f0i9grg9ulp0nlodj84s1ukijve2oidj3jirq23hbr6squ6q8s',
    redirect_urls: [
      'http://localhost:13050/login',
      'http://localhost:3005/login',
      'https://studio.3speak.online/login',
      'https://studio.3speak.co/login',
      'https://studio.3speak.tv/login',
      'https://testnet.studio.3speak.tv/login'
    ]
  },
  '63j1t9ou6kc6l8bofb2j026r77': {
    secret: '1vquqklkhjm5jbnvir7r4jkuviqb5dcgi4o1f8fu5ajrv4jb8g26',
    redirect_urls: [
      'http://localhost:9400/auth/callback',
      'https://3speak.online/auth/callback',
      'https://3speak.co/auth/callback',
      'https://3speak.tv/auth/callback',
      'https://testnet.3speak.tv/auth/callback',
      'https://wehmoen.int.3speak.co/auth/callback'
    ]
  },
  'ks5989j97q56ivnobl2l8371f': {
    secret: '1sdogn8a92i1f8ucma7g8jo5jgcdjht736puu4jjoaqui8h5t932',
    redirect_urls: [
      'http://localhost:3000/oauth/3speak/redirect',
    ],
    jwt_secret: 'zdQpC2seBFmAr6q02nqQmShUnc2wNplQk9XAWbKFJhkD0UmugsgLyJQ3LhWaueizQkxJ5NemmFAhaagncmDAAd62RQQwZnw7BFrdFni4u2UFF6gvPZ75LG4AWO4NlXfGO1vPfDhq7LrEde9oRPD6ZhLUCm1K7R7HzfSqSTN9Yv8c0abGuwCOpwgSHo9F5HxUzOPvWS2gnOay34giAYPv4vvh43HXIi6KwhpUiuu2mOi86lp95JWFJGKLpY3BU2x8N8FQiUlX9QyK3BxDUOyJQhe2m5X6pkCbkPM98ITuoN7PA7VgfeqQjLFvvgj4wmaArV7SYIdUN4A5u3ED6FdEzorbz8KjVHxJelR8e1xYZmFbTlnouafWOUU3w2Lz54XetFWYIYrbSBfAkfB4jAVAQIWq57H1ljw5SLGSueJ68JZQ6FAChVVrSqqkgzUeSJHj6t0avOYhw6TDKQ92p3LspP90i56zy7ZimxrK5q3hkhA4wZqjVczhPtaOcRFEzHrm341Rk4H2vgRi2U4nw9gqePblu7Kv0YK9KuYakJWfaBfHFDlGykAl11fUc6EDpG7Xo4ORbB7Dp0DGw5n5UJF86lrfMjLXEPUIYPXXMu9e7OleNRj5fyla4QEbgMJmckEzypOweaRxVvAnKu8wBrjWq8yTgrL2Pt20II7FJmA05IJ4CuUzWd8Kykv44mRItfd9VCp3lPZsCto2JRY1LqkvbPRY5aQPAoK020HBDlDztakmW5EjWga5qexLyFlx5y4rfjOxNHgsEw6DNZtqyPaRP28wJcR8U10mGLHgj5r3hTpFeyQhzqzilybuyj4MPcD3p1XY0siKQSQNAIxdPUID6L9Hj1ihgrFxmRMdRNubPn5uiHfzadlt5T9ZNF5bDlBFN3Jb93bl4IfGlkaPty4cWKg52mdSfPepR7autMDC2m50t9NuGPU0xbGUNp4cAkLpWSa85OXNDGKHB10PUALRAzJ7YXcbY5V5rYYK2WE36i2lQ1QltZEmJFgYYS0zzhjz'
  },
  'I49W4FeNrqprDo1DcCl3aJ0I8': {
    secret: 'Dw6cIrH7cWqu6H6kxmx5HTdCPVWJwySo5Aqz6FtjFkvjOsO3WtMU',
    redirect_urls: [
      'http://localhost:3000/auth/redirect',
    ],
  }
}

export const HIVESQL_USERNAME = process.env.HIVESQL_USERNAME || 'HIVESQL_USERNAME_FILLIN'
export const HIVESQL_PASSWORD = process.env.HIVESQL_PASSWORD || 'HIVESQL_PASSWORD_FILLIN'

export interface RefLinkSource {
  value: string
  type: string
}

export class Reflink {
  link: any
  source: RefLinkSource | undefined
  constructor(link: any) {
    this.link = link

    if (this.link[0]) {
      const mid = this.link[0]
      const source = {} as any
      switch (mid[0]) {
        case '$': {
          source.value = mid.slice(1)
          source.type = 'state'
          break
        }
        case '#': {
          source.value = mid.slice(1)
          source.type = 'tag'
          break
        }
        default: {
          source.value = mid
          source.type = 'source'
        }
      }
      this.source = source
    }
  }
  get type() {
    switch (this.link.length) {
      case 3: {
        return 'permlink'
      }
      case 2: {
        return 'root'
      }
      case 1: {
        return 'source'
      }
    }
  }
  get permlink() {
    return this.link[2]
  }
  get root() {
    return this.link[1]
  }
  toString() {
    return this.link.join(':')
  }
  static isValid(link: any) {
    try {
      Reflink.parse(link)
      return true
    } catch {
      return false
    }
  }
  static parse(link: any) {
    if (link instanceof Reflink) {
      return link
    }
    if (typeof link !== 'string') {
      console.log('invalid reflink')
      return;
    }
    link = link.split(':')
    return new Reflink(link)
  }
}

export const IPFS_SELF_MULTIADDR = '/ip4/127.0.0.1/tcp/5001'
export const IPFS_HOST = '127.0.0.1'