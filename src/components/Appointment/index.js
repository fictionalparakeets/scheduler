import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

// States:
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);


  // "Creating Appointments" (syncronizing state between client and server)
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    // console.log('interviewer inside save function: ', interviewer)
    // console.log('interviewer.id inside save function: ', interviewer.id)

    //show saving indicator before calling bookInterview
    transition(SAVE, true);
    bookInterview(id, interview)
      .then((result) => {
        transition(SHOW);
      })
      .catch((e) => transition(ERROR_SAVE, true));
  }

  // "Deleting Appointments" (syncronizing state between client and server)
  function deleteAppt() {
    //show deleting indicator before calling cancelInterview
    transition(DELETE, true);
    cancelInterview(id)
      .then((result) => {
        transition(EMPTY);
      })
      .catch((e) => transition(ERROR_DELETE, true));
  }

  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete this appointment?"
          onCancel={() => transition(SHOW)}
          onConfirm={deleteAppt}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={interview.interviewer.id}
          name={interview.student}
          interviewers={interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save changes"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete this appointment"
          onClose={() => back()}
        />
      )}
    </article>
  );
}
