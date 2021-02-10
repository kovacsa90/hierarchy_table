import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import App from "./App";

afterEach(() => {
  cleanup();
});

describe("Render App", () => {
  test("renders full Hierarch table", () => {
    render(<App />);
    expect(screen.getByText(/DATA-1 JSON/i)).toBeTruthy();
    expect(screen.getByText(/Identification number/i)).toBeTruthy();
    expect(screen.queryAllByTestId("mainOpenButton")).toHaveLength(10);
    expect(screen.queryAllByTestId("mainDeleteButton")).toHaveLength(11);
  });
  test("delete first main row", () => {
    render(<App />);
    expect(screen.queryByText("Joqmo")).toBeTruthy();
    const firstRowDelete = screen.queryAllByTestId("mainDeleteButton")[0];
    fireEvent.click(firstRowDelete);
    expect(screen.queryByText("Joqmo")).toBeFalsy();
  });
  test("open first main row", () => {
    render(<App />);
    expect(screen.queryByText(/Has Relatives/i)).toBeFalsy();
    const firstRowOpen = screen.queryAllByTestId("mainOpenButton")[0];
    fireEvent.click(firstRowOpen);
    expect(screen.queryByText(/Has Relatives/i)).toBeTruthy();
    expect(screen.queryByText("1007")).toBeTruthy();
  });
});
