import Ract from 'react';
import { Grid, makeStyles, createMuiTheme } from '@material-ui/core';
import FavRecList from '../../components/MainRef/FavRecList';
import { ViewContext } from '../../context/ViewContext';
import { ThemeProvider } from '@material-ui/styles';
import CatList from '../../components/MainCat/CatList';
import Layout from '../../layout';
const useStyles = makeStyles((theme) => ({
    Fav: {
        margin: 'auto'
    },
}));
const MainRef = () => {
    const baseTheme = createMuiTheme();
    const st = useStyles();
    return (
        <ThemeProvider theme={baseTheme}>
            <Layout />
            <Grid container spacing={2} className={st.Fav}  >
                <Grid item xs={12} className={st.Fav}>
                    <FavRecList />
                </Grid>
                <Grid item xs={12} className={st.Fav}>
                    <CatList />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default MainRef;