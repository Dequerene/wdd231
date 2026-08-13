import { setupNavigation, updateFooter, getProducts, productCardTemplate } from './utils.js';

const productGrid = document.querySelector('#product-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const modal = document.querySelector('#product-modal');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('.modal-close');

let allProducts = [];

setupNavigation();
updateFooter();
loadProducts();

async function loadProducts() {
  try {
    const data = await getProducts();
    allProducts = data.products;

    const savedCategory = localStorage.getItem('appleMozCategory') || 'all';
    setActiveFilter(savedCategory);
    displayProducts(savedCategory);
  } catch (error) {
    productGrid.innerHTML = '<p>Product information is currently unavailable.</p>';
    console.error(error);
  }
}

function displayProducts(category) {
  const filteredProducts = category === 'all'
    ? allProducts
    : allProducts.filter((product) => product.category === category);

  productGrid.innerHTML = filteredProducts.map(productCardTemplate).join('');

  document.querySelectorAll('[data-product-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      const selectedProduct = allProducts.find((product) => product.id === productId);
      openProductModal(selectedProduct);
    });
  });
}

function setActiveFilter(category) {
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.category === category);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    localStorage.setItem('appleMozCategory', category);
    setActiveFilter(category);
    displayProducts(category);
  });
});

function openProductModal(product) {
  if (!product || !modal || !modalContent) return;

  localStorage.setItem('appleMozLastViewed', product.name);

  modalContent.innerHTML = `
    <h2>${product.name}</h2>
    <img src="images/${product.image}" alt="${product.name}" width="300" height="200">
    <p class="price">${product.price}</p>
    <p><strong>Category:</strong> ${product.category}</p>
    <p><strong>Storage:</strong> ${product.storage}</p>
    <p><strong>Availability:</strong> ${product.availability}</p>
    <p><strong>Warranty:</strong> ${product.warranty}</p>
    <p>${product.description}</p>
  `;

  modal.showModal();
}

if (modalClose) {
  modalClose.addEventListener('click', () => modal.close());
}