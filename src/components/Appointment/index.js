import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview } = props;
  // console.log("time: ", time);
  // console.log("interview: ", interview);
  // console.log("interviewers: ", interviewers);

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

    bookInterview(interviewer, interview)
    console.log('interviewer inside save function: ', interviewer)
    console.log('interview inside save function: ', interview)
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
    </article>
  );
}
