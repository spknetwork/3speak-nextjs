import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { VotesPopover } from './VotesPopover'
import * as React from 'react';
import VoteModal from './VoteModal';
import CommentModal from './CommentModal';

export const VoteCommentPayout = (props: any) => {
  return (
    <>
      <VoteModal type={'Upvote'} {...props}>
        <FontAwesomeIcon icon={faThumbsUp} style={{marginRight: 6}} size={'lg'} />
      </VoteModal>
      <VotesPopover votes={props.upvotes} type={'Upvote'} owner={props.owner} />

      <VoteModal type={'Downvote'} {...props}>
        <FontAwesomeIcon icon={faThumbsDown} style={{marginRight: 6, marginLeft: 20}} size={'lg'} />
      </VoteModal>
      <VotesPopover votes={props.downvotes} type={'Downvote'} owner={props.owner} />

      <span style={{marginLeft: 15}}>${props.payout}</span>

      <CommentModal owner={props.owner}>
        <span style={{marginLeft: 10, cursor: 'pointer'}}>reply</span>
      </CommentModal>
    </>
  )
}