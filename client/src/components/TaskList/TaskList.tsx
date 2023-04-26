import React, { useState } from "react";
import Task from "../Task/Task";
import TaskInterface from "../Task/TaskInterface";
import "../../styles/styles.css";


interface Props {
  tasks: TaskInterface[];
}

const TaskList = ({ tasks }: Props) => {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks</p>;
  }
  return (
    <>
      <ul className="text-wrap list-unstyled">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
