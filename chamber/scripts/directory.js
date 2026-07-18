const url = 'data/members.json';
const membersContainer = document.querySelector('#members');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navMenu');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('open');

  const isOpen = navigation.classList.contains('open');

  menuButton.textContent = isOpen ? '✕' : '☰';
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

async function getMembers() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unable to load member data: ${response.status}`);
    }

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    membersContainer.innerHTML = '<p>Business directory information is currently unavailable.</p>';
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

function displayMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach((member, index) => {
    const card = document.createElement('section');
    const name = document.createElement('h3');
    const tagline = document.createElement('p');
    const image = document.createElement('img');
    const details = document.createElement('div');
    const address = document.createElement('p');
    const phone = document.createElement('p');
    const website = document.createElement('p');
    const category = document.createElement('p');
    const membership = document.createElement('span');

    card.classList.add('member-card');
    name.textContent = member.name;
    tagline.classList.add('tagline');
    tagline.textContent = member.tagline;

    image.setAttribute('src', `images/${member.image}`);
    image.setAttribute('alt', `${member.name} business logo`);
    image.setAttribute('loading', index === 0 ? 'eager' : 'lazy');

    if (index === 0) {
      image.setAttribute('fetchpriority', 'high');
    }

    image.setAttribute('width', '320');
    image.setAttribute('height', '180');

    details.classList.add('member-details');
    address.innerHTML = `<strong>Address:</strong> ${member.address}`;
    phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;
    website.innerHTML = `<strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.displayUrl}</a>`;
    category.innerHTML = `<strong>Category:</strong> ${member.category}`;

    membership.classList.add('membership', `level-${member.membershipLevel}`);
    membership.textContent = getMembershipName(member.membershipLevel);

    details.appendChild(address);
    details.appendChild(phone);
    details.appendChild(website);
    details.appendChild(category);
    details.appendChild(membership);

    card.appendChild(name);
    card.appendChild(tagline);
    card.appendChild(image);
    card.appendChild(details);

    membersContainer.appendChild(card);
  });
}

function setGridView() {
  membersContainer.classList.add('members-grid');
  membersContainer.classList.remove('members-list');

  gridButton.classList.add('active-view');
  listButton.classList.remove('active-view');

  gridButton.setAttribute('aria-pressed', 'true');
  listButton.setAttribute('aria-pressed', 'false');
}

function setListView() {
  membersContainer.classList.add('members-list');
  membersContainer.classList.remove('members-grid');

  listButton.classList.add('active-view');
  gridButton.classList.remove('active-view');

  listButton.setAttribute('aria-pressed', 'true');
  gridButton.setAttribute('aria-pressed', 'false');
}

gridButton.addEventListener('click', setGridView);
listButton.addEventListener('click', setListView);

getMembers();