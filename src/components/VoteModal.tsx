import * as React from 'react';
import {
  Slider,
  Modal, 
  Typography, 
  Button, 
  Box
} from '@mui/material';
import { modal } from 'src/styles';

export default function VoteModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <span onClick={handleOpen} style={{cursor: 'pointer'}}>{props.children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.type} for @{props.owner || props.author}
          </Typography>
          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          <Button style={{float: 'right'}} onClick={() => {
            // TODO: cast vote
          }}>Upvote</Button>
        </Box>
      </Modal>
    </span>
  );
}