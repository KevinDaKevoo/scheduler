import React from "react";
import "components/DayListItem.scss";

const classnames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classnames ("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots <= 0)
  })

  const formatSpots = function(spots) {
    if (spots <= 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining"
    } else {
      return  spots + " spots remaining"
    }

  }
  return (
    <li data-testid="day" className = {dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
