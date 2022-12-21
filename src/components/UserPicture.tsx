import { Avatar } from "@mui/material";
import Link from "next/link"

export const UserPicture = (props: { owner: string; }) => {
  return (
    <Link href={`/@${props.owner}`}>
      <a>
        <Avatar alt={`${props.owner}'s profile picture`} src={`https://images.hive.blog/u/${props.owner}/avatar`} />
      </a>
    </Link>
  )
}