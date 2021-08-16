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

const LargeItem = (props) => {
  const { dt, idx } = props;
  const st = useStyles();
  return (
    <Link
      to={{
        pathname: "/fridge",
        state: {
          catName: props.dt,
          data: props.data,
        },
      }}
      className={st.link}
      style={{ textDecoration: "none" }}
    >
      <ButtonBase className={st.catIt}>{props.dt}</ButtonBase>
    </Link>
  );
};
export default LargeItem;
