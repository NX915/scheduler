import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {

  return (
  <ul>
    {
      props.days.map((day) => {
      return <DayListItem 
      name={day.name}
      spots={day.spots}
      setDay={props.setDay}
      selected={day.name === props.day}/>
      })
    }
  </ul>
  );
}