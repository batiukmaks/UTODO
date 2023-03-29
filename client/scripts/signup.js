import { makeRequest } from "./http.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector('button[type="submit"]');

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const firstName = document.querySelector(
      'input[placeholder="Enter first name"]'
    ).value;
    const lastName = document.querySelector(
      'input[placeholder="Enter last name"]'
    ).value;
    const email = document.querySelector(
      'input[placeholder="Enter email"]'
    ).value;
    const password = document.querySelector(
      'input[placeholder="Password"]'
    ).value;

    const data = {
      name: firstName,
      surname: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await makeRequest(
        "http://localhost:5000/user",
        "POST",
        data
      );

      console.log("Success:", response);
      // Redirect the user to the login page
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
