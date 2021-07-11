import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import useVisualMode from "hooks/useVisualMode"
import Confirm from "components/Appointment/Confirm.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const DELETING = "DELETING";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  }
  
  function onCancel() {
    back()
  }

  function onDelete() {
    transition(CONFIRM)
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer

    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
  }

  function remove() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
  }
    return (
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={onDelete}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={Object.values(props.interviewers)}
            onCancel={onCancel}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message={SAVING}/>}
        {mode === DELETING && <Status message={DELETING}/>}
        {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={remove}
          onCancel={() => back()}
        />
      )}
      </article>
    );

} 