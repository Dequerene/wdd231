document.addEventListener("DOMContentLoaded", () => {
  loadWeather();
  // depois você chama aqui a função dos spotlights, se tiver
  // loadSpotlights();
});

async function loadWeather() {
  // 🔹 Coloque AQUI a sua API key do OpenWeatherMap
  const apiKey = "YOUR_API_KEY_HERE";

  // Coordenadas de Provo, UT
  const lat = 40.2338;
  const lon = -111.6585;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  const tempSpan = document.querySelector("#current-temp");
  const descP = document.querySelector("#current-desc");
  const forecastDiv = document.querySelector("#forecast");

  if (!tempSpan || !descP || !forecastDiv) {
    console.error("Elementos do weather não encontrados no DOM.");
    return;
  }

  try {
    const [weatherResp, forecastResp] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    if (!weatherResp.ok || !forecastResp.ok) {
      throw new Error("Erro ao buscar dados de clima");
    }

    const weatherData = await weatherResp.json();
    const forecastData = await forecastResp.json();

    // 🔹 Atual: temperatura + descrição
    const currentTemp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;

    tempSpan.textContent = currentTemp;
    descP.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);

    // 🔹 Previsão 3 dias
    forecastDiv.innerHTML = "";

    const byDay = {};
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const key = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      if (!byDay[key]) {
        byDay[key] = [];
      }
      byDay[key].push(item);
    });

    // Pega próximos 3 dias (pulando o dia atual)
    const days = Object.keys(byDay).slice(1, 4);

    days.forEach((dayKey) => {
      const entries = byDay[dayKey];
      const temps = entries.map((e) => e.main.temp);
      const avgTemp =
        temps.reduce((sum, t) => sum + t, 0) / (temps.length || 1);

      const dayDiv = document.createElement("div");
      dayDiv.classList.add("forecast-day");
      dayDiv.innerHTML = `
        <span class="label">${dayKey}</span>
        <span>${Math.round(avgTemp)} °F</span>
      `;
      forecastDiv.appendChild(dayDiv);
    });
  } catch (error) {
    console.error("Erro ao carregar o clima:", error);
    descP.textContent = "Weather data unavailable.";
  }
}
