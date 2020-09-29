import React from "react";
import { useState } from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

// const classnames = require("classnames");

export default function InterviewerList (props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(
          interviewer => {
            const { id, name, avatar, setInterviewer } = interviewer;
            return (<InterviewerListItem
              key={id}
              name={name}
              avatar={avatar}
              setInterviewer={() => setInterviewer(id)}
              selected={interviewer.id === props.interviewer}
            />);
          }
        )}
      </ul>
    </section>
  )
};