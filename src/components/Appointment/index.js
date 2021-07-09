import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "components/Appointment/Form.js"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
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
    return (
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
        {mode === CREATE && (
      <Form 
        interviewers={[]}
        onCancel={onCancel}
      />
    )}
      </article>
    );

} 