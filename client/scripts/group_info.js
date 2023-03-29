function getGroupIdFromUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("group_id");
}

async function fetchGroup(group_id) {
  return fetch(`http://localhost:5000/groups/${group_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}

async function fetchOwner(owner_id) {
  return fetch(`http://localhost:5000/user/${owner_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}

async function fetchCurrentUser() {
  return fetch("http://localhost:5000/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}

async function fetchMembers(group_id) {
  return fetch(`http://localhost:5000/groups/${group_id}/members`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}

async function fetchTasks(group_id) {
  return fetch(`http://localhost:5000/groups/${group_id}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}

function updateInputs(title, description, owner) {
  document.querySelectorAll("#title").forEach((element) => {
    element.value = title;
  });
  document.querySelectorAll("#description").forEach((element) => {
    element.value = description;
  });
  document.querySelectorAll("#owner").forEach((element) => {
    element.value = owner;
  });
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
  const taskLists = document.querySelectorAll(
    "#user_tasks .list-unstyled"
    // "#user_tasks .list-unstyled, #group_tasks .list-unstyled"
  );
  taskLists.forEach((taskList) => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("py-2", "border-bottom");
      //   if (taskList.classList.contains("user_tasks") && task.status === "done") {
      //     li.classList.add("text-decoration-line-through");
      //   }
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
    const li = document.createElement("li");
    li.classList.add(
      "row",
      "row-cols-1",
      "row-cols-lg-2",
      "py-2",
      "border-bottom"
    );
    li.innerHTML = `
        <p class="col my-0">${member.name} ${member.surname}</p>
        <p class="my-0">${member.email}</p>
      `;
    memberList.appendChild(li);
  });

  if (user.id === owner.id) {
    const li = document.createElement("li");
    li.classList.add(
      "row",
      "row-cols-1",
      "row-cols-lg-2",
      "py-2",
      "border-bottom"
    );
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
document.addEventListener("keydown", (event) => {
    if (event.target.id === "new_member" && event.key === "Enter") {
      const newMemberEmail = document.querySelector("#new_member").value;
      window.alert(newMemberEmail)
      if (newMemberEmail) {
        const group_id = getGroupIdFromUrlParams();
        fetch(`http://localhost:5000/groups/${group_id}/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ email: newMemberEmail }),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Failed to add member");
            }
          })
          .then((data) => {
            members.push(data);
            updateMemberList();
          })
          .catch((err) => console.log(err));
      }
    }
  });
  

// Add an event listener for the Save button
document.addEventListener("click", (event) => {
  if (event.target.id === "save_btn") {
    const newTitle = document.querySelector("#new_title").value;
    const newDescription = document.querySelector("#new_description").value;
    const group_id = getGroupIdFromUrlParams();
    fetch(`http://localhost:5000/groups/${group_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ name: newTitle, description: newDescription }),
    })
      .then(() => {
        group.name = newTitle;
        group.description = newDescription;
        updateInputValues();
      })
      .catch((err) => console.log(err));
  }
});

// Add an event listener for the New Task input
document.addEventListener("keydown", (event) => {
  if (event.target.id === "new_task" && event.key === "Enter") {
    const newTaskName = event.target.value;
    if (newTaskName) {
      const group_id = getGroupIdFromUrlParams();
      fetch(`http://localhost:5000/groups/${group_id}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ name: newTaskName }),
      })
        .then((response) => response.json())
        .then((data) => {
          tasks.push(data);
          updateTaskLists(tasks);
        })
        .catch((err) => console.log(err));
      event.target.value = "";
    }
  }
});

const memberEmails = [
  "maksym.batiuk@lpnu.ua",
  "james.bond.007@lpnu.ua",
  "every.day@lpnu.ua",
  "random.person@lpnu.ua",
];
