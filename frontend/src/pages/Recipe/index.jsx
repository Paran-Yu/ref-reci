import React from "react";
import { Grid, makeStyles, Typography, createMuiTheme } from "@material-ui/core";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import CardList from "../../components/Recipe/SearchRecipe/CardList";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import FloatingActionButton from "../../layout/FloatingActionButton";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    color: "#45423C",
    marginTop: "60px",
  },
  list: {
    marginTop: theme.spacing(2),
  },
  link: {
    position: "fixed",
    right: theme.spacing(4),
    top: theme.spacing(20),
  },
  btn: {
    background: "#F19920",
  },
}));
const Recipe = () => {
  const baseTheme = createMuiTheme();
  const classes = useStyles();
  return (
    <Container fixed>
      <Grid>
        <TopBar />
        <Grid container alignItems="center" justify="center">
          <Typography align="center" variant="h3" gutterBottom className={classes.title}>
            나의 레시피
          </Typography>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              borderBottom: "4px solid #aaa",
              lineHeight: "0.1em",
              margin: "10px 30px 0px",
            }}
          ></div>
        </Grid>

        <Grid item xs={12} className={classes.root}>
          <CardList />
        </Grid>
        <Grid>
          <FloatingActionButton />
          <BottomBar />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Recipe;
