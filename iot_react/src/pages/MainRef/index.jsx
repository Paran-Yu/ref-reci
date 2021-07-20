import react from 'react';
import { Grid } from '@material-ui/core';
import FavRecList from '../../components/MainRef/FavRecList';
const MainRef = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <FavRecList />
            </Grid>
            <Grid item xs={12} >
                <p>올레</p>
            </Grid>
        </Grid>
    )
}

export default MainRef;