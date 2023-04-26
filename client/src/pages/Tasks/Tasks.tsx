import GroupInterface from "../../components/Group/GroupInterface";
import GroupTasks from "../../components/GroupTasks/GroupTasks";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";
import { fetch_data } from "../../utils/api";
import TaskInterface from "../../components/Task/TaskInterface";
import { useEffect, useState } from "react";
interface Props {
  groups: GroupInterface[];
}

const Tasks = () => {
  const [groups, setGroups] = useState<GroupInterface[]>([]);

  const fetchData = async () => {
    const result = await get_groups();
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

async function get_groups() {
  let groups: GroupInterface[] = [];
  try {
    const group_data = await fetch_data("/groups/", "GET", null, true);
    const tasks_data = await fetch_data(`/user/tasks`, "GET");
    const groupedTasks = getGroupedTasks(tasks_data);

    for (const group of group_data) {
      const owner_data = await fetch_data(`/user/${group.owner_id}`, "GET");
      const members_data = await fetch_data(
        `/groups/${group.id}/members`,
        "GET"
      );
      const members = members_data.map((member: any) => {
        return {
          firstName: member.name,
          lastName: member.surname,
          email: member.email,
        };
      });
      const temp: GroupInterface = {
        id: group.id,
        owner_fullname: `${owner_data.name} ${owner_data.surname}`,
        title: group.name,
        description: group.description,
        tasks: groupedTasks[group.name],
        members: members,
      };
      groups.push(temp);
    }
  } catch (error: any) {
    console.log(error);
    groups = [];
  }
  return groups;
}

function groupTasksByGroupName(tasks: any) {
  return tasks.reduce((accumulator: any, currentValue: any) => {
    const groupName = currentValue.group_name;
    if (!accumulator[groupName]) {
      accumulator[groupName] = [];
    }
    accumulator[groupName].push(currentValue);
    return accumulator;
  }, {});
}

function getGroupedTasks(tasks_data: any) {
  const groupedUnsortedTasks = groupTasksByGroupName(tasks_data);
  let groupedTasks: Record<string, TaskInterface[]> = {};
  Object.entries(groupedUnsortedTasks).forEach(([groupName, tasks]) => {
    for (let task of tasks as any[]) {
      const temp: TaskInterface = {
        id: task.id,
        group_id: task.group_id,
        name: task.name,
        done: task.status === "done",
      };
      if (groupedTasks[groupName]) {
        groupedTasks[groupName].push(temp);
      } else {
        groupedTasks[groupName] = [temp];
      }
    }
  });
  return groupedTasks;
}
