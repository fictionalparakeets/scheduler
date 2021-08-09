import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview } = props;

  // console.log('props in Appointment: ', props)
  // Object { id: 2, time: "1pm", interview: {…}, interviewers: (5) […], bookInterview: bookInterview(id, interview), … }
  // the object id is equal to the appointment spot each day. (this example was for the second timeslot of the day)

  // console.log("time in Appointment: ", time);
  // console.log("interview in Appointment: ", interview);

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

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);


  // "Creating Appointments" (syncronizing state between client and server)
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    //show saving indicator before calling bookInterview
    transition(SAVE)

    bookInterview(id, interview)
      .then(result => {
        console.log('result of bookInterview call: ', bookInterview)
        transition(SHOW)
      })
      .catch(e => console.log(e))
    // console.log('interviewer inside save function: ', interviewer)
    // console.log('interview inside save function: ', interview)

    // once the interview is booked, transition to SHOW component
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
        <Show student={interview.student} interviewer={interview.interviewer} />
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
      {mode === SAVE && (
        <Status
          message="saving"
        />
      )}
    </article>
  );
}
