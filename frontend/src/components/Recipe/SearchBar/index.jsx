/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Server 
import axios from 'axios';
import server from '../../../server.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const postDatas = async (url, cl2) => {
  try{
    const data = await axios({
      method: 'post',
      url: url,
      data: {
        cl2: cl2
      },
      headers: {
        accept: 'application/json',
      },
    })
    return data.data;
  }
  catch(e){
    console.log(`ERROR: ${e}`);
  }
}

export default function SearchBar(props, { onChildChange }) {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);
  

  const handleChange = async (event, value) => {
    setSelectedOptions(value);
  
    const len = value.length;
    let selectedSet = new Set();

    for(let i=0; i<len; i++){
      selectedSet.add(value[i].category);
    }
    const selectedArr = Array.from(selectedSet);
    
    //소분류로 레시피들을 찾아옴
    const recipes = await postDatas(`${server.ip}/recipe/search`, selectedArr)

    //부모에서 내려준 함수로  레시피 아이디들, 선택된 재료의 소분류를 넘김
    // console.log(recipes);
    console.log('부모에게 넘겨주기 시작')
    onChildChange(recipes, selectedArr);
    console.log('부모에게 넘겨주기 완료')

  }
  
  const allFoodItems = props.datas;
  
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={allFoodItems}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        onChange={handleChange}
        // onChange={(event, value) => console.log(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="검색"
            placeholder="식재료를 검색하여 레시피 재료로 추가해 보세요."
          />
        )}
      />
    </div>
  );
}

// const allFoodItems = [
//   { name: '멋쟁이 토마토', category: '과일'},
//   { name: '쌀국수 밀키트', category: '인스턴트'},
//   { name: '유기농 유정란', category: '계란'},
//   { name: 'CJ가 직접 끓인 사골국', category: '인스턴트'},
//   { name: '데이터 좀 넣자', category: '과일'},
//   { name: '내가 먹고 싶은 음식', category: '과일'},
//   { name: '지금은 배불러서...', category: '과일'},
//   { name: '유부초밥', category: '과일'},
//   { name: '맛있는 피자', category: '과일'},
//   { name: '싱싱한 사과', category: '과일'},
//   { name: '내 맘대로 만드는 초콜렛', category: '과일'},
//   { name: '청정원 케찹', category: '과일'},
//   { name: '다양한 상품이름', category: '과일'},
// ];
