import { createElement } from "./dom.js";
import { makeRequest } from "./http.js";
import { getItem } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const createGroupForm = document.querySelector("form");

  createGroupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const groupName = e.target.querySelector("input").value;
    const description = e.target.querySelector("textarea").value;

    const accessToken = getItem("access_token");

    const data = await makeRequest("http://localhost:5000/groups/", "POST", {
      name: groupName,
      description: description,
    }, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    });

    if (data.id) {
      window.location.replace(`group_info.html?group_id=${data.id}`)
    }

    // do something with the response data
    console.log(data);
  });
});
