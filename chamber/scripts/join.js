const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navMenu');
const timestamp = document.querySelector('#timestamp');
const modalButtons = document.querySelectorAll('[data-modal]');
const closeButtons = document.querySelectorAll('.close-modal');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');

    const isOpen = navigation.classList.contains('open');

    menuButton.textContent = isOpen ? '✕' : '☰';
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

if (timestamp) {
  timestamp.value = new Date().toISOString();
}

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.querySelector(`#${modalId}`);

    if (modal) {
      modal.showModal();
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('dialog');

    if (modal) {
      modal.close();
    }
  });
});