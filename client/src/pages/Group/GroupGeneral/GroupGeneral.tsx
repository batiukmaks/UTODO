import React from "react";

const GroupGeneral = () => {
  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <div className="form-group">
          <label>Title</label>
          <input id="title" className="form-control" value={group.title} readOnly />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea id="description" className="form-control" readOnly>{group.description}</textarea>
        </div>
        <div className="form-group">
          <label>Owner</label>
          <input id="owner" className="form-control" value={group.owner_fullname} readOnly />
        </div>
      </div>
    </div>
  );
};

export default GroupGeneral;

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