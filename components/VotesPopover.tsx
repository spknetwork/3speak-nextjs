import * as React from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Link from 'next/link';

export const VotesPopover = (props: any) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <span style={{fontSize: '69'}}>
          <span {...bindTrigger(popupState)} style={{cursor: 'pointer'}}>
            {props.votes.length}
          </span>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            
          >
            <div style={{padding: '5px 5px'}}>
              <Typography sx={{ p: 2 }}>{props.type}s for {props.voter}</Typography>
              {props.votes.map((vote: any) => {
                return <div key={`vote/${vote.voter}/${vote.weight}`}><Link href={`https://peakd.com/@${vote.voter}`}><a>@{vote.voter}</a></Link>: ${vote.payout}</div>
              })}
            </div>
          </Popover>
        </span>
      )}
    </PopupState>
  );
}
