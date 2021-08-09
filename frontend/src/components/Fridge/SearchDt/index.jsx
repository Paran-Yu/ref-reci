import React from "react";
import {
  Grid,
  IconButton,
  InputBase,
  Paper,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Menu,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FormatAlignJustify } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    background: "#F2EDE7",
  },
  input: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },
  iconButton: {
    padding: 10,
  },
  radi: {
    height: "100%",
    display: "flex",

    margin: theme.spacing(2),
  },
  menu: {
    paddingTop: "0%",
    textAlign: "center",
    background: "#F9BC15",
    marginRight: theme.spacing(2),
    color: "#45434C",
  },
  first: {
    marginTop: 0,
  },
}));
const options = ["소분류1", "소분류2", "소분류3", "소분류4"];
const SearchDt = (props) => {
  const { catName } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
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
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Grid container justifyContent="center">
      <Grid container>
        <Grid item xs={2}>
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
        <Grid item xs={10}>
          <Grid>
            <Paper className={classes.root}>
              <InputBase xs={8} className={classes.input} placeholder="검색어를 입력하세요" />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid justifyContent="center" alignItems="center">
            <FormControl component="fieldset">
              <RadioGroup value={value} onChange={handleChange} row>
                <FormControlLabel label="정렬 없음" control={<Radio />} value="" />
                <FormControlLabel label="이름 순" control={<Radio />} value="name" />
                <FormControlLabel label="유통기한 순" control={<Radio />} value="endDay" />
                <FormControlLabel label="구매일자 순" control={<Radio />} value="buyDay" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SearchDt;
