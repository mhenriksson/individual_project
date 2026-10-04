const API_URL = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const userInfo = document.querySelector('#user-info');
const loginLink = document.querySelector('#login-link');
const logoutBtn = document.querySelector('#logout-btn');

const checkToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }

  const response = await fetch(`${API_URL}/users/token`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  if (!response.ok) {
    return;
  }
  const user = await response.json();
  userInfo.textContent = `Hi, ${user.username}`;
  loginLink.hidden = true;
  logoutBtn.hidden = false;
};

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  userInfo.textContent = '';
  loginLink.hidden = false;
  logoutBtn.hidden = true;
});

checkToken();
