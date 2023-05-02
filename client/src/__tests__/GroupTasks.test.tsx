import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GroupTasks from "../components/GroupTasks/GroupTasks";
import GroupInterface from "../components/Group/GroupInterface";

describe("GroupTasks component", () => {
  const group: GroupInterface = {
    id: 1,
    title: "Test group",
    tasks: [
      {
        id: 1,
        group_id: 1,
        name: "Test task 1",
        done: false,
      },
      {
        id: 2,
        group_id: 1,
        name: "Test task 2",
        done: true,
      },
    ],
    owner_fullname: "Name Surname",
    owner_id: 0,
    description: "qwertyuiop",
    members: [],
  };

  it("renders the group title as a link", () => {
    render(
      <BrowserRouter>
        <GroupTasks group={group} />
      </BrowserRouter>
    );
    expect(screen.getByRole("link", { name: "Test group" })).toBeInTheDocument();
  });

  it("renders a task list with the group's tasks", () => {
    render(
      <BrowserRouter>
        <GroupTasks group={group} />
      </BrowserRouter>
    );
    expect(screen.getByText("Test task 1")).toBeInTheDocument();
    expect(screen.getByText("Test task 2")).toBeInTheDocument();
  });

  it("renders a message when there are no tasks", () => {
    render(
      <BrowserRouter>
        <GroupTasks group={{ ...group, tasks: [] }} />
      </BrowserRouter>
    );
    expect(screen.getByText("No tasks")).toBeInTheDocument();
  });
});
