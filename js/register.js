const API_URL = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const registerForm = document.querySelector('#register-form');
const message = document.querySelector('#message');

const handleRegister = async (e) => {
  e.preventDefault();
  message.textContent = '';

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: document.querySelector('#username').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
      return;
    }
    message.textContent = 'Account registered. You can now log in.';
  } catch {
    message.textContent = 'Could not connect to server.';
  }
};

registerForm.addEventListener('submit', handleRegister);
