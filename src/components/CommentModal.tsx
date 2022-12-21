import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { modal } from 'src/styles'

export default function CommentModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <span onClick={handleOpen}>{props.children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leave a reply to {props.owner}
          </Typography>
          <TextField id="outlined-basic" label="Reply" variant="outlined" multiline minRows={3} style={{width: '100%'}} />
          <Button style={{float: 'right'}} onClick={() => {
            // TODO: post comment
          }}>
            Post
          </Button>
        </Box>
      </Modal>
    </span>
  );
}