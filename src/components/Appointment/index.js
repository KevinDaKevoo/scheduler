import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import useVisualMode from "hooks/useVisualMode"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const DELETING = "DELETING";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }
  
  function remove() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(()=>{
        transition(ERROR_DELETE, true)
      })
  }

    return (
      <article className="appointment" data-testid="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => {transition(CONFIRM)}}
            onEdit={() => {transition(EDIT)}}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={Object.values(props.interviewers)}
            onCancel={() => back()}
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
      {mode === EDIT && (
        <Form
          name={props.student}
          interviewer={props.interview.interviewer}
          interviewers={Object.values(props.interviewers)}
          onSave={save}
          onCancel={() => back()}
      />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment."
          onClose={() => back()}
        />
      )}
      </article>
    );

} 