import { getGroupedTasks, getMyGroups } from "../utils/group";

describe("getGroupedTasks", () => {
  it("groups tasks by group name", () => {
    const tasks = [
      {
        id: 1,
        group_id: 1,
        group_name: "Group A",
        name: "Task 1",
        status: "done",
      },
      {
        id: 2,
        group_id: 1,
        group_name: "Group A",
        name: "Task 2",
        status: "not done",
      },
      {
        id: 3,
        group_id: 2,
        group_name: "Group B",
        name: "Task 3",
        status: "done",
      },
      {
        id: 4,
        group_id: 2,
        group_name: "Group B",
        name: "Task 4",
        status: "not done",
      },
    ];
    const expected = {
      "Group A": [
        { id: 1, group_id: 1, name: "Task 1", done: true },
        { id: 2, group_id: 1, name: "Task 2", done: false },
      ],
      "Group B": [
        { id: 3, group_id: 2, name: "Task 3", done: true },
        { id: 4, group_id: 2, name: "Task 4", done: false },
      ],
    };
    const actual = getGroupedTasks(tasks);
    expect(actual).toEqual(expected);
  });
});
