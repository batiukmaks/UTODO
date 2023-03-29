// Import reusable functions
import { makeRequest } from "./http.js";
import { getItem, setItem } from "./storage.js";

// Define login function
async function login(email, password) {
  try {
    const result = await makeRequest("http://localhost:5000/user/login", "POST", { email, password });
    console.log(result);
    setItem("access_token", result.access_token);
    window.location.href = "tasks.html"; // redirect to tasks page
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed!");
  }
}

// Add event listener to form submit event
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // prevent default form submission
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    await login(email, password);
  });
});
