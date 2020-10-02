import {useEffect, useState} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [ state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: null
  });

  const bookInterview = function(id, interview) {
    // console.log(id, interview);
    // console.log(state);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
          setState({
            ...state,
            appointments
          });
        });
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
        setState({
          ...state,
          appointments
        });
      });
  };

  const setDay = function(day) {
    setState(prev => {
      return {...prev, day: day}
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};