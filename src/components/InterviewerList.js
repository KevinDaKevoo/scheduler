import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';

function InterviewerList(props) {

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        interviewer={interviewer.name}
        avatar={interviewer.avatar}
        name={interviewer.name}
        selected={(interviewer.id === props.interviewer)}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;