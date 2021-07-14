import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});
const setDay = day => setState({ ...state, day });
const setDays = days => setState(prev => ({...prev, days}));
const setAppointments = appointments => setState(prev => ({...prev, appointments}));
useEffect(() => {
  const daysURL = '/api/days';
  const appointmentsURL = '/api/appointments';
  const interviewersURL = '/api/interviewers';
  Promise.all([
    axios.get(daysURL),
    axios.get(appointmentsURL),
    axios.get(interviewersURL)
  ])
    .then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => {
        return {...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({
        ...state,
        appointments,
      })
      updateSpots(id, true, state.appointments[id].interview !== null);

      setAppointments(appointments)
    })
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.delete(`api/appointments/${id}`)
    .then(()=>{
      setState({
        ...state,
        appointments, });

      updateSpots(id, false);
      setAppointments(appointments);
    });
};

const updateSpots = (id, booking, editing) => {
  for (const [index, day] of state.days.entries()) {
    if (day.appointments.includes(id)) {
      const newDay = {
        ...day,
        spots: day.spots + (booking ? 
                           (editing ? 0 : -1) : 1),
      };
      const days = [...state.days];
      days.splice(index, 1, newDay);
      setDays(days);
    }
  }
};

return {state, setDay, bookInterview, cancelInterview}
}