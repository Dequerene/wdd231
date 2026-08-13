import { setupNavigation, updateFooter, getProducts } from './utils.js';

const productSelect = document.querySelector('#product');
const timestamp = document.querySelector('#timestamp');
const nameInput = document.querySelector('#first');

setupNavigation();
updateFooter();
loadProductOptions();

if (timestamp) {
  timestamp.value = new Date().toISOString();
}

if (nameInput) {
  nameInput.value = localStorage.getItem('appleMozFirstName') || '';
  nameInput.addEventListener('change', () => {
    localStorage.setItem('appleMozFirstName', nameInput.value);
  });
}

async function loadProductOptions() {
  if (!productSelect) return;

  try {
    const data = await getProducts();
    data.products.forEach((product) => {
      const option = document.createElement('option');
      option.value = product.name;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}