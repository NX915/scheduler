export function getAppointmentsForDay(state, day) {
  let output = [];
  let id;
  const data = state.days.filter(dayEle => dayEle.name === day);

  if (data[0]) {
    id = data[0].appointments;
    output = id.map(id => state.appointments[id]);
  }

  return output;
};

export function getInterview(state, interview) {
  let output = null;
  
  if (interview) {
    // console.log(interview.interviewers);
    // output = interview.interviewer;
    output = {...interview, interviewer: state.interviewers[interview.interviewer]};
  }
  
  return output;
};

// export function getInterviewersForDay(state, day) {
//   let output = [];
//   let id;
//   const data = state.days.filter(dayEle => dayEle.name === day);

//   if (data[0]) {
//     id = Object.keys(state.interviewers);
//     output = id.map(ele => state.interviewers[ele]);
//   }

//   return output;
// };

export function getInterviewersForDay(state, day) {
  let output = [];
  let id;
  const data = state.days.filter(dayEle => dayEle.name === day);

  if (data[0]) {
    id = data[0].interviewers;
    output = id.map(id => state.interviewers[id]);
  }

  return output;
};