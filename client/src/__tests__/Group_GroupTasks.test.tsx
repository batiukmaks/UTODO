import React from "react";
import { render } from "@testing-library/react";
import GroupTasks from "../pages/Group/GroupTasks/GroupTasks";
import GroupInterface from "../components/Group/GroupInterface";

describe("GroupTasks", () => {
    const mockGroup: GroupInterface = {
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
        owner_id: 1,
        owner_fullname: "John Doe",
        description: "Description for group 1",
        members: [],
      };

  it("should render TaskList component with group tasks", () => {
    const { getByText } = render(<GroupTasks group={mockGroup} />);
    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
  });
});
