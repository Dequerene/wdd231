// ==== WEATHER (OpenWeatherMap) ====

const weatherApiKey = "YOUR_API_KEY_HERE"; // coloque sua API key aqui
const lat = 40.2338; // Provo latitude
const lon = -111.6585; // Provo longitude

const currentTempSpan = document.querySelector("#current-temp");
const currentDescP = document.querySelector("#current-desc");
const forecastContainer = document.querySelector("#forecast");

async function fetchWeather() {
  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather API error");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    console.error("Error fetching weather:", error);
    currentDescP.textContent = "Unable to load weather data.";
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  currentTempSpan.textContent = temp;
  currentDescP.textContent = description;
}

function displayForecast(data) {
  forecastContainer.innerHTML = "";

  const today = new Date();
  const todayStr = today.toDateString();

  const byDay = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();

    // pega apenas dias após hoje
    if (dateStr === todayStr) return;

    if (!byDay[dateStr]) {
      byDay[dateStr] = item;
    }
  });

  const dates = Object.keys(byDay).slice(0, 3); // próximos 3 dias

  dates.forEach((dateStr) => {
    const item = byDay[dateStr];
    const date = new Date(item.dt * 1000);
    const label = date.toLocaleDateString("en-US", { weekday: "short" });

    const temp = Math.round(item.main.temp);
    const desc = item.weather[0].description;

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("forecast-day");

    const labelSpan = document.createElement("span");
    labelSpan.classList.add("label");
    labelSpan.textContent = label;

    const infoSpan = document.createElement("span");
    infoSpan.textContent = `${temp}°F · ${desc}`;

    dayDiv.appendChild(labelSpan);
    dayDiv.appendChild(infoSpan);
    forecastContainer.appendChild(dayDiv);
  });
}

// ==== SPOTLIGHTS (members.json) ====

const membersUrl = "data/members.json";
const spotlightsContainer = document.querySelector("#spotlightsContainer");

async function fetchSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const members = data.members;

    // só silver (2) e gold (3)
    const goldSilver = members.filter(
      (member) => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    const spotlightMembers = getRandomMembers(goldSilver, 3);

    displaySpotlights(spotlightMembers);
  } catch (error) {
    console.error("Error fetching spotlights:", error);
    spotlightsContainer.innerHTML =
      "<p>Unable to load member spotlights at this time.</p>";
  }
}

function getRandomMembers(members, count) {
  const shuffled = [...members].sort(() => 0.5 - Math.random());
  const finalCount = Math.min(count, shuffled.length);
  // 2–3 membros: se tiver 3, mostra 3; se tiver só 2, mostra 2
  return shuffled.slice(0, finalCount);
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");
    card.dataset.level = member.membershipLevel;

    const img = document.createElement("img");
    img.src = member.image;
    img.alt = `${member.name} logo`;
    img.loading = "lazy";

    const textWrapper = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const level = document.createElement("p");
    level.classList.add("spotlight-level");
    level.textContent = formatMembershipLevel(member.membershipLevel);

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener";
    website.textContent = "Visit Website";

    textWrapper.appendChild(name);
    textWrapper.appendChild(level);
    textWrapper.appendChild(address);
    textWrapper.appendChild(phone);
    textWrapper.appendChild(website);

    card.appendChild(img);
    card.appendChild(textWrapper);

    spotlightsContainer.appendChild(card);
  });
}

function formatMembershipLevel(level) {
  switch (level) {
    case 3:
      return "Gold Member";
    case 2:
      return "Silver Member";
    default:
      return "Member";
  }
}

// ==== INIT ====
fetchWeather();
fetchSpotlights();
