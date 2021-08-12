import React from "react";
import classNames from "classnames/bind";

import "components/InterviewerListItem.scss";

/* --------- props:
    id:number - the id of the interviewer
    name:string - the name of the interviewer
    avatar:url - a url to an image of the interviewer
    selected:boolean - to determine if an interview is selected or not
    setInterviewer:function - sets the interviewer upon selection
*/

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  const InterviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={InterviewerItemClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
