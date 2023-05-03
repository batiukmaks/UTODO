import React from "react";
import TaskList from "../TaskList/TaskList";
import "../../styles/styles.css";
import { Link } from "react-router-dom";
import GroupInterface from "../Group/GroupInterface";

interface Props {
  group: GroupInterface;
}

const GroupTasks = ({ group }: Props) => {
  return (
    <>
      <div className="h-100 border rounded-3 p-3">
        <div className="h4 mb-3 text-center">
          <Link to={`/group/${group.id}`} className="group-name">
            {group.title}
          </Link>
        </div>
        <TaskList tasks={group.tasks} />
      </div>
    </>
  );
};

export default GroupTasks;
