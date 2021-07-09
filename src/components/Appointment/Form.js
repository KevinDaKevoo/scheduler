import React, { useState } from 'react';
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const validate = function() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } 
    else if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError('');
    props.onSave(name, interviewer)
  };

  const reset = function() {
    setError(null);
    setName('');
    setInterviewer(null);
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {setName(event.target.value)}}
            value={name || props.name || ""}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} setInterviewer={setInterviewer} interviewer={interviewer || props.interviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={reset} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};