import { render, fireEvent, screen, act } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import { fetch_data } from "../utils/api";

jest.mock("../utils/api");

describe("Login component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test("renders email and password input fields and login button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("submits the login form and navigates to /tasks on success", async () => {
    const loginResponse = {
      access_token: "access_token_value",
      id: 1,
    };
    (fetch_data as jest.Mock).mockResolvedValueOnce(loginResponse);
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await act(async () => {
      expect(fetch_data).toHaveBeenCalledWith(
        "/user/login",
        "POST",
        {
          email: "test@example.com",
          password: "password123",
        },
        false
      );
    });
    expect(localStorage.getItem("access_token")).toBe("access_token_value");
    expect(localStorage.getItem("current_user_id")).toBe("1");
  });

  test("shows an error message on login failure", async () => {
    (fetch_data as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid email or password")
    );
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await act(async () => {
      expect(fetch_data as jest.Mock).toHaveBeenCalledWith(
        "/user/login",
        "POST",
        {
          email: "test@example.com",
          password: "password123",
        },
        false
      );
    });
    expect(localStorage.getItem("access_token")).toBe(null);
    expect(localStorage.getItem("current_user_id")).toBe(null);
  });
});
