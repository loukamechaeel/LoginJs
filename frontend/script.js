// frontend/script.js
const loginButton = document.getElementById('login-button');
const responseDiv = document.getElementById('response');

loginButton.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  responseDiv.innerHTML = data.message;
});

