function getTokenHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}

async function getTasks() {
  const response = await fetch("http://localhost:5000/user/tasks", {
    method: "GET",
    headers: getTokenHeader(),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
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
  const groupDiv = document.createElement("div");
  groupDiv.classList.add("col");
  const groupContent = `
      <div class="h-100 border rounded-3 p-3">
        <div class="h4 mb-3 text-center">
          <a href="group_info.html?group_id=${
            tasks[0].group_id
          }" class="group-name">${groupName}</a>
        </div>
        <ul class="list-unstyled text-wrap">
          ${tasks
            .map(
              (task) =>
                `<li id="task" class="py-2 border-bottom ${task.status === 'done' ? 'text-decoration-line-through' : ''}" data-group-id="${task.group_id}" data-task-id="${task.id}">
                  ${task.name}
                </li>`
            )
            .join("")}
        </ul>
      </div>
    `;
  groupDiv.innerHTML = groupContent;
  return groupDiv;
}

function renderTasks() {
  const tasks = getTasks();
  tasks
    .then((tasks) => {
      const groupedTasks = groupTasksByGroupName(tasks);
      const tasksList = document.querySelector("#tasks");
      tasksList.innerHTML = ""; // clear any existing tasks
      for (const [groupName, tasks] of Object.entries(groupedTasks)) {
        const groupDiv = createGroupElement(groupName, tasks);
        tasksList.appendChild(groupDiv);
      }
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
}

document.addEventListener("DOMContentLoaded", renderTasks);

document.addEventListener("click", async (event) => {
  if (event.target.id == "task") {
    const taskId = event.target.dataset.taskId;
    const response = await fetch(`http://localhost:5000/user/tasks/${taskId}`, {
      method: "PUT",
      headers: getTokenHeader(),
      body: JSON.stringify({ status: "switch" }),
    });

    if (response.ok){
        if (event.target.style.textDecorationLine === "line-through" || event.target.classList.contains("text-decoration-line-through")) {
            event.target.style.textDecorationLine = "none";
            event.target.classList.remove("text-decoration-line-through");
        } else {
            event.target.style.textDecorationLine = "line-through";
        }
    }

  }
});
