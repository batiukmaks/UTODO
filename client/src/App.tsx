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
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-group" element={<CreateGroup/>} />
        <Route path="/group/*" element={<Group/>} />
        <Route path="/user-settings" element={<UserSettings/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
