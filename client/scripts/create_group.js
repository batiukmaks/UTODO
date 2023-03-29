document.addEventListener("DOMContentLoaded", () => {
  const createGroupForm = document.querySelector("form");

  createGroupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const groupName = e.target.querySelector("input").value;
    const description = e.target.querySelector("textarea").value;

    const response = await fetch("http://localhost:5000/groups/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        name: groupName,
        description: description,
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      window.location.replace(`group_info.html?group_id=${data.id}`)
    }

    // do something with the response data
    console.log(data);
  });
});
