import React, { useState } from "react";
import TaskInterface from "./TaskInterface";
import "../../styles/styles.css";

interface Props {
  task: TaskInterface;
}

const Task = ({ task }: Props) => {
  const [status, setStatus] = useState(task.done);

  return (
    <li
      key={task.id}
      id="task"
      className={`py-2 border-bottom ${
        status && "text-decoration-line-through"
      }`}
      data-group-id={task.group_id}
      data-task-id={task.id}
      onClick={() => setStatus(!status)}
    >
      {task.name}
    </li>
  );
};

export default Task;
