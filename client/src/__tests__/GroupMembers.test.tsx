import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GroupMembers from "../pages/Group/GroupMembers/GroupMembers";
import { fetch_data } from "../utils/api";

jest.mock("../utils/api", () => ({
  fetch_data: jest.fn(),
}));

describe("GroupMembers", () => {
  const group = {
    id: 1,
    title: "Group 1",
    tasks: [
      {
        id: 1,
        group_id: 1,
        name: "Task 1",
        done: true,
      },
      {
        group_id: 1,
        id: 2,
        name: "Task 2",
        done: false,
      },
    ],
    owner_id: 123,
    owner_fullname: "John Doe",
    description: "Description for group 1",
    members: [
      {
        email: "member1@test.com",
        firstName: "John",
        lastName: "Doe",
      },
      {
        email: "member2@test.com",
        firstName: "Jane",
        lastName: "Doe",
      },
    ],
  };

  beforeEach(() => {
    localStorage.setItem("current_user_id", "123");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render a list of group members", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GroupMembers group={group} />
      </BrowserRouter>
    );

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
  });

  it("should render a form to add a new member if the current user is the owner of the group", () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <GroupMembers group={group} />
      </BrowserRouter>
    );

    const input = getByPlaceholderText("Member's email");

    expect(input).toBeInTheDocument();
  });

  it("renders the message that the member list is empty if there are no members", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GroupMembers group={{ ...group, members: [] }} />
      </BrowserRouter>
    );

    expect(getByText("No group members")).toBeInTheDocument();
  });

  it("submits the form", async () => {
    const mockGroup = {
      id: 1,
      owner_id: 123,
      members: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
        },
      ],
      tasks: [],
      title: "Group 1",
      description: "Description for group 1",
      owner_fullname: "John Doe",
    };
    (fetch_data as jest.Mock).mockResolvedValueOnce(mockGroup);
    render(<GroupMembers group={mockGroup} />);

    const input = screen.getByRole("textbox");
    act(() => {
      fireEvent.change(input, { target: { value: "janedoe@example.com" } });
    });

    const form = screen.getByRole("form");
    await act(async() => {
      fireEvent.submit(form);
    });

    expect(fetch_data).toHaveBeenCalledWith("/groups/1/members", "POST", {
      email: "janedoe@example.com",
    });
  });
});
