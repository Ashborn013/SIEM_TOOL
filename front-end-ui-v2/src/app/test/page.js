"use client"

import {React,useState} from 'react'
import Button from '@mui/material/Button';
import SimpleSnackbar from '@/components/SimpleSnackbar';

export default function Page() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <SimpleSnackbar open={open} handleClose={handleClose} />
    </div>
  );
}