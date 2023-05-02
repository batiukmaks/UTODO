import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import MainHeader from "../components/MainHeader/MainHeader";

describe("MainHeader", () => {
  test("renders UTODO logo", () => {
    render(
      <BrowserRouter>
        <MainHeader />
      </BrowserRouter>
    );
    const logoElement = screen.getByText("UTODO");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders Tasks button", () => {
    render(
      <BrowserRouter>
        <MainHeader />
      </BrowserRouter>
    );
    const tasksButton = screen.getByRole("link", { name: "Tasks" });
    expect(tasksButton).toBeInTheDocument();
  });
});
