import { makeRequest } from "./http.js";
import { getItem } from "./storage.js";
import { createElement } from "./dom.js";

async function getTasks() {
  const accessToken = getItem("access_token");
  const tasks = await makeRequest("http://localhost:5000/user/tasks", "GET", null, {
    "Authorization": `Bearer ${accessToken}`,
  });
  return tasks;
}

function groupTasksByGroupName(tasks) {
  return tasks.reduce((accumulator, currentValue) => {
    const groupName = currentValue.group_name;
    if (!accumulator[groupName]) {
      accumulator[groupName] = [];
    }
    accumulator[groupName].push(currentValue);
    return accumulator;
  }, {});
}

function createGroupElement(groupName, tasks) {
  const groupDiv = createElement("div", { class: "col" });
  const groupLink = createElement("a", { href: `group_info.html?group_id=${tasks[0].group_id}`, class: "group-name" });
  groupLink.innerText = groupName;
  const groupHeader = createElement("div", { class: "h-100 border rounded-3 p-3" });
  const groupTitle = createElement("div", { class: "h4 mb-3 text-center" });
  groupTitle.appendChild(groupLink);
  groupHeader.appendChild(groupTitle);
  const taskList = createElement("ul", { class: "list-unstyled text-wrap" });
  tasks.forEach((task) => {
    const taskItem = createElement("li", {
      id: "task",
      class: `py-2 border-bottom ${task.status === "done" ? "text-decoration-line-through" : ""}`,
      "data-group-id": task.group_id,
      "data-task-id": task.id,
    });
    taskItem.innerText = task.name;
    taskList.appendChild(taskItem);
  });
  groupHeader.appendChild(taskList);
  groupDiv.appendChild(groupHeader);
  return groupDiv;
}

async function renderTasks() {
  try {
    const tasks = await getTasks();
    const groupedTasks = groupTasksByGroupName(tasks);
    const tasksList = document.querySelector("#tasks");
    tasksList.innerHTML = ""; // clear any existing tasks
    Object.entries(groupedTasks).forEach(([groupName, tasks]) => {
      const groupDiv = createGroupElement(groupName, tasks);
      tasksList.appendChild(groupDiv);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

document.addEventListener("DOMContentLoaded", renderTasks);

document.addEventListener("click", async (event) => {
  if (event.target.id == "task") {
    const taskId = event.target.dataset.taskId;
    const accessToken = getItem("access_token");
    try {
      await makeRequest(`http://localhost:5000/user/tasks/${taskId}`, "PUT", { status: "switch" }, {
        "Authorization": `Bearer ${accessToken}`,
      });
      if (
        event.target.style.textDecorationLine === "line-through" ||
        event.target.classList.contains("text-decoration-line-through")
      ) {
        event.target.style.textDecorationLine = "none";
        event.target.classList.remove("text-decoration-line-through");
      } else {
        event.target.style.textDecorationLine = "line-through";
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
});
