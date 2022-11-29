import { Divider, Grid, Paper } from "@mui/material";
import timeSince from "utils/timeSince";
import { UserPicture } from "./UserPicture";
import { VoteCommentPayout } from "./VoteCommentPayout";
import HiveMarkdown from "./HiveMarkdown";
import Link from "next/link";

export default function Comment(reply: any) {
  return (<Paper style={{ padding: "15px 15px", margin: 10, width: '100%' }}>
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <UserPicture owner={reply.author} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Link href={`/@${reply.author}`}>
          <a>
            <h4 style={{ margin: 0, textAlign: "left" }}>{reply.author}</h4>
          </a>
        </Link>
        <HiveMarkdown>{reply.body}</HiveMarkdown>
        <p style={{ textAlign: "left", color: "gray" }}>
          {timeSince(new Date(reply.created))}
        </p>
      </Grid>
    </Grid>
    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    <VoteCommentPayout {...reply} style={{marginBottom: '100px'}} owner={reply.author} />
    {reply.replies.length ? (<Divider variant="fullWidth" style={{ margin: "30px 0" }} />) : null}
    {reply.replies.map((subReply: any) => (
      <Comment key={`@${reply.author}/${reply.permlink}`} style={{marginTop: '1px'}} {...subReply} />
    ))}
  </Paper>);
}