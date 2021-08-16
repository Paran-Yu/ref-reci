import React, { useState, useEffect } from "react";
import { emphasize, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs(props) {
  const [smallCat, setSmallCat] = useState(false);
  useEffect(() => {
    if (props.catName != "전체") setSmallCat(true);
    else setSmallCat(false);
  });
  const handleClick = (re) => {
    console.log(re);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        href="#"
        label="나의 냉장고"
        icon={<HomeIcon fontSize="small" />}
        onClick={handleClick(1)}
      />
      <StyledBreadcrumb component="a" href="#" label={props.catName} onClick={handleClick(2)} />
      {props.catName != "전체" ? <StyledBreadcrumb label={props.subCatName} /> : ""}
    </Breadcrumbs>
  );
}
