import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import React from 'react';

export default function MyInfo() {
  return (
    <div>
      <Typography
      variant="h5">
        닉네임 : 
      </Typography>
      <Typography
      variant="h5">
        아이디(Email) : 
      </Typography>
      <Button
      fullWidth
      size="large"
      variant="contained"
      color= "primary"
      >
        회원정보수정
      </Button>
      <Button
      fullWidth
      size="large"
      variant="contained"
      color= "primary"
      >
        회원탈퇴
      </Button>
    </div>
  )
}