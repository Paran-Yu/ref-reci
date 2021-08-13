import React, { useStyles } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const RadioButton = (props) => {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="radio-group" name="sorted" value={value} onChange={handleChange}>
        <FormControlLabel value="validate" control={<Radio />} label="유효기간 남은 순" />
        <FormControlLabel value="name" control={<Radio />} label="이름 순" />
        <FormControlLabel value="new" control={<Radio />} label="최신 순" />
      </RadioGroup>
    </FormControl>
  );
};
export default RadioButton;
