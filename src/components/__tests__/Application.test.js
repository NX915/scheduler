import React from "react";

import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);
  
//   return waitForElement(() => getByText("Monday"))
//     .then(() => {
//       fireEvent.click(getByText("Tuesday"));
//       expect(getByText("Leopold Silvers")).toBeInTheDocument();
//     });
// })
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    
    fireEvent.click(getByAltText(appointment, /add/i));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Lydia Miller-Jones'}});
    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));
    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(ele => queryByText(ele, "Monday"));

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, /delete/i));
    fireEvent.click(getByText(appointment, /confirm/i));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, /add/i));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, /edit/i));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Test Name'}});
    fireEvent.click(getByAltText(appointment, /Tori Malcolm/i));
    fireEvent.click(getByText(appointment, /save/i));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, /test name/i));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });
  it("shows the save error when failing to save an appointment", async () => {
    const { container } = render(<Application />);
    axios.put.mockRejectedValueOnce();

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    
    fireEvent.click(getByAltText(appointment, /add/i));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Lydia Miller-Jones'}});
    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));
    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, /error/i));
    
    const day = getAllByTestId(container, "day").find(ele => queryByText(ele, "Monday"));

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, /close/i));
    expect(getByText(appointment, /save/i)).toBeInTheDocument();
  });
  it("shows the delete error when failing to delete an appointment", async () => {
    const { container } = render(<Application />);
    axios.delete.mockRejectedValueOnce();

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, /delete/i));
    fireEvent.click(getByText(appointment, /confirm/i));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /error/i));
    
    const day = getAllByTestId(container, "day").find(ele => queryByText(ele, "Monday"));

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, /close/i));
    expect(getByText(appointment, /Archie Cohen/i)).toBeInTheDocument();
  });
});