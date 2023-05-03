import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../App";

describe("App", () => {
  test("renders Login page by default", () => {
    render(<App />);
    const loginPage = screen.getByRole("main");
    expect(loginPage).toHaveTextContent("Log into your account!");
  });
});
