import React from "react";
import TaskInterface from "../../../components/Task/TaskInterface";
import TaskList from "../../../components/TaskList/TaskList";

const GroupTasks = () => {
  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <TaskList tasks={tasks1} />
      </div>
    </div>
  );
};

export default GroupTasks;
const tasks1: TaskInterface[] = [
  {
    group_id: 1,
    id: 1,
    name: "Task 1",
    done: false,
  },
  {
    group_id: 1,
    id: 2,
    name: "Task 2",
    done: true,
  },
];

