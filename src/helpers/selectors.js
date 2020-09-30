export function getAppointmentsForDay(state, day) {
  let output = [];
  let id;
  const data = state.days.filter(dayEle => dayEle.name === day);
  // console.log(data);
  if (data[0]) {
    id = data[0].appointments;
    output = id.map(id => state.appointments[id]);
  }
  // console.log(data[0]);
  // console.log(output);
  return output;
};