import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days } = props;

  const result = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <div>{result}</div>;
}
