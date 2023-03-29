document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const button = document.querySelector('button[type="submit"]');

    button.addEventListener('click', function(event) {
    event.preventDefault();

    const firstName = document.querySelector('input[placeholder="Enter first name"]').value;
    const lastName = document.querySelector('input[placeholder="Enter last name"]').value;
    const email = document.querySelector('input[placeholder="Enter email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    const data = {
        name: firstName,
        surname: lastName,
        email: email,
        password: password
    };

    fetch('http://localhost:5000/user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Redirect the user to the login page
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
    });
});
