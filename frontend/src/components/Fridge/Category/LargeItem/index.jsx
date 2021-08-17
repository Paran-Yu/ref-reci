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
  const { dt, idx, data } = props;
  const st = useStyles();

  return (
    <Link
      to={{
        pathname: "/fridge",
        state: {
          catID: dt.c1ID,
          catName: dt.classification1Name,
          data: data,
        },
      }}
      className={st.link}
      style={{ textDecoration: "none" }}
    >
      <ButtonBase className={st.catIt}>{dt.classification1Name}</ButtonBase>
    </Link>
  );
};
export default LargeItem;
