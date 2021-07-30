import Ract, { useState, useEffect, } from 'react';
import { Grid, makeStyles, GridList } from '@material-ui/core';
import catDt from './dump.json';
import CatItem from '../CatItem';
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
        border: '1px solid #dfdfdf',
        justifyContent: 'center',
    },
    list: {
        width: '80%'
    },

}))


const CatList = () => {
    const st = useStyles();
    const data = useGetdata();
    return (
        <div className={st.root}>
            <GridList cols={5} className={st.list}>
                {data.map((dt, idx) => (
                    <Grid key={idx} dt={dt} xs={2.5} className={st.grid}>
                        <CatItem dt={dt} className={st.catIt} />
                    </Grid>
                ))}
            </GridList>
        </div>
    )
}
export default CatList;