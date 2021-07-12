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
const setAppointments = appointments => setState(prev => ({...prev, appointments}));
useEffect(() => {
  const daysURL = 'api/days';
  const appointmentsURL = 'api/appointments';
  const interviewersURL = 'api/interviewers';
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
  setState({
    ...state,
    appointments,
  })
  return axios.put(`/api/appointments/${id}`, appointment)
  .then(() => setAppointments(appointments))
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
  setState({
    ...state,
    appointments, 
  });
  return axios.delete(`api/appointments/${id}`, appointments[id])
}



return {state, setDay, bookInterview, cancelInterview}
}