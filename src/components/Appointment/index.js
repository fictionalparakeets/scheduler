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

  // console.log('props in Appointment: ', props)
  // Object { id: 2, time: "1pm", interview: {…}, interviewers: (5) […], bookInterview: bookInterview(id, interview), … }
  // the object id is equal to the appointment spot each day. (this example was for the second timeslot of the day)

  // console.log("interviewers in Appointment: ", interviewers);
  /*
  Array(5) [ {…}, {…}, {…}, {…}, {…} ]
    0: Object { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" }
    1: Object { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    2: Object { id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg" }
    3: Object { id: 8, name: "Viktor Jain", avatar: "https://i.imgur.com/iHq8K8Z.jpg" }
    4: Object { id: 9, name: "Lindsay Chu", avatar: "https://i.imgur.com/nPywAp1.jpg" }
    length: 5
  */

  /* interview is an object : { student: "Lydia Miller-Jones", interviewer }
  interviewer is an object : {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png",
  } 
  interviewers is an array of interviewer objects  
  */

  // "Creating Appointments" (syncronizing state between client and server)
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

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
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            console.log("Clicked onAdd");
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
            console.log("Clicked onCancel");
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
            console.log("Clicked onCancel");
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
