const dataUrl = "data/members.json";
const membersContainer = document.querySelector("#membersContainer");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

async function getMembers() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error fetching members:", error);
    membersContainer.innerHTML = "<p>Sorry, we could not load the directory at this time.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");
    card.dataset.level = member.membershipLevel;

    const img = document.createElement("img");
    img.src = member.image;
    img.alt = `${member.name} logo`;
    img.loading = "lazy";

    const name = document.createElement("h2");
    name.textContent = member.name;

    const level = document.createElement("p");
    level.classList.add("member-level");
    level.textContent = formatMembershipLevel(member.membershipLevel);

    const desc = document.createElement("p");
    desc.classList.add("member-desc");
    desc.textContent = member.description;

    const address = document.createElement("p");
    address.classList.add("member-address");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.classList.add("member-phone");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener";
    website.textContent = "Visit Website";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(level);
    card.appendChild(desc);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    membersContainer.appendChild(card);
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

// Toggle view
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");

  gridBtn.classList.add("active");
  listBtn.classList.remove("active");

  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");

  listBtn.classList.add("active");
  gridBtn.classList.remove("active");

  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});

// start
getMembers();
