import React, { useState, Component } from "react";
import { GridList, makeStyles, GridListTile, Button } from "@material-ui/core";
import FavDt from "./dump.json";
import FavItem from "../SlideItem";
import { useNowCols } from "../../../../common/MediaQueryHooks";
import "./styles.css";
import { useRef } from "react";

//Icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//server
import server from '../../../../server.json';

// const useGetdata = () => {
//   const [favItemDatas, setFavItemDatas] = useState([]);
//   const getDatas = async () => {
//     setFavItemDatas(FavDt);
//   };
//   useEffect(() => {
//     getDatas();
//   }, []);
//   return favItemDatas;
// };
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    wrap: "nowrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: 0,
    
  },
  gridList: {
    flexWrap: "nowrap",
    padding: 20,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    fontFamily: 'KoPubWorld Bold',
    fontStyle: `normal`,
    // overflowX: "scroll"
  },
  leftbutton: {
    position: "absolute",
    margin: "auto",
    left: 0,
    bottom: 90
  },
  rightbutton: {
    position: "absolute",
    margin: "auto",
    right: 0,
    bottom: 90
  }
}));

const SlideList = (props) => {
  // const [favItem, setFavItems] = useState();

    const classes = useStyles();
    const len = useNowCols();
    
    // const Favs = props.key;
    console.log("slidelist", props);
  //스크롤 관련
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;
      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }

  };

  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const onMoveRangeLeft = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft -= 100
  };

  const onMoveRangeRight = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += 200
  };

  const delay = 50;
  const onThrottleDragMove = throttle(onDragMove, delay);


  return (
    <div className={classes.root}
          >
      
      <GridList className={classes.gridList} cols={Number.isInteger(len) ? len - 1 : 1} 
          onMouseDown={onDragStart}
          onMouseMove={onThrottleDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          ref={scrollRef}>
        {props.datas.map((idx) => {
        return (<GridListTile alignItems="center" justify="center" >
          <FavItem rName={idx.rName} rimg={`${server.ip}/img?id=${idx.rImage}`}/>
        </GridListTile>)
      })}
      </GridList>
      <Button className={classes.leftbutton} onClick={onMoveRangeLeft}><ArrowBackIosIcon></ArrowBackIosIcon></Button>
      <Button className={classes.rightbutton} onClick={onMoveRangeRight}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
    </div>
  );
};

export default SlideList;
