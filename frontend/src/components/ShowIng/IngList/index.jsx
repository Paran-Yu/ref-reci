import React, { useState, useEffect, } from 'react';
import { Grid, makeStyles, GridList, Button, GridListTile } from '@material-ui/core';
import catDt from './dump.json';
import IngItem from '../IngItem';
import { Router, Link } from 'react-router-dom';
const useGetdata = () => {
    const [catItemDatas, setCatItemDatas] = useState([]);
    const getDatas = async () => {
        setCatItemDatas(catDt);
    }
    useEffect(() => {
        getDatas();
    }, []);
    return catItemDatas;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        justifyContent: 'center'
    },
    grid: {
        width: '30wh',
        height: '80%',
        margin: '20px 0px'
    },
    list: {
        width: '100%',
    },

}))


const IngList = () => {
    const st = useStyles();
    const data = useGetdata();
    const [cnt, setCnt] = React.useState(0);
    const [arr, setArr] = React.useState({
        "cnt": 0,
        "arr": []
    });
    const addDt = (re) => {
        setCnt(re);
        console.log(re)
    }
    return (
        <div className={st.root}>
            <Link to={{
                pathname: '/reci',
                state: arr
            }}>
                <Button>{cnt}</Button>
            </Link>
            <GridList cols={5} className={st.list}>
                {data.map((dt, idx) => (
                    <GridListTile item key={idx} xs={2.5} className={st.grid}>
                        <IngItem dt={dt} cnt={cnt} arr={arr} showDt={addDt} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
export default IngList;