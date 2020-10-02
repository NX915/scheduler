import React from "react";

import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW, true)
      }
    );
  }

  const cancel = function() {
    transition(DELETE)

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY, true)
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers} 
          onSave={(name, interviewer) => {
            save(name, interviewer)
          }} 
          onCancel={() => {back()}}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers} 
          onSave={(name, interviewer) => {
            save(name, interviewer)
          }} 
          onCancel={() => {back()}}
        />
      )}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}
      {mode === DELETE && <Status message="Deleting"/>}
    </article>
  );
};