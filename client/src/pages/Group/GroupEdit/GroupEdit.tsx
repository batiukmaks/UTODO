import React, { useState } from "react";
import GroupInterface from "../../../components/Group/GroupInterface";

interface Props {
  group: GroupInterface;
}

const GroupEdit = ({ group }: Props) => {
  const [title, setTitle] = useState(group.title);
  const [description, setDescription] = useState(group.description);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("GroupEdit form submitted!");
    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("New task: ", newTask);
  }

  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              id="new_title"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              id="new_description"
              className="form-control"
              onChange={(event) => setDescription(event.target.value)}
            >
              {description}
            </textarea>
          </div>

          <div id="group_tasks" className="form-group">
            <label>Add new task</label>

            <ul className="list-unstyled group_tasks">
              <li className="border-bottom">
                <input
                  id="new_task"
                  className="w-100 form-control input-sm ps-0 border-0"
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                />
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-end gap-1">
            <button type="submit" id="save_btn" className="btn theme-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupEdit;

interface GroupInfo {
  title: string;
  description: string;
  owner_fullname: string;
}

const group: GroupInfo = {
  title: "Group 1",
  description: "This is the description of group 1",
  owner_fullname: "James Bond",
};
