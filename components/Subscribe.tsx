import Link from "next/link"
import { Row } from "./Grid"
import { Button } from '@mui/material';
import { useState } from "react";
import { UserPicture } from "./UserPicture";

export const Subscribe = (props: any) => {
  const [following, setFollowing] = useState(props.followerInfo.following)

  return (
    <Row>
      <div>
        <UserPicture owner={props.owner} />
      </div>
      <div style={{paddingLeft: 5, paddingTop: 2}}>
        <b><Link href={`/@${props.owner}`}><a>{props.owner}</a></Link></b>
        <br />
        <sup>{props.followerInfo.count} followers</sup>
      </div>
      <div>
        <Button
          style={{
            backgroundColor: following ? 'white' : 'black', 
            color: following ? 'black' : 'white', 
            marginTop: 4, 
            marginLeft: 25
          }}
          onClick={() => {
            // TODO: follow
            setFollowing(!following)
          }}
        >
          {following ? 'Subscribed' : 'Subscribe'}
        </Button>
      </div>
    </Row>
  )
}