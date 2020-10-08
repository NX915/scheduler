import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null);
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  //clears name field after user cancels
  function cancel() {
    reset();
    props.onCancel();
  }

  //check name and interviewer is selected before calling onSave
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Interviewer must be selected");
      return;
    } else {
      setError("");
    }
  
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={e => setName(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
};