import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Signup from "../pages/Signup/Signup";
import { fetch_data } from "../utils/api";
import { BrowserRouter } from "react-router-dom";
jest.mock("../utils/api");

describe("Signup form", () => {
  test("calls handleSubmit with correct values when submitted", async () => {
    // Mock the navigate function from react-router-dom
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const firstNameInput = screen.getByPlaceholderText("Enter first name");
    const lastNameInput = screen.getByPlaceholderText("Enter last name");
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Sign up");

    // Enter input values and submit the form
    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.change(lastNameInput, { target: { value: "Doe" } });
      fireEvent.change(emailInput, {
        target: { value: "johndoe@example.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(submitButton);
    });
    // Check that handleSubmit was called with the correct values
    expect(fetch_data).toHaveBeenCalledWith(
      "/user/signup",
      "POST",
      {
        name: "John",
        surname: "Doe",
        email: "johndoe@example.com",
        password: "password",
      },
      false
    );
    
  });
});
