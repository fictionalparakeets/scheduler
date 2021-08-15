import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function setDay(day) {
    setState({ ...state, day });
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  function spotsLeft(state) {
    const todaysAppts = getAppointmentsForDay(state, state.day);
    let freeSpots = 0;
    todaysAppts.forEach((object) => {
      if (!object.interview) {
        freeSpots += 1;
      }
    });

    const newState = { ...state };
    for (const dayObj of newState.days) {
      if (dayObj.name === state.day) {
        dayObj.spots = freeSpots;
      }
    }

    return newState;
  }

  function bookInterview(id, interview) {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview: { ...interview },
      })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        setState(spotsLeft({ ...state, appointments }));
      });
  }

  function cancelInterview(apptId) {
    return axios
      .delete(`http://localhost:8001/api/appointments/${apptId}`)
      .then((response) => {
        const appointment = {
          ...state.appointments[apptId],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [apptId]: appointment,
        };

        setState(spotsLeft({ ...state, appointments }));
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
