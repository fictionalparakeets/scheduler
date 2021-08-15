import React from "react";
import classNames from "classnames/bind";

import "components/InterviewerListItem.scss";

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
