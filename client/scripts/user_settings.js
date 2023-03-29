document.addEventListener("DOMContentLoaded", () => {
  const firstNameInput = document.querySelector('input[name="firstName"]');
  const lastNameInput = document.querySelector('input[name="lastName"]');
  const emailInput = document.querySelector('input[name="email"]');

  fetch("http://localhost:5000/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }) // Replace with the endpoint to fetch user data
    .then((response) => response.json())
    .then((data) => {
      firstNameInput.value = data.name;
      lastNameInput.value = data.surname;
      emailInput.value = data.email;
    })
    .catch((error) => console.error(error));

  // Select the form element
  const form = document.querySelector("form");

  // Add an event listener for the form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the input values from the form
    const name = form.querySelector('[name="firstName"]').value;
    const surname = form.querySelector('[name="lastName"]').value;
    const email = form.querySelector('[name="email"]').value;
    const old_password = form.querySelector('[name="oldPassword"]').value;
    const password = form.querySelector('[name="newPassword"]').value;
    const confirmPassword = form.querySelector(
      '[name="confirmPassword"]'
    ).value;
    
    if (password != confirmPassword) {
      window.alert("Password and Confirm password are not the same.");
      return;
    }
    if (password && old_password == "") {
      window.alert("Enter the old password.");
      return;
    }

    // Create an object with the input values
    const updatedProfile = {
      name,
      surname,
      email,
      old_password,
      password,
    };


    // Use FetchAPI to update the user's profile
    fetch("http://localhost:5000/user/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the user interface to show the updated profile information
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
});
