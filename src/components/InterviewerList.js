import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

  const result = interviewers.map((eachInterviewer) => {
    return (
      <InterviewerListItem
        key={eachInterviewer.id}
        name={eachInterviewer.name}
        avatar={eachInterviewer.avatar}
        selected={eachInterviewer.id === value}
        setInterviewer={() => onChange(eachInterviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{result}</ul>
    </section>
  );
}
