import React from "react";
import { ButtonBase, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  catIt: {
    width: "100%",
    height: "100%",
    color: "#45423C",
    fontWeight: "bold",
    fontSize: "large",
  },
  link: {
    width: "100%",
    height: "100%",
  },
}));

const MiddleItem = (props) => {
  const { dt, idx } = props;
  const st = useStyles();
  
  const btn = () => {
    props.setSub(dt.c2ID, dt.classification2Name);
  };

  return (
    <ButtonBase className={st.catIt} onClick={btn}>
      {dt.classification2Name}
    </ButtonBase>
  );
};
export default MiddleItem;
