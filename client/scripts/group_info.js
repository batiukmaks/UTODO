import { makeRequest } from "./http.js";
import { getItem } from "./storage.js";
import { createElement } from "./dom.js";

function getGroupIdFromUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("group_id");
}

async function fetchGroup(group_id) {
  return makeRequest(`http://localhost:5000/groups/${group_id}`, "GET");
}

async function fetchOwner(owner_id) {
  return makeRequest(`http://localhost:5000/user/${owner_id}`, "GET");
}

async function fetchCurrentUser() {
  return makeRequest(`http://localhost:5000/user/me`, "GET");
}

async function fetchMembers(group_id) {
  return makeRequest(`http://localhost:5000/groups/${group_id}/members`, "GET");
}

async function fetchTasks(group_id) {
  return makeRequest(`http://localhost:5000/groups/${group_id}/tasks`, "GET");
}

function updateInputValues() {
  document
    .querySelectorAll("#title, #new_title")
    .forEach((element) => (element.value = group.name));
  document
    .querySelectorAll("#description, #new_description")
    .forEach((element) => (element.value = group.description));
  document
    .querySelectorAll("#owner")
    .forEach((element) => (element.value = `${owner.name} ${owner.surname}`));
}

function updateTaskLists() {
  const taskLists = document.querySelectorAll("#user_tasks .list-unstyled");
  taskLists.forEach((taskList) => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("py-2", "border-bottom");
      li.textContent = task.name;
      taskList.appendChild(li);
    });

    if (taskList.classList.contains("group_tasks")) {
      const li = document.createElement("li");
      li.innerHTML = `
          <input id="new_task" class="w-100 form-control input-sm ps-0 border-0" />
        `;
      li.classList.add("border-bottom");
      taskList.appendChild(li);
    }
  });
}

function updateMemberList() {
  const memberList = document.querySelector("#members .members-list");
  memberList.innerHTML = "";
  members.forEach((member) => {
    const li = createElement("li", {
      class: "row row-cols-1 row-cols-lg-2 py-2 border-bottom"
    });
    li.innerHTML = `
        <p class="col my-0">${member.name} ${member.surname}</p>
        <p class="my-0">${member.email}</p>
      `;
    memberList.appendChild(li);
  });

  if (user.id === owner.id) {
    const li = createElement("li", {
      class: "row row-cols-1 row-cols-lg-2 py-2 border-bottom"
    });
    li.innerHTML = `
      <input id="new_member" placeholder="Member's email" class="w-100 form-control input-sm ps-2 border-0" />
    `;
    memberList.appendChild(li);
  }
}

function hideEditSectionIfNotOwner() {
  const editSection = document.querySelector("#edit, #edit-navbar");
  if (owner.id !== user.id) {
    editSection.style.display = "none";
  } else {
    editSection.style.display = "block";
  }
}

// Declare variables
let group;
let owner;
let user;
let tasks;
let members;

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", async () => {
  const group_id = getGroupIdFromUrlParams();
  group = await fetchGroup(group_id);
  owner = await fetchOwner(group.owner_id);
  user = await fetchCurrentUser();
  members = await fetchMembers(group_id);
  tasks = await fetchTasks(group_id);
  updateInputValues();
  updateTaskLists();
  updateMemberList();
  hideEditSectionIfNotOwner();
});

// Add an event listener for the Add Member button
document.addEventListener("keydown", async (event) => {
  if (event.target.id === "new_member" && event.key === "Enter") {
    const newMemberEmail = document.querySelector("#new_member").value;
    if (newMemberEmail) {
      const group_id = getGroupIdFromUrlParams();
      const response = await makeRequest(
        `http://localhost:5000/groups/${group_id}/members`,
        "POST",
        { email: newMemberEmail }
      );

      members.push(response);
      updateMemberList();
    }
  }
});

// Add an event listener for the Save button
document.addEventListener("click", async (event) => {
  if (event.target.id === "save_btn") {
    const newTitle = document.querySelector("#new_title").value;
    const newDescription = document.querySelector("#new_description").value;
    const group_id = getGroupIdFromUrlParams();
    const response = await makeRequest(
      `http://localhost:5000/groups/${group_id}`,
      "PUT",
      { name: newTitle, description: newDescription }
    );
    group.name = newTitle;
    group.description = newDescription;
    updateInputValues();
  }
});

// Add an event listener for the New Task input
document.addEventListener("keydown", async (event) => {
  if (event.target.id === "new_task" && event.key === "Enter") {
    const newTaskName = event.target.value;
    if (newTaskName) {
      const group_id = getGroupIdFromUrlParams();
      const response = await makeRequest(
        `http://localhost:5000/groups/${group_id}/tasks`,
        "POST",
        { name: newTaskName }
      );
      tasks = await fetchTasks(group_id);
      updateTaskLists();
      event.target.value = "";
    }
  }
});
