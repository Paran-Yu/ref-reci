import React from "react";
import { Grid, makeStyles, Fab } from "@material-ui/core";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";
import KitchenIcon from "@material-ui/icons/Kitchen";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  speedDA: {
    backgroundColor: "#F9BC15",
    color: "white",
  },
  fab: {
    backgroundColor: "#8DB554",
  },
}));
const actions = [
  { icon: <DateRangeIcon />, name: "달력" },
  { icon: <PersonIcon />, name: "사용자" },
  { icon: <LocalDiningIcon />, name: "레시피" },
  { icon: <KitchenIcon />, name: "냉장고" },
];
const SideBar = () => {
  const st = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <SpeedDial
      ariaLabel="SpeedDial openIcon example"
      className={st.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      classes={{ fab: st.fab }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
          className={st.speedDA}
        />
      ))}
    </SpeedDial>
  );
};

export default SideBar;
