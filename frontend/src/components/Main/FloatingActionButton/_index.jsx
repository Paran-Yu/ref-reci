import React from 'react';
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import KitchenIcon from '@material-ui/icons/Kitchen';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BookIcon from '@material-ui/icons/Book';
import PersonIcon from '@material-ui/icons/Person';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import DetailsIcon from '@material-ui/icons/Details';

const useStyles = makeStyles(theme => ({

  speedDial: {
    position: 'absolute',
    color: "#f19920",
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <KitchenIcon />, name: '나의 냉장고' },
  { icon: <BookIcon />, name: '나의 레시피' },
  { icon: <DateRangeIcon />, name: '달력' },
  { icon: <PersonIcon />, name: '마이페이지' },
];

export default function FloatingActionButton() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('up');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const iconHandler = open ? <DetailsIcon /> : <ChangeHistoryIcon />

  return (
    <div>
      <Zoom
        in={true}
        timeout={
          {enter:500, exit: 500}
        }
        unmountOnExit
      >
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={iconHandler}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </Zoom>
    </div>
  );
}

// import React from "react";
// import { Grid, makeStyles, Fab } from "@material-ui/core";
// import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
// import PersonIcon from "@material-ui/icons/Person";
// import KitchenIcon from "@material-ui/icons/Kitchen";
// import DateRangeIcon from "@material-ui/icons/DateRange";
// import LocalDiningIcon from "@material-ui/icons/LocalDining";
// import { green } from "@material-ui/core/colors";
// const useStyles = makeStyles((theme) => ({
//   speedDial: {
//     position: "fixed",
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
//   speedDA: {
//     backgroundColor: "#F9BC15",
//     color: "white",
//   },
//   fab: {
//     backgroundColor: "#8DB554",
//   },
// }));
// const actions = [
//   { icon: <DateRangeIcon />, name: "달력" },
//   { icon: <PersonIcon />, name: "사용자" },
//   { icon: <LocalDiningIcon />, name: "레시피" },
//   { icon: <KitchenIcon />, name: "냉장고" },
// ];
// const SideBar = () => {
//   const st = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <SpeedDial
//       ariaLabel="SpeedDial openIcon example"
//       className={st.speedDial}
//       icon={<SpeedDialIcon />}
//       onClose={handleClose}
//       onOpen={handleOpen}
//       open={open}
//       classes={{ fab: st.fab }}
//     >
//       {actions.map((action) => (
//         <SpeedDialAction
//           key={action.name}
//           icon={action.icon}
//           tooltipTitle={action.name}
//           onClick={handleClose}
//           className={st.speedDA}
//         />
//       ))}
//     </SpeedDial>
//   );
// };

// export default SideBar;
