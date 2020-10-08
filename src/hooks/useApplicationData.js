import {useEffect, useState} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [ state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: null
  });

  const changeSpotRemaining = function(state) {
    const days = state.days.map(day => {
      const spots = day.appointments.filter(id => state.appointments[id].interview === null).length;
      return {...day, spots};
    });
    return {...state, days};
  }

  const bookInterview = function(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
          setState(state => ({
            ...state,
            appointments: {
              ...state.appointments,
              [id]: appointment
            },
          }));
          setState(changeSpotRemaining);
        });
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
        setState(state => {
          return {
            ...state, appointments: {...state.appointments, [id]: appointment}
          }
        });
        setState(changeSpotRemaining);
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
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};