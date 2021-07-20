import React, { useState, useEffect, } from 'react';
import { Grid, GridList } from '@material-ui/core';
import FavDt from './dump.json';
const useGetdata = (value) => {
    const [favItemDatas, setFavItemDatas] = useState([]);
    const getDatas = async () => {
        setFavItemDatas(FavDt);
    }
    useEffect(() => {
        getDatas();
    }, [value]);
}
const FavRecList = () => {
    return (
        <Grid container>
            <GridList
                cols={3}
                cellHeight={'auto'}>
                <p>sdf</p>
            </GridList>
        </Grid>
    )
}

export default FavRecList;