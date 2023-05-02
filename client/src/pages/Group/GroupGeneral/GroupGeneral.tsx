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
          <label htmlFor="title">Title</label>
          <input id="title" className="form-control" value={group.title} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" className="form-control" value={group.description} readOnly></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input id="owner" className="form-control" value={group.owner_fullname} readOnly />
        </div>
      </div>
    </div>
  );
};

export default GroupGeneral;
