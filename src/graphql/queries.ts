import { gql } from "@apollo/client";

export const GET_LEADER_BOARD = gql`
  query MyQuery {
    leaderBoard {
      items {
        author
        author_profile {
          ... on CeramicProfile {
            id
            name
          }
        }
        rank
        score
      }
      total_active_creators
    }
  }
`;

export const GET_RELATED_FEED = gql`
  query MyQuery {
    relatedFeed {
      items {
        body
        children {
          body
          children {
            body
            children {
              body
              title
            }
          }
        }
        created_at
      }
    }
  }
`;
export const GET_SOCIAL_FEED = gql`
  query MyQuery {
    socialFeed(
      apps: {
        _eq: ""
        _gt: 10
        _gte: 10
        _in: ""
        _lt: 10
        _lte: 10
        _ne: ""
        _nin: ""
        _regex: ""
      }
    ) {
      items {
        body
        children {
          body
        }
        ... on HivePost {
          parent_author
          parent_permlink
          body
          children {
            body
            children {
              body
            }
          }
          community
        }
      }
    }
  }
`;

export const GET_TRENDING_TAGS = gql`
  query MyQuery {
    trendingTags(limit: 10) {
      tags {
        score
        tag
      }
    }
  }
`;

export const GET_TRENDING_FEED = gql`
  query MyQuery {
    trendingFeed(
      apps: {
        _eq: ""
        _gt: 10
        _gte: 10
        _in: ""
        _lt: 10
        _lte: 10
        _ne: ""
        _nin: ""
        _regex: ""
      }
      feedOptions: {
        byFollower: ""
        includeCeramic: false
        includeComments: false
      }
    ) {
      items {
        body
        author {
          id
          profile
          username
        }
      }
    }
  }
`;

export const GET_SYNC_STATE = gql`
  query MyQuery {
    syncState {
      blockLag
      latestBlockLagDiff
      syncEtaSeconds
    }
  }
`;

export const GET_SOCIAL_POST = gql`
  query MyQuery {
    socialPost(author: "", permlink: "") {
      ... on HivePost {
        parent_author
        parent_permlink
        app_metadata
        body
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query MyQuery {
    profile {
      ... on HiveProfile {
        id
        name
      }
    }
  }
`;
// latestFeed {
//   items {
//     body
//     created_at
//     parent_author
//     parent_permlink
//     permlink
//     title
//     updated_at
//     ... on HivePost {
//       parent_author
//       parent_permlink
//       app_metadata
//       body
//       community
//       created_at
//       flags
//     }
//   }
// }
export const GET_COMMUNITIES = gql`
  query MyQuery($id: String) {
    community(id: $id) {
      about
      created_at
      is_nsfw
      lang
      subscribers
      title
      trendingFeed {
        items {
          author {
            id
          }
          ... on HivePost {
            parent_author
            parent_permlink
            community
            title
            author {
              username
              profile
              id
            }
            spkvideo
          }
        }
      }
      latestFeed {
        items {
          author {
            id
          }
          ... on HivePost {
            parent_author
            parent_permlink
            author {
              id
              profile
              username
            }
            community
            spkvideo
            title
          }
        }
      }
    }
  }
`;

export const GET_FOLLOWS = gql`
  query MyQuery {
    follows(id: "") {
      followers_count
      followings_count
      followers {
        followed_at
        follower
        follower_profile {
          ... on CeramicProfile {
            id
            name
          }
        }
        following
        following_profile {
          ... on CeramicProfile {
            id
            name
          }
        }
      }
      followings {
        followed_at
        follower
        follower_profile {
          ... on CeramicProfile {
            id
            name
          }
        }
        following
        following_profile {
          ... on CeramicProfile {
            id
            name
          }
        }
      }
    }
  }
`;
