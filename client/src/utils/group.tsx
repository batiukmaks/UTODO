import { fetch_data } from "./api";
import GroupInterface from "../components/Group/GroupInterface";
import TaskInterface from "../components/Task/TaskInterface";

export async function getMyGroups() {
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
        owner_id: group.owner_id,
        title: group.name,
        description: group.description,
        tasks: groupedTasks[group.name],
        members: members,
      };
      groups.push(temp);
    }
  } catch (error: any) {
    console.log(error.message);
    groups = [];
  }
  return groups;
};

export function groupTasksByGroupName(tasks: any) {
  return tasks.reduce((accumulator: any, currentValue: any) => {
    const groupName = currentValue.group_name;
    if (!accumulator[groupName]) {
      accumulator[groupName] = [];
    }
    accumulator[groupName].push(currentValue);
    return accumulator;
  }, {});
};

export function getGroupedTasks(tasks_data: any) {
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
};

export async function getGroupById(id: number) {
    const groups = await getMyGroups();
    const group = groups.find((group) => group.id === id);
    return group
}