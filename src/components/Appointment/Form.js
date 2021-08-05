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
  
  const [nameState, setName] = useState(name || "");
  const [interviewerState, setInterviewer] = useState(interviewer || null);
  
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    onCancel()
    reset()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={v => v.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={nameState}
            placeholder="Enter Student Name"
            onChange={(v) => setName(v.target.value)}
          />
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
          <Button onClick={() => onSave(nameState, interviewerState)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
