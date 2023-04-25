import React from "react";
import GroupInterface from "../../../components/Group/GroupInterface";

interface Props {
  group: GroupInterface;
}

const GroupGeneral = ({group}: Props) => {
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
