import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Group from "../pages/Group/Group";

describe("Group component", () => {
  test("renders General page by default", () => {
    render(
      <BrowserRouter>
        <Group />
      </BrowserRouter>
    );
    const navbarTab = screen.getByLabelText("Title");
    expect(navbarTab).toHaveDisplayValue("Loading...");
  });
});
