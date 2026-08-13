export function setupNavigation() {
  const menuButton = document.querySelector('#menu');
  const navigation = document.querySelector('#primary-nav');

  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    const isOpen = navigation.classList.contains('open');
    menuButton.textContent = isOpen ? '✕' : '☰';
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

export function updateFooter() {
  const year = document.querySelector('#currentyear');
  const modified = document.querySelector('#lastModified');
  if (year) year.textContent = new Date().getFullYear();
  if (modified) modified.textContent = `Last Modification: ${document.lastModified}`;
}

export async function getProducts() {
  const response = await fetch('data/products.json');
  if (!response.ok) {
    throw new Error(`Product data request failed: ${response.status}`);
  }
  return response.json();
}

export function productCardTemplate(product) {
  return `
    <section class="product-card">
      <img src="images/${product.image}" alt="${product.name}" width="300" height="200" loading="lazy">
      <div class="product-card-content">
        <h3>${product.name}</h3>
        <span class="badge">${product.category}</span>
        <p class="price">${product.price}</p>
        <p><strong>Storage:</strong> ${product.storage}</p>
        <p>${product.description}</p>
        <button type="button" data-product-id="${product.id}">View Details</button>
      </div>
    </section>
  `;
}