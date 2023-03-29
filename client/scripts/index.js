document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default form submission

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      localStorage.setItem("access_token", result.access_token);
      window.location.href = "tasks.html"; // redirect to tasks page
    } else {
      alert("Login failed!");
    }
  });
});
