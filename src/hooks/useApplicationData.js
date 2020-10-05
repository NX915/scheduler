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
    // console.log('spots', state.days[Math.floor(id / 5)].spots);
    // const dayIndex = Math.floor((id - 1) / 5);
    // console.log(id, dayIndex);
    // const spots = state.days[dayIndex].spots + num;
    // console.log(state.days[dayIndex].spots, spots);

    // const day = {...state.days[dayIndex], spots: spots};
    // const days = [...state.days];
    // days[dayIndex] = day;
    // return days;
    // setState(prev => {
    //   return {...prev, days};
    // });
    const days = state.days.map(day => {
      const spots = day.appointments.filter(id => state.appointments[id].interview === null).length;
      return {...day, spots};
    });
    return {...state, days};
  }

  const bookInterview = function(id, interview) {
    // console.log(id, interview);
    // console.log(state);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log(appointment);
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    // const days = changeSpotRemaining(id, -1);

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
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // }
    // const days = changeSpotRemaining(id, 1);

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
      // console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};