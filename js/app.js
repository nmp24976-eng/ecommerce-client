import { getProducts, getCategories } from './api.js';
import { storage } from './storage.js';

// Application State
const state = {
  allProducts: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortOrder: 'default',
};

// DOM References
const elements = {
  grid: document.getElementById('products-grid'),
  tabsContainer: document.getElementById('category-tabs'),
  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  cartCount: document.getElementById('cart-count'),
  errorBanner: document.getElementById('error-banner')
};

// 1. Loading Skeleton State
function renderSkeletons(count = 8) {
  elements.grid.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="skeleton-card">
        <div class="skeleton-box skeleton-img"></div>
        <div class="skeleton-box skeleton-title"></div>
        <div class="skeleton-box skeleton-price"></div>
      </div>
    `
    )
    .join('');
}

// 2. Error Display Handling
function showError(message) {
  elements.errorBanner.textContent = message;
  elements.errorBanner.classList.remove('hidden');
}

function clearError() {
  elements.errorBanner.textContent = '';
  elements.errorBanner.classList.add('hidden');
}

// 3. Render Functions
function renderProducts(items) {
  if (items.length === 0) {
    elements.grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No matching products found.</p>`;
    return;
  }

  elements.grid.innerHTML = items
    .map(
      (product) => `
      <article class="product-card">
        <div>
          <img class="product-img" src="${product.image}" alt="${product.title}" loading="lazy" />
          <h3 class="product-title" title="${product.title}">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
        <button class="btn-add" data-id="${product.id}">Add to Cart</button>
      </article>
    `
    )
    .join('');
}

function renderCategoryTabs(categories) {
  const tabsHtml = categories
    .map(
      (cat) => `
      <button class="tab-btn" data-category="${cat}">${cat}</button>
    `
    )
    .join('');
  
  elements.tabsContainer.insertAdjacentHTML('beforeend', tabsHtml);
}

// 4. Filter and Sorting Pipeline (In-Memory without re-fetching)
function applyFilterAndSort() {
  let filtered = [...state.allProducts];

  // Category filter
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(
      (item) => item.category === state.selectedCategory
    );
  }

  // Real-time search filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(q)
    );
  }

  // Sorting
  switch (state.sortOrder) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
      break;
  }

  renderProducts(filtered);
}

// 5. Setup Event Listeners
function bindEvents() {
  // Real-time search with input event
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    applyFilterAndSort();
  });

  // Sorting changes
  elements.sortSelect.addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    applyFilterAndSort();
  });

  // Category Tabs (Event Delegation)
  elements.tabsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('tab-btn')) return;

    // Update active UI
    document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update state
    state.selectedCategory = e.target.dataset.category;
    applyFilterAndSort();
  });

  // Cart Add (Event Delegation)
  elements.grid.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-add')) return;
    const id = e.target.dataset.id;
    storage.addItem(id);
    elements.cartCount.textContent = storage.getCartCount();
  });
}

// 6. Application Bootstrap
async function init() {
  elements.cartCount.textContent = storage.getCartCount();
  renderSkeletons(8);
  clearError();

  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories()
    ]);

    state.allProducts = products;
    renderCategoryTabs(categories);
    applyFilterAndSort();
  } catch (error) {
    showError('Failed to load store data. Please check your connection and try again.');
    elements.grid.innerHTML = '';
  } finally {
    bindEvents();
  }
}

// Start application
init();