import React from 'react';
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
    return data.data;
  }
  catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

export default function DeleteUser() {
  return (
    <div>
      <div>
        정말로 탈퇴하시겠습니까?
        냉장고를 효과적으로 관리하기에는 리프레시가 짱이에요
      </div>
      <Button
      >
        확인
      </Button>
    </div>
  )
}