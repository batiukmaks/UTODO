import React from "react";
import { NavLink, useParams } from "react-router-dom";
import '../../styles/styles.css'
import GroupInterface from "../../components/Group/GroupInterface";

interface Props {
  group: GroupInterface;
}

const GroupNavbar = ({group}: Props) => {
  const current_user_id = parseInt(localStorage.getItem('current_user_id') ?? '');
  const { id } = useParams<{ id: string }>();


  return (
    <ul className="nav nav-tabs justify-content-center border-0" role="tablist">
      <li className="nav-item group-info-nav-item" role="presentation">
        <NavLink end to={`/group/${id ?? ''}`} className="nav-link" role="button">
          General
        </NavLink>
      </li>
      <li className="nav-item group-info-nav-item" role="presentation">
        <NavLink to={`tasks`} className="nav-link" role="button">
          Tasks
        </NavLink>
      </li>
      <li className="nav-item group-info-nav-item" role="presentation">
        <NavLink to={`members`} className="nav-link" role="button">
          Members
        </NavLink>
      </li>
      {group.owner_id === current_user_id && (
        <li
          id="edit-navbar"
          className="nav-item group-info-nav-item"
          role="presentation"
        >
          <NavLink to={`edit`} className="nav-link" role="button">
            Edit
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default GroupNavbar;
