import React from 'react';

export default function Authentication() {
  return (
    <box>
      <div>
        회원정보를 수정하시려면 비밀번호를 입력하세요.
      </div>
      <form>
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="current-password"
        />
        <Button
        fullWidth
        size="large"
        variant="contained"
        color= "primary"
        className={classes.submit}
        onClick={async() => {
            if (userDatas === true){
              console.log('정보수정 가능')
            } else {
              alert('비밀번호가 틀렸습니다.')
            }
          }}
        >
          확인
        </Button>
      </form>
    </box>
  )
}