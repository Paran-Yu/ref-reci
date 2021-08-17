import React from "react";
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import Badge from '@material-ui/core/Badge';


export default function ShowChoiceButton(props) {
  const [count, setCount] = React.useState(0);

  if (props.cnt != count) setCount(props.cnt);
  return (
    <div>
      <Badge color="secondary" badgeContent={count}>
        <RestaurantMenuIcon />
      </Badge>
    </div>
  );
}
