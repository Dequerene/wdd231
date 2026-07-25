const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navMenu');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');
const spotlights = document.querySelector('#spotlights');

const membersUrl = 'data/members.json';

const apiKey = 'e08e5c1daab5f40d636e3b04ec7aaef3';

const latitude = 40.2338;
const longitude = -111.6585;

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');

    const isOpen = navigation.classList.contains('open');

    menuButton.textContent = isOpen ? '✕' : '☰';
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

function capitalizeWords(text) {
  return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function getWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  try {
    const currentResponse = await fetch(currentUrl);

    if (!currentResponse.ok) {
      const errorText = await currentResponse.text();
      throw new Error(`Current weather error ${currentResponse.status}: ${errorText}`);
    }

    const currentData = await currentResponse.json();
    const temperature = Math.round(currentData.main.temp);
    const description = capitalizeWords(currentData.weather[0].description);

    currentWeather.innerHTML = `
      <p class="weather-temp">${temperature}&deg;F</p>
      <p>${description}</p>
    `;

    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      const errorText = await forecastResponse.text();
      throw new Error(`Forecast error ${forecastResponse.status}: ${errorText}`);
    }

    const forecastData = await forecastResponse.json();
    const today = new Date().toISOString().split('T')[0];

    const dailyForecasts = forecastData.list
      .filter((item) => {
        const itemDate = item.dt_txt.split(' ')[0];
        return itemDate > today && item.dt_txt.includes('12:00:00');
      })
      .slice(0, 3);

    const forecastItems = dailyForecasts.map((item) => {
      const date = new Date(item.dt_txt.replace(' ', 'T'));
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temp = Math.round(item.main.temp);

      return `<li><strong>${day}:</strong> ${temp}&deg;F</li>`;
    }).join('');

    forecast.innerHTML = `
      <h3>3-Day Forecast</h3>
      <ul>${forecastItems}</ul>
    `;
  } catch (error) {
    currentWeather.innerHTML = `
      <p><strong>Weather information is currently unavailable.</strong></p>
      <p>Check your API key or wait a few minutes if the key is new.</p>
    `;

    forecast.innerHTML = `
      <h3>3-Day Forecast</h3>
      <p>Forecast information is currently unavailable.</p>
    `;

    console.error(error);
  }
}

function getMembershipName(level) {
  if (level === 3) {
    return 'Gold Member';
  }

  if (level === 2) {
    return 'Silver Member';
  }

  return 'Member';
}

function shuffleMembers(members) {
  const shuffled = [...members];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(`Unable to load member data: ${response.status}`);
    }

    const data = await response.json();

    const qualifiedMembers = data.members.filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3);
    const selectedMembers = shuffleMembers(qualifiedMembers).slice(0, 3);

    displaySpotlights(selectedMembers);
  } catch (error) {
    spotlights.innerHTML = '<p>Member spotlights are currently unavailable.</p>';
    console.error(error);
  }
}

function displaySpotlights(members) {
  spotlights.innerHTML = '';

  members.forEach((member, index) => {
    const card = document.createElement('section');
    const name = document.createElement('h3');
    const image = document.createElement('img');
    const details = document.createElement('div');

    card.classList.add('spotlight-card');
    name.textContent = member.name;

    image.setAttribute('src', `images/${member.image}`);
    image.setAttribute('alt', `${member.name} business logo`);
    image.setAttribute('width', '320');
    image.setAttribute('height', '180');
    image.setAttribute('loading', index === 0 ? 'eager' : 'lazy');

    if (index === 0) {
      image.setAttribute('fetchpriority', 'high');
    }

    details.classList.add('spotlight-details');
    details.innerHTML = `
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.displayUrl}</a></p>
      <p><strong>Level:</strong> ${getMembershipName(member.membershipLevel)}</p>
    `;

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(details);

    spotlights.appendChild(card);
  });
}

if (currentWeather && forecast) {
  getWeather();
}

if (spotlights) {
  getSpotlights();
}