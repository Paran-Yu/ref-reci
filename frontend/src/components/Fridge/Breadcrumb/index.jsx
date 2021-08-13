import React, { useState } from "react";
import { emphasize, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomizedBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        href="#"
        label="나의 냉장고"
        icon={<HomeIcon fontSize="small" />}
        onClick={handleClick}
      />
      <StyledBreadcrumb
        component="a" 
        href="#" 
        label="대분류" 
        onClick={handleClick}
      />
      <StyledBreadcrumb
        label="소분류"
        onClick={handleClick}
      />
    </Breadcrumbs>
  );
}


// const useStyles = makeStyles((theme) => ({
//   menu: {
//     paddingTop: "0%",
//     textAlign: "center",
//     background: "#F9BC15",
//     marginRight: theme.spacing(2),
//     color: "#45434C",
//   },
// }));
// const options = ["소분류1", "소분류2", "소분류3", "소분류4"];
// const Breadcrumb = (props) => {
//   const { catName } = props;
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(1);
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleClickListItem = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setAnchorEl(null);
//   };

//   return (
//     <Grid container justifyContent="center">
//       <Grid container>
//         <Grid item>
//           <Paper className={classes.menu}>
//             <List item component="nav">
//               <ListItem button onClick={handleClickListItem}>
//                 <ListItemText
//                   primary={
//                     <Typography
//                       align="center"
//                       style={{
//                         fontSize: "large",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {catName}
//                     </Typography>
//                   }
//                   secondary={
//                     <Typography align="center" style={{ fontWeight: "normal" }}>
//                       {options[selectedIndex]}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             </List>
//           </Paper>
//           <Menu
//             classes={classes.menu}
//             anchorEl={anchorEl}
//             keepMounted
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             {options.map((option, index) => (
//               <MenuItem
//                 key={option}
//                 selected={index === selectedIndex}
//                 onClick={(event) => handleMenuItemClick(event, index)}
//               >
//                 {option}
//               </MenuItem>
//             ))}
//           </Menu>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };
// export default Breadcrumb;

