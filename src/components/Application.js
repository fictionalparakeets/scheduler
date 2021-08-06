import React, {useState, useEffect} from "react";
import axios from 'axios';

import DayList from "./DayList";
import Appointment from "./Appointment/index";
import getAppointmentsForDay from "../helpers/selectors";

import "components/Application.scss";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  // aliasing action for this file
  const setDay = day => setState({ ...state, day });
  
  // update for other files (not sure if this is required?)
  // const state = { day: "Monday", days: [] };
  // setState({ ...state, day: "Tuesday" });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8002/api/days'),
      axios.get('http://localhost:8002/api/appointments'),
      axios.get('http://localhost:8002/api/interviewers') 
    ])
      .then(all => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  }, [])


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const mappedDailyAppts = dailyAppointments.map(eachObj => {
    return (
      <Appointment
      key={eachObj.id}
      {...eachObj}
      />
    )
  })
  mappedDailyAppts.push(<Appointment key="last" time="5pm" />)


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            day={state.day}
            setDay={setDay}
            days={state.days}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedDailyAppts}
      </section>
    </main>
  );
}
