export default function getAppointmentsForDay(state, day) {
  let output = [];
  let id;
  const data = state.days.filter(dayEle => dayEle.name === day);

  if (data[0]) {
    id = data[0].appointments;
    output = id.map(id => state.appointments[id]);
  }

  return output;
};