export default function getAppointmentsForDay(state, day) {
  const output = [];
  console.log(state.days.filter(dayEle => dayEle.name === day));
  return output;
};