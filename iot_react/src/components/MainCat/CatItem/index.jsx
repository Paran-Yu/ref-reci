import Ract, { useState, useEffect, } from 'react';
import { Grid, ButtonBase, makeStyles, GridList } from '@material-ui/core';
import { Router, Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    catIt: {
        width: '100%',
        height: '100%',
        color: 'black'
    }

}))

const CatItem = (props) => {
    const { dt, idx } = props;
    const st = useStyles();
    return (
        <Link to={{
            pathname: '/stuff',
            state: {
                catName: dt.CatName
            }
        }}
            style={{ textDecoration: "none" }}>
            <ButtonBase className={st.catIt}>
                {dt.CatName}
            </ButtonBase>
        </Link>
    )
}
export default CatItem;