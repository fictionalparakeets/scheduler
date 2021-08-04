import React from "react";
import classNames from "classnames/bind";

import "components/InterviewerList.scss";

/* --------- props:
    interviewers:array - an array of objects containing the information of each interviewer
    interviewer:number - the id of an interviewer
    setInterviewer:function - a function that accepts an interviewer id
*/

export default function InterviewerListItem(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const InterviewersClass = classNames("interviewers", {
    "interviewers__header text--light": interviewer,
    "interviewers__list": interviewers
  });

  return (
    <section className={InterviewersClass}>
      <h4 className={InterviewersClass}>{interviewer}</h4>
      <ul className={InterviewersClass}>{interviewers}</ul>
    </section>
  );
}
