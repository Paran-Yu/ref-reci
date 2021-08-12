import React, { useState } from "react";
import {
  Grid,
  Paper,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Menu,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menu: {
    paddingTop: "0%",
    textAlign: "center",
    background: "#F9BC15",
    marginRight: theme.spacing(2),
    color: "#45434C",
  },
}));
const options = ["소분류1", "소분류2", "소분류3", "소분류4"];
const Breadcrumb = (props) => {
  const { catName } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <Grid container justifyContent="center">
      <Grid container>
        <Grid item>
          <Paper className={classes.menu}>
            <List item component="nav">
              <ListItem button onClick={handleClickListItem}>
                <ListItemText
                  primary={
                    <Typography
                      align="center"
                      style={{
                        fontSize: "large",
                        fontWeight: "bold",
                      }}
                    >
                      {catName}
                    </Typography>
                  }
                  secondary={
                    <Typography align="center" style={{ fontWeight: "normal" }}>
                      {options[selectedIndex]}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Paper>
          <Menu
            classes={classes.menu}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Breadcrumb;
