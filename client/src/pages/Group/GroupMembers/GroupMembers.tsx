import React from "react";
import GroupMemberInterface from "./GroupMemberInterface";
import GroupInterface from "../../../components/Group/GroupInterface";

interface Props {
  group: GroupInterface;
}

const GroupMembers = ({group}: Props) => {
  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <ul className="list-unstyled members-list">
          {group.members.map((member) => (
            <li className="row row-cols-1 row-cols-lg-2 py-2 border-bottom">
              <p className="col my-0">{member.firstName} {member.lastName}</p>
              <p className="my-0">{member.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupMembers;
