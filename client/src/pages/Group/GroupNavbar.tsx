import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/styles.css'

const GroupNavbar = () => {
  return (
    <ul className="nav nav-tabs justify-content-center border-0" role="tablist">
      <li className="nav-item group-info-nav-item" role="presentation">
        <NavLink end to="/group" className="nav-link" role="button">
          General
        </NavLink>
      </li>
      <li className="nav-item group-info-nav-item" role="presentation">
        <NavLink to="tasks" className="nav-link" role="button">
          Tasks
        </NavLink>
      </li>
      <li className="nav-item group-info-nav-item" role="presentation">
        <NavLink to="members" className="nav-link" role="button">
          Members
        </NavLink>
      </li>
      <li
        id="edit-navbar"
        className="nav-item group-info-nav-item"
        role="presentation"
      >
        <NavLink to="edit" className="nav-link" role="button">
          Edit
        </NavLink>
      </li>
    </ul>
  );
};

export default GroupNavbar;
