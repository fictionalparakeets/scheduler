

export function getAppointmentsForDay(state, day){
  let appts = [];

  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.map(apptNum => {
        appts.push(state.appointments[apptNum])
      })
    }
  })

  return appts;
}
