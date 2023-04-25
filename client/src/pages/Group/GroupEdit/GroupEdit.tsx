import React from "react";

const GroupEdit = () => {
  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <form autoComplete="off">
          <div className="form-group">
            <label>Title</label>
            <input id="new_title" className="form-control" value={group.title} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea id="new_description" className="form-control">{group.description}</textarea>
          </div>

          <div id="group_tasks" className="form-group">
            <label>Add new task</label>

            <ul className="list-unstyled group_tasks">
              <li className="border-bottom">
                <input
                  id="new_task"
                  className="w-100 form-control input-sm ps-0 border-0"
                />
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-end gap-1">
            <a id="save_btn" className="btn theme-button">
              Save
            </a>
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
  owner_fullname: "James Bond"
}