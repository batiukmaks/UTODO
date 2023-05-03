import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import UserSettings from "../pages/UserSettings/UserSettings";
import { fetch_data } from "../utils/api";
import { BrowserRouter } from "react-router-dom";

jest.mock("../utils/api");

describe("UserSettings", () => {
  test("renders user settings form", async () => {
    const mockData = {
      data: {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      },
    };
    await act(async () => {
      (fetch_data as jest.Mock).mockResolvedValueOnce(mockData);
      render(
        <BrowserRouter>
          <UserSettings />
        </BrowserRouter>
      );
    });
    expect(screen.getByText("Edit your account!")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Old password")).toBeInTheDocument();
    expect(screen.getByLabelText("New password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("fetches user data on mount", async () => {
    const mockData = {
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
    };
    (fetch_data as jest.Mock).mockResolvedValueOnce(mockData);
    await act(async () => {
      render(
        <BrowserRouter>
          <UserSettings />
        </BrowserRouter>
      );
    });
    await waitFor(() => {
      expect(fetch_data).toHaveBeenCalledTimes(1);
      expect(fetch_data).toHaveBeenCalledWith("/user/me", "GET");
      expect(screen.getByLabelText("First name")).toHaveValue(mockData.name);
      expect(screen.getByLabelText("Last name")).toHaveValue(mockData.surname);
      expect(screen.getByLabelText("Email address")).toHaveValue(
        mockData.email
      );
    });
  });

  test("submits user data update", async () => {
    const mockResponse = {
      message: "Account updated successfully",
    };
    (fetch_data as jest.Mock).mockResolvedValueOnce(mockResponse);
    await act(async () => {
      render(
        <BrowserRouter>
          <UserSettings />
        </BrowserRouter>
      );
    });
    window.alert = jest.fn();
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const emailInput = screen.getByLabelText("Email address");
    const oldPasswordInput = screen.getByLabelText("Old password");
    const newPasswordInput = screen.getByLabelText("New password");
    const confirmNewPasswordInput = screen.getByLabelText("Confirm password");
    const saveButton = screen.getByText("Save");
    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "Jane" } });
      fireEvent.change(lastNameInput, { target: { value: "Doe" } });
      fireEvent.change(emailInput, {
        target: { value: "jane.doe@example.com" },
      });
      fireEvent.change(oldPasswordInput, { target: { value: "oldpassword" } });
      fireEvent.change(newPasswordInput, { target: { value: "newpassword" } });
      fireEvent.change(confirmNewPasswordInput, {
        target: { value: "newpassword" },
      });
    });
    await act(async () => {
      fireEvent.click(saveButton);
    });
    await waitFor(() => {
      expect(fetch_data).toHaveBeenCalledWith("/user/", "PUT", {
        name: "Jane",
        surname: "Doe",
        email: "jane.doe@example.com",
        old_password: "oldpassword",
        password: "newpassword",
      });
    });
  });
});
