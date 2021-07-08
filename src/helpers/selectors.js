export function getAppointmentsForDay(state, day) {
  let output = [];
  const selectedDay = state.days.filter((dayObj) => dayObj.name === day);
  if (selectedDay.length === 0) {
    return [];
  }
  const selectedDayAppointmentIDs = selectedDay[0].appointments;

  for (const id of selectedDayAppointmentIDs) {
    let appointmentObj = {};
    output.push(state.appointments[id]);
  }
  return output;
}