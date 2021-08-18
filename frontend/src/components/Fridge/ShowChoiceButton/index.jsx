import React from "react";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import Badge from "@material-ui/core/Badge";

export default function ShowChoiceButton(props) {
  const [count, setCount] = React.useState(0);

  if (props.selectIng.length != count) {
    console.log("chocie button");
    console.log(props.selectIng);
    setCount(props.selectIng.length);
  }
  return (
    <div>
      <Badge color="error" badgeContent={count}>
        <RestaurantMenuIcon />
      </Badge>
    </div>
  );
}
