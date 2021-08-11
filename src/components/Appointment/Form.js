import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

/* --------- props:
    name:String
    interviewers:Array
    interviewer:Number
    onSave:Function
    onCancel:Function
*/
/* --------- actions:
    setName:Function
    setInterviewer:Function
*/
/* --------- state:
    name:String
    interviewer:Number
*/

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel } = props;
  // console.log('props: ', props)
  // console.log('props.interviewer: ', props.interviewer)
  
  const [nameState, setName] = useState(name || "");
  const [interviewerState, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    onCancel()
    reset()
  }

  function validate() {
    if (nameState === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    // console.log('interviewerState in Form > validate(): ', interviewerState)
    onSave(nameState, interviewerState);
  }
  // console.log('interviewerState in Form: ', interviewerState)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={v => v.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={nameState}
            placeholder="Enter Student Name"
            onChange={(v) => setName(v.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerState}
          onChange={(i) => setInterviewer(i)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => validate(nameState, interviewerState)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
