import React from "react";
import { Routes, Route } from "react-router-dom";

import GroupNavbar from "./GroupNavbar";
import GroupGeneral from "./GroupGeneral/GroupGeneral";
import GroupTasks from "./GroupTasks/GroupTasks";
import GroupMembers from "./GroupMembers/GroupMembers";
import GroupEdit from "./GroupEdit/GroupEdit";

import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";

const Group = () => {
  return (
    <>
      <MainHeader />
      <GroupNavbar />
      <div className="container mt-5 tab-content general-info">
        <Routes>
          <Route index element={<GroupGeneral />} />
          <Route path="/tasks" element={<GroupTasks />} />
          <Route path="/members" element={<GroupMembers />} />
          <Route path="/edit" element={<GroupEdit />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Group;
