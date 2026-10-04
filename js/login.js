const API_URL = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const loginForm = document.querySelector('#login-form');
const message = document.querySelector('#message');

const handleLogin = async (e) => {
  e.preventDefault();
  message.textContent = '';

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
      }),
    });
    const data = await response.json();

    if (!data.token) {
      message.textContent = data.message;
      return;
    }
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } catch {
    message.textContent = 'Could not connect to server.';
  }
};

loginForm.addEventListener('submit', handleLogin);
