import React from "react";

import "components/InterviewerListItem.scss";

const classnames = require("classnames");

export default function InterviewerListItem (props) {

  return (
  <li 
    className={classnames('interviewers__item', {'interviewers__item--selected':props.selected})}
    onClick={props.setInterviewer}
  >
    <img
      className={classnames('interviewers__item-image')}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  );
};