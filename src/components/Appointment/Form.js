import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel } = props;

  const [nameState, setName] = useState(name || "");
  const [interviewerState, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  function validate() {
    if (nameState === "") {
      setError("Please enter a name");
      return;
    }
    if (interviewerState === null) {
      setError("Please choose an interviewer");
      return;
    }
    setError("");
    onSave(nameState, interviewerState);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={nameState}
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerState}
          onChange={(e) => setInterviewer(e)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => validate()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
