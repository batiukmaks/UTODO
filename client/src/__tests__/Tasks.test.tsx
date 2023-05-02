import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import Tasks from "../pages/Tasks/Tasks";
import { getMyGroups } from "../utils/group";
import { BrowserRouter } from "react-router-dom";

const mockGroupData = [
  {
    id: 1,
    owner_fullname: "Owner Name",
    owner_id: 1,
    title: "Group 1",
    description: "Description of Group 1",
    tasks: [
      {
        id: 1,
        group_id: 1,
        name: "Task 1",
        done: false,
      },
    ],
    members: [
      {
        firstName: "Member 1",
        lastName: "Surname 1",
        email: "member1@test.com",
      },
      {
        firstName: "Member 2",
        lastName: "Surname 2",
        email: "member2@test.com",
      },
    ],
  },
  {
    id: 2,
    owner_fullname: "Owner Name",
    owner_id: 2,
    title: "Group 2",
    description: "Description of Group 2",
    tasks: [
      {
        id: 2,
        group_id: 2,
        name: "Task 2",
        done: false,
      },
    ],
    members: [
      {
        firstName: "Member 1",
        lastName: "Surname 1",
        email: "member1@test.com",
      },
      {
        firstName: "Member 2",
        lastName: "Surname 2",
        email: "member2@test.com",
      },
    ],
  },
];

jest.mock("../utils/group");

describe("Tasks", () => {
  beforeEach(() => {
    (getMyGroups as jest.Mock).mockResolvedValue(mockGroupData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of tasks", async () => {
    await act(() => {
      render(
        <BrowserRouter>
          <Tasks />
        </BrowserRouter>
      );
    });

    // Wait for the API call to finish and the component to re-render
    await waitFor(() => expect(getMyGroups).toHaveBeenCalledTimes(1));

    // Check that each group in the data is displayed
    mockGroupData.forEach((group) => {
      expect(screen.getByText(group.title)).toBeInTheDocument();
    });
  });
  

});
