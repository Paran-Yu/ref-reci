import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
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
  const datas = props.datas;
  let list = [];
  
  const showDt = (productName, productID) => {
    let check = false;
    if (list.length == 0) list = props.selectIng;
    for (let i = 0; i < list.length; i++) {
      if (list[i].category == productID) {
        check = true;
        break;
      }
    }

    if (!check){
      list = list.concat({ name: productName, category: productID });
    } 
    else {
      list = list.filter((Ing) => Ing.name != productName);
    }
    props.addCnt(list);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {datas.map((dt, idx) => (
          <Grid item key={idx} xs={4} lg={3}>
            <IngItem
              selectIng={props.selectIng}
              dt={dt}
              cnt={props.cnt}
              showDt={showDt.bind()}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default SmallList;
