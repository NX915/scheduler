import React from "react";

import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && (
        <Form
          interviewers={[]} 
          onSave={() => {transition(STATUS)}} 
          onCancel={() => {back()}}
        />)}
    </article>
  );
};