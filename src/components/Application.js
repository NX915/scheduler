import React, {useEffect, useState} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from  "components/DayList";
import Appointments from "components/Appointment";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

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
    interview: {
      student: "Rando at 2",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Rando at 3",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "5pm",
  },
  {
    id: 6,
    time: "3pm",
    interview: {
      student: "Rando at 3",
      interviewer: { 
        id: 3, 
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png" 
      }
    }
  }
];

export default function Application(props) {
  // const [ day, setDay ] = useState("Monday");
  // const [ days, setDays ] = useState([]);
  const [ state, setState ] = useState({
    day: "Monday",
    days: []
  });

  const setDays = function(days) {
    // setState({...state, days: days});
    setState(prev => ({...prev, days}));
  };

  useEffect(() => {
    axios.get('/api/days')
      .then(res => {
        setDays(res.data);
      })
  }, []);


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
            days={state.days}
            day={state.day}
            setDay={day => setState({...state, day: day})}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => (
          <Appointments
            key={appointment.id}
            {...appointment}
          />
        ))}
      </section>
    </main>
  );
}
