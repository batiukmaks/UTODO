  import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Tasks from "./pages/Tasks/Tasks";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import Group from "./pages/Group/Group";
import UserSettings from "./pages/UserSettings/UserSettings";

import GroupInterface from "./components/Group/GroupInterface";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/tasks" element={<Tasks groups={get_groups()}/>} />
        <Route path="/create-group" element={<CreateGroup/>} />
        <Route path="/group/*" element={<Group/>} />
        <Route path="/user-settings" element={<UserSettings/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const groups_server: GroupInterface[] = [
  {
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
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com"
      },
      {
        firstName: "Jane",
        lastName: "Williams",
        email: "janewilliams@gmail.com"
      }
    ]
  },
  {
    id: 12,
    owner_fullname: "John Doe",
    title: "Group 12",
    description: "This is the description of group 12",
    tasks: [
      {
        group_id: 12,
        id: 12,
        name: "Task 12",
        done: true,
      },
      {
        group_id: 12,
        id: 22,
        name: "Task 22",
        done: false,
      },
    ],
    members: [
      {
        firstName: "James",
        lastName: "Bond",
        email: "realdilf007@gmail.com"
      },
      {
        firstName: "Jane",
        lastName: "Williams",
        email: "janewilliams@gmail.com"
      }
    ]
  },
];

function get_groups(): GroupInterface[] {
  return groups_server;
}