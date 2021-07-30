import React, { useState, useEffect, } from 'react';
import {
    Grid, makeStyles
} from '@material-ui/core';
import SearchDt from '../../components/SearchDt';
import IngList from '../../components/ShowIng/IngList';
import Layout from '../../layout';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        alignItems: 'center',
        width: '80%',
    },
}));
const SecComp = (props) => {
    const { catName } = props.location.state;
    const classes = useStyles();
    return (
        <div>
            <Layout />
            <Grid container>
                <Grid className={classes.root}>
                    <SearchDt catName={catName} />
                </Grid>
                <Grid>
                    <IngList />
                </Grid>
            </Grid>
        </div>
    )
}
export default SecComp;