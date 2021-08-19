import React from "react";
import { ButtonBase, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

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
    <NavLink
      to={{
        pathname: "/fridge",
        state: {
          catID: dt.c1ID,
          catName: dt.classification1Name,
          data: data,
        },
      }}
      className={st.link}
      style={{ 
      height: '100%',
      textDecoration: "none" 
      }}
    >
      <img src={process.env.PUBLIC_URL + `/category_icon/${dt.c1ID}.jpg`} style={{ height: '100%' }}/>
      {/* <ButtonBase className={st.catIt}>{dt.classification1Name}</ButtonBase> */}
    </NavLink>
  );
};
export default LargeItem;


{/* <a href="https://kr.freepik.com/photos/food">Food 사진는 Racool_studio - kr.freepik.com가 제작함</a> */}