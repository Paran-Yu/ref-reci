import React, { useState, useEffect, } from 'react';
import { Grid, makeStyles, GridList, ButtonBase, Button, GridListTile } from '@material-ui/core';
import catDt from './dump.json';
import IngItem from '../IngItem';
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
        height: '100%'
    },
    list: {
        width: '100%',
    },

}))


const IngList = () => {
    const st = useStyles();
    const data = useGetdata();
    const [flags, setFlag] = React.useState(false);

    return (
        <div className={st.root}>
            <GridList cols={5} className={st.list}>
                {data.map((dt, idx) => (
                    <GridListTile item key={idx} xs={2.5} className={st.grid}>
                        <IngItem dt={dt} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
export default IngList;