import React, { useState } from "react";
import GroupMemberInterface from "./GroupMemberInterface";
import GroupInterface from "../../../components/Group/GroupInterface";
import { useParams } from "react-router-dom";
import { fetch_data } from "../../../utils/api";

interface Props {
  group: GroupInterface;
}

const GroupMembers = ({ group }: Props) => {
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const current_user_id = parseInt(
    localStorage.getItem("current_user_id") ?? ""
  );
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch_data(`/groups/${group.id}/members`, "POST", {
        email: newMemberEmail,
      })
    } catch (error: any) {
      window.alert(error);
    }
  };

  if (!group.members || group.members.length === 0) {
    return <p>No group members</p>;
  }

  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <form role="form" autoComplete="off" onSubmit={handleSubmit}>
          <ul className="list-unstyled members-list">
            {group.members.map((member) => (
              <li
                key={member.email}
                className="row row-cols-1 row-cols-lg-2 py-2 border-bottom"
              >
                <p className="col my-0">
                  {member.firstName} {member.lastName}
                </p>
                <p className="my-0">{member.email}</p>
              </li>
            ))}
            {group.owner_id === current_user_id && (
              <li className="row row-cols-1 row-cols-lg-2 py-2 border-bottom">
                <input
                  placeholder="Member's email"
                  className="w-100 form-control input-sm ps-2 border-0"
                  value={newMemberEmail}
                  onChange={(event) => setNewMemberEmail(event.target.value)}
                />
              </li>
            )}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default GroupMembers;
