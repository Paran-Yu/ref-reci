import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import server from '../../../server.json';

const getDelete = async (url) => {
  try {
    const data = await axios({
      method: 'get',
      url: url,
      headers: {
        accept: 'application/json',
      },
    });
    return data.data.value;
  }
  catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

const checkLogin = async (url) => {
  try {
    const data = await axios({
      method: 'get',
      url: url,
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    });
    console.log(data.data.value);
    return data.data;
  }
  catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

const clickHandler = async () => {
  const data = await getDelete(`${server.ip}/user/deleteUser`);

  if(data === 'Success'){
    alert('회원 탈퇴가 완료되었습니다.');
    window.location.replace('http://i5a203.p.ssafy.io/signin');
  }
  else if(data === 'Fail'){
    alert('오류가 발생했습니다. 다시 시도해주세요.')
  }
}

export default function DeleteUser() {
  
  useEffect(async () => {
    const loginData = await checkLogin(`${server.ip}/user/isLogin`);
    if (loginData.value === undefined) {
      window.location.replace("http://i5a203.p.ssafy.io/signin")
    }
  })

  return (
    <div>
      <div>
        정말로 탈퇴하시겠습니까?
        냉장고를 효과적으로 관리하기에는 리프레시가 짱이에요
      </div>
      <Button
        onClick={clickHandler}
      >
        확인
      </Button>
    </div>
  )
}