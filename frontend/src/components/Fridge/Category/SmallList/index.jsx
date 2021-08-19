import { react, useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import IngItem from "../SmallItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  grid: {
    border: "1px solid #dfdfdf",
    textAlign: "center",
    borderRadius: "15px",
    margin: "auto",
    height: "100%",
    width: "100%",
  },
  list: {
    height: "120%",
  },
}));

const SmallList = (props) => {
  const classes = useStyles();
  // const data = catDt;
  const datas = props.datas;
  let list = [];
  
  const showDt = (productName, productID) => {
    let check = false;
    if (list.length == 0) list = props.selectIng;
    for (let i = 0; i < list.length; i++) {
      if (list[i] == productID) {
        check = true;
        break;
      }
    }

    if (!check) list = list.concat(productID);
    else list = list.filter((Ing) => Ing != productID);
    props.addCnt(list);
    // console.log("productID", productID);//방금 선택한 유저제품 아이디만 담겨 있음
    // console.log("datas", datas);//현재 대분류에 있는 유저 제품들의 이름이 들어있음
    console.log("list", list);//선택되어 있는 유저제품 아이디들이 담겨 있음


  };

  return (
    <div className={classes.root}>
      <Grid xs={12}>
        <Grid container>
          {datas.map((dt, idx) => (
            <Grid item className={classes.MainGrid} key={idx} xs={4} lg={3}>
              <Paper className={classes.grid}>
                <IngItem
                  selectIng={props.selectIng}
                  dt={dt}
                  cnt={props.cnt}
                  showDt={showDt.bind()}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
export default SmallList;
