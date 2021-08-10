export function getAppointmentsForDay(state, day) {
  let appts = [];

  state.days.forEach(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptNum => {
        appts.push(state.appointments[apptNum])
      })
    }
  })

  return appts;
}


export function getInterview(state, interview) {
  let returnObject = interview

  if (returnObject) {
    returnObject.interviewer = state.interviewers[interview.interviewer]
    return returnObject;
  }
  return null;
}


export function getInterviewersForDay(state, day) {
  let interviews = [];

  state.days.forEach(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(apptNum => {
        interviews.push(state.interviewers[apptNum])
        return;
      })
      return;
    }
  })

  return interviews;
}

