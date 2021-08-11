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

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8002/api/days"),
      axios.get("http://localhost:8002/api/appointments"),
      axios.get("http://localhost:8002/api/interviewers"),
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
        console.log(error);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        // console.log(error.response.data);
      });
  }, []);

  
  function spotsLeft(state) {

    const todaysAppts = getAppointmentsForDay(state, state.day)
    let freeSpots = 0
    todaysAppts.forEach(object => {
      if (!object.interview) {
        freeSpots += 1
      }
    })

    const newState = {...state}
    for (const dayObj of newState.days) {
      if (dayObj.name === state.day) {
        dayObj.spots = freeSpots
      }
    }

    return newState;
  }


  function bookInterview(id, interview) {
    // http://localhost:8002/api/debug/reset
    return axios
      .put(`http://localhost:8002/api/appointments/${id}`, {
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

        setState(spotsLeft({ ...state, appointments,}));
      });
  }

  function cancelInterview(apptId) {
    return axios
      .delete(`http://localhost:8002/api/appointments/${apptId}`)
      .then((response) => {
        const appointment = {
          ...state.appointments[apptId],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [apptId]: appointment,
        };

        setState(spotsLeft({ ...state, appointments,}));
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
