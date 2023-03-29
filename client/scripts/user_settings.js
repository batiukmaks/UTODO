import { makeRequest } from "./http.js";
import { getItem } from "./storage.js";

const firstNameInput = document.querySelector('input[name="firstName"]');
const lastNameInput = document.querySelector('input[name="lastName"]');
const emailInput = document.querySelector('input[name="email"]');
const form = document.querySelector("form");

const loadUserData = async () => {
  try {
    const url = "http://localhost:5000/user/me";
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItem("access_token")}`,
    };
    const data = await makeRequest(url, method, null, headers);
    firstNameInput.value = data.name;
    lastNameInput.value = data.surname;
    emailInput.value = data.email;
  } catch (error) {
    console.error(error);
  }
};

const updateUserProfile = async (updatedProfile) => {
  try {
    const url = "http://localhost:5000/user/";
    const method = "PUT";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItem("access_token")}`,
    };
    await makeRequest(url, method, updatedProfile, headers);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const name = form.querySelector('[name="firstName"]').value;
  const surname = form.querySelector('[name="lastName"]').value;
  const email = form.querySelector('[name="email"]').value;
  const oldPassword = form.querySelector('[name="oldPassword"]').value;
  const password = form.querySelector('[name="newPassword"]').value;
  const confirmPassword = form.querySelector('[name="confirmPassword"]').value;

  if (password !== confirmPassword) {
    window.alert("Password and Confirm password are not the same.");
    return;
  }
  if (password && oldPassword === "") {
    window.alert("Enter the old password.");
    return;
  }

  const updatedProfile = {
    name,
    surname,
    email,
    old_password: oldPassword,
    password,
  };

  await updateUserProfile(updatedProfile);
};

form.addEventListener("submit", handleSubmit);

loadUserData();
