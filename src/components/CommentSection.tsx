import * as React from 'react';
import Comment from './Comment';

export default function CommentSection(props: any) {

  return (
    <>
      {props.replies.map((reply: any) => {
        return (
          <Comment key={`@${reply.author}/${reply.permlink}`} {...reply} />
        )
      })}
    </>
  );
}


