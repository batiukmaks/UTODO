import React from "react";
import { Routes, Route } from "react-router-dom";

import GroupNavbar from "./GroupNavbar";
import GroupGeneral from "./GroupGeneral/GroupGeneral";
import GroupTasks from "./GroupTasks/GroupTasks";
import GroupMembers from "./GroupMembers/GroupMembers";
import GroupEdit from "./GroupEdit/GroupEdit";

import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import GroupInterface from "../../components/Group/GroupInterface";

const Group = () => {
  return (
    <>
      <MainHeader />
      <GroupNavbar />
      <div className="container mt-5 tab-content general-info">
        <Routes>
          <Route index element={<GroupGeneral group={groupInfo} />} />
          <Route path="/tasks" element={<GroupTasks group={groupInfo} />} />
          <Route path="/members" element={<GroupMembers group={groupInfo} />} />
          <Route path="/edit" element={<GroupEdit group={groupInfo} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Group;

const groupInfo: GroupInterface = {
  id: 1,
  owner_fullname: "John Doe",
  title: "Group 1",
  description: "This is the description of group 1",
  tasks: [
    {
      group_id: 1,
      id: 1,
      name: "Task 1",
      done: false,
    },
    {
      group_id: 1,
      id: 2,
      name: "Task 2",
      done: true,
    },
  ],
  members: [
    {
      firstName: "James",
      lastName: "Bond",
      email: "realdilf007@gmail.com",
    },
    {
      firstName: "Jane",
      lastName: "Williams",
      email: "janewilliams@gmail.com",
    },
  ],
};
