import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import GroupNavbar from "./GroupNavbar";
import GroupGeneral from "./GroupGeneral/GroupGeneral";
import GroupTasks from "./GroupTasks/GroupTasks";
import GroupMembers from "./GroupMembers/GroupMembers";
import GroupEdit from "./GroupEdit/GroupEdit";

import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import GroupInterface from "../../components/Group/GroupInterface";
import { getGroupById } from "../../utils/group";
import TaskInterface from "../../components/Task/TaskInterface";

const Group = () => {
  const [group, setGroup] = useState<GroupInterface | undefined>(default_group);
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    const result = await getGroupById(parseInt(id ?? ''));
    setGroup(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MainHeader />
      <GroupNavbar group={group || default_group} />
      <div className="container mt-5 tab-content general-info">
        <Routes>
          <Route index element={<GroupGeneral group={group || default_group} />} />
          <Route path="/tasks" element={<GroupTasks group={group || default_group} />} />
          <Route path="/members" element={<GroupMembers group={group || default_group} setGroup={setGroup} />} />
          <Route path="/edit" element={<GroupEdit group={group || default_group} setGroup={setGroup} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Group;

const default_group: GroupInterface = {
    id: -1,
    owner_fullname: "Loading...",
    owner_id: 0,
    title: "Loading...",
    description: "Loading...",
    tasks: [],
    members: [],
};