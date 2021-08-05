import React, {useState, useEffect} from "react";
import axios from 'axios';

import DayList from "./DayList";
import Appointment from "./Appointment/index";

import "components/Application.scss";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Arnold Palmer",
      interviewer: {
        id: 1,
        name: "Marcus Kristjanssen",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Svetlana Khorkina",
      interviewer: {
        id: 1,
        name: "Opal Erikson",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];



export default function Application(props) {

  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8002/api/days').then(response => {
      console.log('success: ', response.data);
      setDays([response.data]);
      })
      .catch(e => console.log("error: ", e));
  }, [])


  const dailyAppointments = appointments.map(eachObj => {
    return (
      <Appointment
      key={eachObj.id}
      {...eachObj}
      />
    )
  })

  dailyAppointments.push(<Appointment key="last" time="5pm" />)

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
            day={day}
            setDay={setDay}
            days={days}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments}
      </section>
    </main>
  );
}
