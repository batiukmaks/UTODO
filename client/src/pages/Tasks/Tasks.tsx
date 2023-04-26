import GroupInterface from "../../components/Group/GroupInterface";
import GroupTasks from "../../components/GroupTasks/GroupTasks";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";
import { fetch_data } from "../../utils/api";
import TaskInterface from "../../components/Task/TaskInterface";
import { useEffect, useState } from "react";
import { getMyGroups } from "../../utils/group";
interface Props {
  groups: GroupInterface[];
}

const Tasks = () => {
  const [groups, setGroups] = useState<GroupInterface[]>([]);

  const fetchData = async () => {
    const result = await getMyGroups();
    setGroups(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MainHeader />
      <main className="container align-items-center mb-5">
        <div id="tasks" className="row row-cols-1 row-cols-lg-3 g-5 tasks">
          {groups.map((group) => (
            <div key={group.id} className="col">
              <GroupTasks group={group} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Tasks;

