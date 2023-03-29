fetch('http://127.0.0.1:5000/user/all')
    .then((response) => response.json())
    .then((data) => data.forEach(user => console.log(user.email)))
    .catch((err) => console.log(err))