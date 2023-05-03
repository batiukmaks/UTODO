import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import GroupEdit from "../pages/Group/GroupEdit/GroupEdit";
import { BrowserRouter } from "react-router-dom";

describe("GroupEdit", () => {
  const setGroup = jest.fn();
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
    owner_id: 1,
    owner_fullname: "John Doe",
    description: "Description for group 1",
    members: [],
  };

  test("should render title and description inputs with correct values", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <GroupEdit group={group} setGroup={setGroup} />
      </BrowserRouter>
    );

    expect(getByLabelText("Title")).toHaveValue(group.title);
    expect(getByLabelText("Description")).toHaveValue(group.description);
  });

  test("should update group when form is submitted", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <GroupEdit group={group} setGroup={setGroup} />
      </BrowserRouter>
    );

    const newTitle = "New Group Title";
    const newDescription = "New Group Description";

    fireEvent.change(getByLabelText("Title"), { target: { value: newTitle } });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: newDescription },
    });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => expect(setGroup).toHaveBeenCalled());

    expect(setGroup).toHaveBeenCalledWith({
      ...group,
      title: newTitle,
      description: newDescription,
    });
  });
});
