import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import CreateGroup from "../pages/CreateGroup/CreateGroup";
import { fetch_data } from "../utils/api";
import { BrowserRouter, useNavigate } from "react-router-dom";

jest.mock("../utils/api", () => ({
  fetch_data: jest.fn(),
}));

describe("CreateGroup component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call fetch_data with the correct arguments when the form is submitted", async () => {
    (fetch_data as jest.Mock).mockResolvedValueOnce({ id: 1 });

    act(() => {
      render(
        <BrowserRouter>
          <CreateGroup />
        </BrowserRouter>
      );
    });

    const groupNameInput = screen.getByLabelText("Group name");
    act(() => {
      fireEvent.change(groupNameInput, { target: { value: "test group" } });
    });

    const descriptionInput = screen.getByLabelText("Description");
    act(() => {
      fireEvent.change(descriptionInput, {
        target: { value: "test description" },
      });
    });

    const createButton = screen.getByText("Create");
    act(() => {
      fireEvent.click(createButton);
    });
    act(() => {
      expect(fetch_data).toHaveBeenCalledWith("/groups/", "POST", {
        name: "test group",
        description: "test description",
      });
    });
  });

  test("should display an error alert when there is an error during submission", async () => {
    (fetch_data as jest.Mock).mockRejectedValueOnce("error message");
    window.alert = jest.fn();
    act(() => {
      render(
        <BrowserRouter>
          <CreateGroup />
        </BrowserRouter>
      );
    });

    const groupNameInput = screen.getByLabelText("Group name");
    act(() => {
      fireEvent.change(groupNameInput, { target: { value: "test group" } });
    });

    const descriptionInput = screen.getByLabelText("Description");
    act(() => {
      fireEvent.change(descriptionInput, {
        target: { value: "test description" },
      });
    });

    const createButton = screen.getByText("Create");
    act(() => {
      fireEvent.click(createButton);
    });

    expect(fetch_data).toHaveBeenCalledWith("/groups/", "POST", {
      name: "test group",
      description: "test description",
    });
  });
});
