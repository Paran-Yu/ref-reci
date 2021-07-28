import React from 'react';
import {
    Grid, IconButton, InputBase, Paper, MenuItem,
    List, ListItem, ListItemText, Menu, makeStyles
    , Radio, RadioGroup, FormControlLabel, FormLabel,
    FormControl, Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { FormatAlignJustify } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    radi: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    top: {
        width: '100%',
        alignItems: 'flex-start'
    }
}));
const options = [
    '소분류1',
    '소분류2',
    '소분류3',
    '소분류4',
];
const SearchDt = (props) => {
    const { catName } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('');
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
        <Grid container>
            <Grid className={classes.top} >
                <Paper className={classes.root}>
                    <List component="nav" aria-label="Device settings">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            onClick={handleClickListItem}
                        >
                            <ListItemText primary={catName} secondary={options[selectedIndex]} />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
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
                    <InputBase
                        className={classes.input}
                        placeholder="검색어를 입력하세요"
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
            </Grid>
            <Grid className={classes.radi}>
                <FormLabel component="legend">정렬 방식</FormLabel>
                <FormControl component="fieldset"  >
                    <RadioGroup value={value} onChange={handleChange} row >
                        <FormControlLabel label="정렬 없음" control={<Radio />} value="" />
                        <FormControlLabel label="이름 순" control={<Radio />} value="name" />
                        <FormControlLabel label="유통기한 순" control={<Radio />} value="endDay" />
                        <FormControlLabel label="구매일자 순" control={<Radio />} value="buyDay" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}
export default SearchDt;