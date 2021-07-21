import React, { useState, useEffect, } from 'react';
import { Grid, GridList, makeStyles } from '@material-ui/core';
import FavDt from './dump.json';
import FavItem from '../FavItem';

const useGetdata = () => {
    const [favItemDatas, setFavItemDatas] = useState([]);
    const getDatas = async () => {
        setFavItemDatas(FavDt);
    }
    useEffect(() => {
        getDatas();
    }, []);
    return favItemDatas;
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
}));




const FavRecList = () => {
    const Favs = useGetdata();
    const classes = useStyles();
    const len = Favs.length;
    console.log(len)
    return (
        <Grid container
            className={classes.root}
            justifyContent="center" >
            <GridList
                cellHeight={'auto'}
                cols={len}
                spacing={2}
            >
                {Favs.map((dt, idx) => (
                    <Grid key={idx} item>
                        <FavItem
                            dt={dt}
                            idx={idx}
                        />
                    </Grid>
                ))}
            </GridList>
        </Grid>
    )
}

export default FavRecList;