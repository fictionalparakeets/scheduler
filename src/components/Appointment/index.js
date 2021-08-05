import React, { Fragment } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";


// Header
// const { time } = props;
// Empty
// const { onAdd } = props;
// Show
// const { student, interviewer, onEdit, onDelete } = props;


export default function Appointment(props) {
  const { id, time, interview } = props

  /* interview is an object : { student: "Lydia Miller-Jones", interviewer }
  interviewer is an object : {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png",
  } */

  return (
    <article className="appointment">
      <Header time={time} />
      { interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty /> }
    </article>
  );
}
