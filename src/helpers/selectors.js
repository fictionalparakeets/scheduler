
export default function getAppointmentsForDay(state, day){
  let appts = [];

  state.days.forEach(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptNum => {
        appts.push(state.appointments[apptNum])
        return;
      })
      return;
    }
  })

  return appts;
}
