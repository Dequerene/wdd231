import places from "../data/discover.mjs";

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navMenu");
const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

function displayVisitMessage() {
  const lastVisit = Number(localStorage.getItem("lastVisit"));
  const currentVisit = Date.now();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = currentVisit - lastVisit;

    if (timeDifference < millisecondsPerDay) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
      const dayText = daysDifference === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

function createPlaceCard(place, index) {
  const card = document.createElement("section");
  const title = document.createElement("h2");
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const address = document.createElement("address");
  const description = document.createElement("p");
  const button = document.createElement("button");

  card.classList.add("place-card", `card-${index + 1}`);

  title.textContent = place.name;

  image.src = `images/${place.image}`;
  image.alt = place.name;
  image.width = 300;
  image.height = 200;
  image.loading = "lazy";

  figure.appendChild(image);

  address.textContent = place.address;
  description.textContent = place.description;

  button.type = "button";
  button.textContent = "Learn More";
  button.setAttribute("aria-label", `Learn more about ${place.name}`);

  card.appendChild(title);
  card.appendChild(figure);
  card.appendChild(address);
  card.appendChild(description);
  card.appendChild(button);

  return card;
}

function displayPlaces() {
  if (!discoverGrid) return;

  discoverGrid.innerHTML = "";

  places.forEach((place, index) => {
    discoverGrid.appendChild(createPlaceCard(place, index));
  });
}

if (visitMessage) {
  displayVisitMessage();
}

displayPlaces();