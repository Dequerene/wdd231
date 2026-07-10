const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navMenu');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('open');

  const isOpen = navigation.classList.contains('open');

  menuButton.textContent = isOpen ? '✕' : '☰';
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});