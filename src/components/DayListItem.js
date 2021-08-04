import React from "react";
import classNames from 'classnames/bind';

import "components/DayListItem.scss";

/* --------- props:
    name:String the name of the day
    spots:Number the number of spots remaining
    selected:Boolean true or false declaring that this day is selected
    setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/

export default function DayListItem(props) {
  // console.log('props:', props);
  const { name, spots, selected, setDay } = props;
  const dayClassNames = classNames('day-list__item', {
    '--selected': selected,
    '--full': !spots
  });

  const formatSpots = function(spotsInt) {
    if (spotsInt) { 
      return spotsInt > 1 ? `${spotsInt} spots` : `${spotsInt} spot`
    }
    return 'no spots';
  }

  return (
    <li
    onClick={() => setDay(name)}
    className={dayClassNames}
    >
      <h2 className='text--regular'>{name}</h2> 
      <h3 className='text--light'>{formatSpots(spots)} remaining</h3>
    </li>
  );
}