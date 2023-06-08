import React, { useState } from "react";
import Task from "../Task/Task";
import TaskInterface from "../Task/TaskInterface";
import "../../styles/styles.css";

interface Props {
  tasks: TaskInterface[];
}

const TaskList = ({ tasks }: Props) => {
  const [updatedTasks, setUpdatedTasks] = useState(tasks);

  const onTaskStatusChange = (taskId: number, newStatus: boolean) => {
    const updatedTaskList = updatedTasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          done: newStatus,
        };
      }
      return task;
    });
    setUpdatedTasks(updatedTaskList);
  };

  if (!tasks || tasks.length === 0) {
    return <p>No tasks</p>;
  }

  const sortedTasks = [...updatedTasks].sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    } else if (!a.done && b.done) {
      return -1;
    }

    return a.id - b.id;
  });

  return (
    <ul className="text-wrap list-unstyled">
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onTaskStatusChange={onTaskStatusChange}
        />
      ))}
    </ul>
  );
};

export default TaskList;
