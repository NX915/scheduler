import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList (props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(
          interviewer => {
            const { id, name, avatar} = interviewer;
            return (<InterviewerListItem
              key={id}
              name={name}
              avatar={avatar}
              selected={id === props.value}
              setInterviewer={() => props.onChange(id)}
            />);
          }
        )}
      </ul>
    </section>
  )
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};