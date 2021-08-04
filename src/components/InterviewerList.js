import React from "react";
import InterviewerListItem from "./InterviewerListItem"

import "components/InterviewerList.scss";

/* --------- props:
    interviewers:array - an array of objects containing the information of each interviewer
    interviewer:number - the id of an interviewer
    setInterviewer:function - a function that accepts an interviewer id
*/

export default function InterviewerList(props) {
  // console.log('props inside interviewerList: ', props);
  const { interviewers, interviewer, setInterviewer } = props;
  // console.log('interviewer inside interviewerList: ', interviewer);

  const result = interviewers.map(eachInterviewer => {
    return (
    <InterviewerListItem
    key={eachInterviewer.id}
    name={eachInterviewer.name}
    avatar={eachInterviewer.avatar}
    selected={eachInterviewer.id === interviewer}
    setInterviewer={() => setInterviewer(eachInterviewer.id)}
    />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{result}</ul>
    </section>
  );
}