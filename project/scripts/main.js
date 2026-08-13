import { setupNavigation, updateFooter, getProducts, productCardTemplate } from './utils.js';

const featuredProducts = document.querySelector('#featured-products');
const visitMessage = document.querySelector('#visit-message');

setupNavigation();
updateFooter();
showVisitMessage();
loadFeaturedProducts();

function showVisitMessage() {
  if (!visitMessage) return;

  const visits = Number(localStorage.getItem('appleMozVisits')) || 0;
  const newVisitCount = visits + 1;
  localStorage.setItem('appleMozVisits', newVisitCount);

  visitMessage.textContent = newVisitCount === 1
    ? 'Welcome to Apple Moz Store. Explore trusted product information for Mozambique.'
    : `Welcome back! You have visited this project ${newVisitCount} times.`;
}

async function loadFeaturedProducts() {
  if (!featuredProducts) return;

  try {
    const data = await getProducts();
    const featured = data.products.filter((product) => product.category === 'iPhone').slice(0, 3);
    featuredProducts.innerHTML = featured.map(productCardTemplate).join('');
  } catch (error) {
    featuredProducts.innerHTML = '<p>Featured products are currently unavailable.</p>';
    console.error(error);
  }
}