import React from "react";
import TaskInterface from "../../../components/Task/TaskInterface";
import TaskList from "../../../components/TaskList/TaskList";
import GroupInterface from "../../../components/Group/GroupInterface";

interface Props {
  group: GroupInterface;
}

const GroupTasks = ({group}: Props) => {
  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <TaskList tasks={group.tasks} />
      </div>
    </div>
  );
};

export default GroupTasks;
