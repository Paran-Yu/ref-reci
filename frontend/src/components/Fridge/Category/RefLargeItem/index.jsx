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

const RegLargeItem = (props) => {
  const { dt, idx, data } = props;
  const st = useStyles();
  const btn = () => {
    props.setMain(dt.c1ID, dt.classification1Name);
  };
  return (
    <ButtonBase className={st.catIt} onClick={btn}>
      {dt.classification1Name}
    </ButtonBase>
  );
};
export default RegLargeItem;
