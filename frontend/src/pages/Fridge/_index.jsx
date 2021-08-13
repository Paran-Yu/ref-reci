import { useState, React } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Grid, makeStyles, Typography, Button, createMuiTheme } from "@material-ui/core";
import SearchBar from "../../components/Fridge/SearchBar";
import IngList from "../../components/Fridge/Category/SmallList";
import Container from "@material-ui/core/Container";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
// import BottomBar
// import FloatingActionButton
// import TopBar

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    alignItems: "center",
    width: "100%",
    margin: "auto",
  },
  title: {
    color: "#45423C",
    marginTop: "60px",
  },
  link: {
    position: "fixed",
    right: theme.spacing(4),
    top: theme.spacing(20),
  },
  btn: {
    background: "#F19920",
  },
  grid: {
    width: "100%",
  },
  root1: {
    padding: "2px 4px",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

const Fridge = (props) => {
  const { catName } = props.location.state != undefined ? props.location.state : "";
  const [cnt, setCnt] = useState(0);

  const classes = useStyles();
  const baseTheme = createMuiTheme();
  const addCnt = (re) => {
    setCnt(re);
  };
  return (
    <Container fixed>
      <Grid>
        <TopBar />
        <Grid container mt={5} spacing={2} alignItems="center" justify="center">
          <Grid item className={classes.grid}>
            <Typography align="center" variant="h3" gutterBottom className={classes.title}>
              나의 냉장고
            </Typography>
          </Grid>
          <Grid item>
            <Link
              to={{
                pathname: "/recipe",
                state: cnt,
              }}
              className={classes.link}
              style={{ textDecoration: "none" }}
            >
              <Button
                className={classes.btn}
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                size="large"
              >
                {cnt}
              </Button>
            </Link>
          </Grid>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              borderBottom: "4px solid #aaa",
              lineHeight: "0.1em",
              margin: "auto",
            }}
          ></div>
          <Grid item xs={12}>
            <Grid item xs={12} className={classes.root}>
              <SearchBar catName={catName} />
            </Grid>
            <Grid item xs={12} className={classes.root1}>
              <IngList cnt={cnt} addCnt={addCnt.bind()} />
            </Grid>
          </Grid>
          <Grid>
            <BottomBar />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Fridge;
