import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));
const RadioButton = (props) => {
  const [value, setValue] = useState("");
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Grid container justifyContent="center">
      <Grid justifyItem="center" alignItems="center">
        <FormControl item component="fieldset">
          <RadioGroup value={value} onChange={handleChange} row>
            <FormControlLabel label="정렬 없음" control={<Radio />} value="" />
            <FormControlLabel label="이름 순" control={<Radio />} value="name" />
            <FormControlLabel label="유통기한 순" control={<Radio />} value="endDay" />
            <FormControlLabel label="구매일자 순" control={<Radio />} value="buyDay" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default RadioButton;
