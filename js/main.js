const API_URL = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const select = document.querySelector('#restaurant-select');
const restaurantName = document.querySelector('#restaurant-name');
const menu = document.querySelector('#menu');
const todayBtn = document.querySelector('#today-btn');
const weekBtn = document.querySelector('#week-btn');
const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

let restaurants = [];
let showWeekly = false;

const courseCard = (course) => `
  <div class="product-card">
    <h2>${course.name}</h2>
    <p>${course.diets || ''}</p>
    <p class="price">${course.price || ''}</p>
  </div>
`;

const showMenu = async () => {
  menu.innerHTML = '';

  if (showWeekly) {
    const response = await fetch(
      `${API_URL}/restaurants/weekly/${select.value}/en`
    );
    const data = await response.json();

    data.days.forEach((day, index) => {
      menu.innerHTML += `<h2 class="day">${weekdays[index]}</h2>`;
      for (const course of day.courses) {
        menu.innerHTML += courseCard(course);
      }
    });
  } else {
    const response = await fetch(
      `${API_URL}/restaurants/daily/${select.value}/en`
    );
    const data = await response.json();

    if (data.courses.length > 0) {
      const today = new Date().toLocaleDateString('en-GB', {weekday: 'long'});
      menu.innerHTML += `<h2 class="day">${today}</h2>`;
    }

    for (const course of data.courses) {
      menu.innerHTML += courseCard(course);
    }
  }

  if (menu.innerHTML === '') {
    menu.innerHTML = '<p>No menu available.</p>';
  }
};

const showRestaurant = () => {
  const restaurant = restaurants.find(
    (restaurant) => restaurant._id === select.value
  );
  restaurantName.textContent = restaurant.name;
  showMenu();
};

const getRestaurants = async () => {
  const response = await fetch(`${API_URL}/restaurants`);
  restaurants = await response.json();

  for (const restaurant of restaurants) {
    select.innerHTML += `<option value="${restaurant._id}">${restaurant.name}</option>`;
  }

  showRestaurant();
};
todayBtn.addEventListener('click', () => {
  showWeekly = false;
  todayBtn.classList.add('active');
  weekBtn.classList.remove('active');
  showMenu();
});

weekBtn.addEventListener('click', () => {
  showWeekly = true;
  weekBtn.classList.add('active');
  todayBtn.classList.remove('active');
  showMenu();
});
select.addEventListener('change', showRestaurant);

getRestaurants();
