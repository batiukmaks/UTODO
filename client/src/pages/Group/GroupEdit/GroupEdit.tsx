import React, { useState } from "react";
import GroupInterface from "../../../components/Group/GroupInterface";
import { fetch_data } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

interface Props {
  group: GroupInterface;
  setGroup: (group: GroupInterface) => void;
}

const GroupEdit = ({ group, setGroup }: Props) => {
  const [title, setTitle] = useState(group.title);
  const [description, setDescription] = useState(group.description);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const update_response = fetch_data(`/groups/${group.id}`, "PUT", {
        name: title,
        description: description,
      });
      group.title = title;
      group.description = description;
      setGroup(group);
      if (newTask !== "") {
        const create_new_task_response = fetch_data(
          `/groups/${group.id}/tasks`,
          "POST",
          {
            name: newTask,
          }
        );
      }
    } catch (error: any) {
      window.alert(error);
    }
  };

  const deleteGroup = async() => {
    try {  
      const result = await fetch_data(`/groups/${group.id}`, "DELETE")
      window.alert("Group deleted successfully");
      navigate(`/tasks`);
    }
    catch (error: any) {
      window.alert(error);
    }
  };

  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="new_title">Title</label>
            <input
              id="new_title"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new_description">Description</label>
            <textarea
              id="new_description"
              className="form-control"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            ></textarea>
          </div>

          <div id="group_tasks" className="form-group">
            <label htmlFor="new_task">Add new task</label>

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
          <div className="d-flex justify-content-between gap-1">
            <button type="button" onClick={(e) => deleteGroup()} className="btn danger-button">
              Delete account
            </button>
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
