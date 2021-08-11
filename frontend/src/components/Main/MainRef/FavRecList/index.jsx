import React, { useState, useEffect, Component } from "react";
import { GridList, makeStyles, GridListTile, Button } from "@material-ui/core";
import FavDt from "./dump.json";
import FavItem from "../FavItem";
import { useNowCols } from "../../../../common/MediaQueryHooks";
import "./styles.css";
import { useRef } from "react";

//Icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ScrollButton from 'react-scroll-button'

class ScrollComponent extends Component {
    render() {
        return (
            <ScrollButton 
                behavior={'smooth'} 
                buttonBackgroundColor={'red'}
                iconType={'arrow-up'}
                style= {{fontSize: '24px'}}
            />
        );
    }
}

const useGetdata = () => {
  const [favItemDatas, setFavItemDatas] = useState([]);
  const getDatas = async () => {
    setFavItemDatas(FavDt);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return favItemDatas;
};
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    wrap: "nowrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: 0,
    // overflowX: "scroll"
    
  },
  gridList: {
    flexWrap: "nowrap",
    padding: 20,
    backgroundColor: "#F2EDE7",
    width: "100%",
    height: "100%",
    overflow: "hidden"
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

const FavRecList = () => {
  const Favs = useGetdata();
  const classes = useStyles();
  const len = useNowCols();

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
    console.log(e.pageX)
    if (e.pageX > 50){
      setStartX(e.pageX - 50);
    } else {
      setStartX(0)
    }
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
        {Favs.map((dt, idx) => (
          <GridListTile key={idx} alignItems="center" justify="center" >
            <FavItem dt={dt} idx={idx} />
          </GridListTile>
        ))}
      <ScrollComponent className={classes.leftbutton}></ScrollComponent>
      </GridList>
      {/* <Button className={classes.leftbutton} onClick={onMoveRangeLeft}><ArrowBackIosIcon></ArrowBackIosIcon></Button> */}
      {/* <Button className={classes.rightbutton} ><ArrowForwardIosIcon></ArrowForwardIosIcon></Button> */}
    </div>
  );
};

export default FavRecList;
