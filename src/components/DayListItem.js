import React from "react";
import classNames from "classnames/bind";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClassNames = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  const formatSpots = function (spotsInt) {
    if (spotsInt) {
      return spotsInt > 1 ? `${spotsInt} spots` : `${spotsInt} spot`;
    }
    return "no spots";
  };

  return (
    <li
      data-testid="day"
      onClick={() => setDay(name)}
      className={dayClassNames}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}
