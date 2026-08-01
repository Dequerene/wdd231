const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navMenu');
const applicationInfo = document.querySelector('#application-info');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');

    const isOpen = navigation.classList.contains('open');

    menuButton.textContent = isOpen ? '✕' : '☰';
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

const params = new URLSearchParams(window.location.search);

const firstName = params.get('first') || 'Not provided';
const lastName = params.get('last') || 'Not provided';
const email = params.get('email') || 'Not provided';
const phone = params.get('phone') || 'Not provided';
const organization = params.get('organization') || 'Not provided';
const timestamp = params.get('timestamp') || 'Not provided';

let formattedDate = timestamp;

if (timestamp !== 'Not provided') {
  formattedDate = new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

if (applicationInfo) {
  applicationInfo.innerHTML = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile Phone:</strong> ${phone}</p>
    <p><strong>Business/Organization:</strong> ${organization}</p>
    <p><strong>Submitted:</strong> ${formattedDate}</p>
  `;
}